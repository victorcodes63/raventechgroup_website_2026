'use client'

export function BridgeStatement() {
  return (
    <section className="relative overflow-hidden border-t border-white/10 bg-white py-12 sm:py-16 md:py-20 text-black">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(14,14,18,0.08),_transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,169,30,0.16),_transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,169,30,0.1)_0%,transparent_45%,rgba(14,14,18,0.1)_85%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.05),_transparent_60%)]" />
        <div className="absolute inset-0 opacity-[0.16]" style={{ backgroundImage: 'radial-gradient(rgba(255,169,30,0.35) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="absolute inset-0 opacity-[0.12]" style={{ backgroundImage: 'radial-gradient(rgba(255,169,30,0.18) 1.5px, transparent 1.5px)', backgroundSize: '140px 140px' }} />
      </div>
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-black leading-relaxed px-4 sm:px-0">
          At Raven, we integrate seamlessly with your team to engineer and operate robust platforms that empower every release to propel your business forward with clarity and confidence.
          </p>
        </div>
      </div>
    </section>
  )
}


