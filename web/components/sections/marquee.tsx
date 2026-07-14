import { MARQUEE_ITEMS } from "@/lib/data"

export function Marquee() {
  return (
    <div
      aria-hidden="true"
      className="bg-muted relative overflow-hidden border-y py-4"
    >
      <div className="from-muted absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r to-transparent" />
      <div className="from-muted absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l to-transparent" />
      <div className="animate-marquee flex w-max gap-12">
        {[0, 1].map((copy) => (
          <div
            key={copy}
            className="font-heading text-muted-foreground flex items-center gap-12 text-lg whitespace-nowrap"
          >
            {MARQUEE_ITEMS.map((item) => (
              <span key={item} className="flex items-center gap-12">
                {item}
                <span className="bg-ring inline-block size-1.5 rounded-full" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
