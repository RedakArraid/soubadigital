# Patched Stirling: text-editor cache TTL 30m → 8h (avoids 500 on late save).
FROM docker.stirlingpdf.com/stirlingtools/stirling-pdf:latest

USER root
COPY patch_cache_ttl.py /tmp/patch_cache_ttl.py
RUN python3 /tmp/patch_cache_ttl.py /app/app.jar && rm -f /tmp/patch_cache_ttl.py
# Keep whatever user the upstream image expects at runtime (compose/entrypoint may switch).
