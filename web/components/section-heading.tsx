import { cn } from "@/lib/utils"

export function SectionHeading({
  label,
  title,
  kicker,
  className,
}: {
  label: string
  title: string
  kicker?: string
  className?: string
}) {
  return (
    <div
      className={cn(
        "mb-14 grid items-start gap-4 md:grid-cols-[200px_1fr] md:gap-12",
        className
      )}
    >
      <div className="label-mono md:sticky md:top-24">{label}</div>
      <div>
        <h2 className="font-display max-w-[18ch] text-balance text-3xl sm:text-4xl lg:text-5xl">
          {title}
        </h2>
        {kicker && (
          <p className="text-muted-foreground mt-4 max-w-prose text-sm leading-relaxed">
            {kicker}
          </p>
        )}
      </div>
    </div>
  )
}
