import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[#F8F6F2] overflow-hidden">
      {/* Fundal decorativ */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#E8E1D8] opacity-40" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[#D8B7A6] opacity-10 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center pt-24">

        {/* Text */}
        <div className="flex flex-col items-start gap-8">
          <div className="flex items-center gap-4">
            <div className="gold-line" />
            <span className="text-[#B8952A] tracking-[0.25em] text-xs uppercase" style={{ fontFamily: 'var(--font-montserrat)' }}>
              Estetică Premium · Brașov
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl leading-tight text-[#4A403A]" style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300 }}>
            Roxana Ica<br />
            <span className="italic" style={{ background: 'linear-gradient(135deg, #C9A84C, #8B6914)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Aesthetic
            </span>
          </h1>

          <div className="gold-line" />

          <p className="text-[#7A6F66] text-lg leading-relaxed max-w-md" style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic' }}>
            „Diferența Care Se Simte"
          </p>

          <p className="text-[#7A6F66] leading-relaxed max-w-md text-sm" style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 300 }}>
            Tratamente estetice personalizate pentru fața și corpul tău, cu tehnologii de ultimă generație și rezultate reale.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <a href="#contact" className="btn-gold" style={{ fontFamily: 'var(--font-montserrat)' }}>
              Programează-te
            </a>
            <a href="#servicii" className="btn-outline" style={{ fontFamily: 'var(--font-montserrat)' }}>
              Vezi Serviciile
            </a>
          </div>

          {/* Stats */}
          <div className="flex gap-12 mt-4 pt-8 border-t border-[#E8E1D8] w-full">
            {[
              { nr: '7+', label: 'Servicii premium' },
              { nr: '100%', label: 'Personalizat' },
              { nr: 'Brașov', label: 'Dihamului 16A' },
            ].map(stat => (
              <div key={stat.label} className="flex flex-col gap-1">
                <span className="text-2xl" style={{ fontFamily: 'var(--font-cormorant)', background: 'linear-gradient(135deg, #C9A84C, #8B6914)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{stat.nr}</span>
                <span className="text-[#7A6F66] text-xs tracking-wide" style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 300 }}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Imagine Roxana — umbră laterală stânga */}
        <div className="relative flex justify-center md:justify-end">
          <div
            className="w-80 h-[480px] md:w-96 md:h-[560px] overflow-hidden relative"
            style={{ boxShadow: '-16px 0 40px rgba(74, 64, 58, 0.2)' }}
          >
            <Image
              src="/images/roxana.jpg"
              alt="Roxana Ica"
              fill
              className="object-cover object-top"
              priority
            />
          </div>
        </div>
      </div>

    </section>
  );
}
