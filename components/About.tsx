import Image from 'next/image';

export default function About() {
  return (
    <section id="despre" className="bg-[#E8E1D8]">

      {/* MOBIL: poza background cu text overlay */}
      <div className="relative md:hidden min-h-screen flex items-end">
        <Image
          src="/images/roxana-about2.jpg"
          alt="Roxana Ica"
          fill
          className="object-cover object-center"
          style={{ filter: 'brightness(1.15) contrast(1.05)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
        <div className="relative z-10 px-6 pb-12 flex flex-col gap-5">
          <span className="text-[#C6A769] tracking-[0.25em] text-sm uppercase" style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 500 }}>
            Despre Mine
          </span>
          <h2 className="text-4xl text-white leading-tight" style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300 }}>
            Pasiunea pentru<br />
            <span className="italic">frumusețe autentică</span>
          </h2>
          <div className="gold-line" />
          <p className="text-[#E8E1D8] leading-relaxed text-base" style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 400 }}>
            Sunt Roxana, mamă a doi copii, iar corpul meu a trecut prin transformări reale. Din dorința de a înțelege procesul de slow aging, am urmat formare medicală și m-am specializat în estetică. Fiecare tratament este personalizat pentru rezultate care se văd și se simt.
          </p>
          <blockquote className="border-l border-[#C6A769] pl-4 py-1">
            <p className="text-white text-xl italic" style={{ fontFamily: 'var(--font-cormorant)' }}>
              „Diferența Care Se Simte"
            </p>
          </blockquote>
        </div>
      </div>

      {/* DESKTOP: layout original */}
      <div className="hidden md:block py-28 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 gap-20 items-center">

          {/* Imagine */}
          <div className="relative flex justify-center">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-full h-full border border-[#C6A769] opacity-30" />
              <div className="w-96 h-[650px] overflow-hidden relative">
                <Image
                  src="/images/roxana-about2.jpg"
                  alt="Roxana Ica"
                  fill
                  className="object-cover object-center"
                  style={{ filter: 'brightness(1.15) contrast(1.05)' }}
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-full h-full bg-[#C6A769] opacity-5 -z-10" />
            </div>
          </div>

          {/* Text */}
          <div className="flex flex-col gap-7">
            <span className="text-[#C6A769] tracking-[0.25em] text-sm uppercase" style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 500 }}>
              Despre Mine
            </span>
            <h2 className="text-4xl md:text-5xl text-[#4A403A] leading-tight" style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300 }}>
              Pasiunea pentru<br />
              <span className="italic">frumusețe autentică</span>
            </h2>
            <div className="gold-line" />
            <p className="text-[#7A6F66] leading-relaxed text-base" style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 400 }}>
              Sunt Roxana, mamă a doi copii, iar corpul meu a trecut prin transformări reale — după sarcini și odată cu înaintarea în vârstă. Din dorința de a înțelege în profunzime procesul de slow aging și de a-mi menține pielea și corpul în echilibru, am început să caut soluții care funcționează cu adevărat.
            </p>
            <p className="text-[#7A6F66] leading-relaxed text-base" style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 400 }}>
              Am ales să urmez formare în domeniul medical pentru a aprofunda aceste cunoștințe, iar mai departe m-am specializat prin cursuri avansate și traininguri dedicate esteticii. Din această combinație între înțelegere teoretică și experiență practică a luat naștere Roxana Ica Aesthetic.
            </p>
            <p className="text-[#7A6F66] leading-relaxed text-base" style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 400 }}>
              Înțeleg pielea și corpul dintr-o perspectivă reală, nu doar teoretică. De aceea, fiecare tratament este personalizat și gândit cu sens — te invit să descoperi o abordare profesionistă, în care fiecare detaliu este gândit pentru rezultate care se văd și se simt.
            </p>
            <blockquote className="border-l border-[#C6A769] pl-6 py-1">
              <p className="text-[#4A403A] text-xl italic" style={{ fontFamily: 'var(--font-cormorant)' }}>
                „Diferența Care Se Simte"
              </p>
            </blockquote>
            <div className="flex flex-wrap gap-6 mt-2">
              {['Protocoale Faciale', 'Epilare Definitivă', 'Remodelare Corporală', 'Laser & IPL', 'Plasma Fusion', 'Electrostimulare', 'Recuperare & Terapie'].map(spec => (
                <span key={spec} className="text-[#7A6F66] text-sm tracking-wide border-b border-[#C6A769] pb-0.5" style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 400 }}>
                  {spec}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
