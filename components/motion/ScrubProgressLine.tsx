export function ScrubProgressLine({ className = '' }: { className?: string }) {
  return (
    <div
      className={`mt-8 hidden h-px w-full overflow-hidden bg-white/[0.06] md:block ${className}`.trim()}
      aria-hidden
    >
      <div data-scrub-progress className="h-px w-full origin-left bg-[#FFA91F]" />
    </div>
  )
}

export function ScrubRule() {
  return (
    <span
      data-scrub-rule
      className="pointer-events-none absolute inset-x-0 top-0 z-20 hidden h-[1.5px] origin-left scale-x-0 bg-[#FFA91F] md:block"
      aria-hidden
    />
  )
}
