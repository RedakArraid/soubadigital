#!/usr/bin/env python3
"""Extend Stirling PDF text-editor in-memory cache TTL (default 30 min → 8 h).

Stirling hardcodes TimeUnit.MINUTES.toMillis(30) in PdfJsonConversionService /
PdfLazyLoadingService. After expiry, partial export returns 500
("No cached document available"). We rewrite the Long(30) constant to Long(480).
"""
from __future__ import annotations

import struct
import sys
import zipfile
from pathlib import Path

TARGETS = (
    "stirling/software/SPDF/service/PdfJsonConversionService.class",
    "stirling/software/SPDF/service/pdfjson/PdfLazyLoadingService.class",
)
OLD = 30
NEW = 480  # minutes → 8 hours


def parse_cp(data: bytes):
    i = 8
    cp_count = struct.unpack(">H", data[i : i + 2])[0]
    i += 2
    cp = [None]
    offsets = [None]  # byte offset of each CP entry's tag
    idx = 1
    while idx < cp_count:
        offsets.append(i)
        tag = data[i]
        i += 1
        if tag == 1:
            ln = struct.unpack(">H", data[i : i + 2])[0]
            i += 2 + ln
            cp.append(("Utf8",))
        elif tag == 5:
            val = struct.unpack(">q", data[i : i + 8])[0]
            cp.append(("Long", val, i))  # value starts at i
            i += 8
            idx += 1
            cp.append(None)
            offsets.append(None)
            idx += 1
            continue
        elif tag == 6:
            i += 8
            cp.append(("Double",))
            idx += 1
            cp.append(None)
            offsets.append(None)
            idx += 1
            continue
        elif tag in (7, 8, 16, 19, 20):
            i += 2
            cp.append((tag,))
        elif tag in (3, 4):
            i += 4
            cp.append((tag,))
        elif tag in (9, 10, 11, 12, 17, 18):
            i += 4
            cp.append((tag,))
        elif tag == 15:
            i += 3
            cp.append((tag,))
        else:
            raise RuntimeError(f"Unknown CP tag {tag} at index {idx}")
        idx += 1
    return cp


def patch_class(data: bytes) -> bytes:
    cp = parse_cp(data)
    # Prefer Long(30) referenced next to MINUTES/toMillis schedule cleanup
    long_hits = [(n, e) for n, e in enumerate(cp) if e and e[0] == "Long" and e[1] == OLD]
    if not long_hits:
        raise RuntimeError(f"Long({OLD}) not found in class")
    if len(long_hits) != 1:
        raise RuntimeError(f"Expected exactly one Long({OLD}), found {len(long_hits)}")
    _, entry = long_hits[0]
    value_offset = entry[2]
    out = bytearray(data)
    out[value_offset : value_offset + 8] = struct.pack(">q", NEW)
    return bytes(out)


def patch_jar(jar_path: Path) -> None:
    tmp = jar_path.with_suffix(".jar.tmp")
    with zipfile.ZipFile(jar_path, "r") as zin, zipfile.ZipFile(
        tmp, "w", compression=zipfile.ZIP_DEFLATED
    ) as zout:
        patched = 0
        for info in zin.infolist():
            raw = zin.read(info.filename)
            if info.filename in TARGETS:
                raw = patch_class(raw)
                patched += 1
                print(f"patched {info.filename}: {OLD}m → {NEW}m")
            # Preserve as much metadata as zipfile allows
            zout.writestr(info, raw)
        if patched != len(TARGETS):
            raise RuntimeError(f"patched {patched}/{len(TARGETS)} classes")
    tmp.replace(jar_path)
    print(f"wrote {jar_path}")


if __name__ == "__main__":
    path = Path(sys.argv[1] if len(sys.argv) > 1 else "/app/app.jar")
    patch_jar(path)
