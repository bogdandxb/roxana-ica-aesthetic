import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Recuperare & Terapie Corporală | Roxana Ica Aesthetic',
  description: 'Terapie Tecar 448 kHz și Masaj Terapeutic cu Vibrații G5 — recuperare profundă, relaxare musculară și remodelare corporală în Brașov.',
};

export default function RecuperareTerapiePage() {
  return (
    <>
      <Navigation />

      {/* Hero principal cu două poze */}
      <section className="pt-32 pb-0 bg-[#E8E1D8]">
        <div className="relative h-72 md:h-96 w-full overflow-hidden">
          <div className="absolute inset-0 grid grid-cols-2">
            <div className="relative overflow-hidden">
              <Image src="/images/servicii/tecar.jpg" alt="Terapie Tecar" fill className="object-cover object-center" priority />
            </div>
            <div className="relative overflow-hidden">
              <Image src="/images/servicii/g5.jpg" alt="Masaj G5" fill className="object-cover object-center" priority />
            </div>
          </div>
          <div className="absolute inset-0 bg-[#1a1a1a] opacity-55" />
          <div className="absolute inset-0 flex items-center justify-center flex-col gap-3">
            <h1 className="text-4xl md:text-6xl text-white text-center px-6" style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300, textShadow: '0 4px 24px rgba(0,0,0,0.9), 0 0 40px rgba(0,0,0,0.8)' }}>
              Recuperare & Terapie Corporală
            </h1>
            <div style={{ height: '1px', width: '60px', background: 'linear-gradient(90deg, transparent, #C6A769, transparent)' }} />
            <p className="text-[#C6A769] text-xs tracking-[0.25em] uppercase text-center" style={{ fontFamily: 'var(--font-montserrat)', textShadow: '0 2px 12px rgba(0,0,0,0.9)' }}>
              Tecar · G5 Vibrații
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-4 py-12 px-6">
          <Link href="/#servicii" className="text-[#C6A769] text-xs tracking-widest uppercase flex items-center gap-2 hover:gap-4 transition-all" style={{ fontFamily: 'var(--font-montserrat)' }}>
            ← Înapoi la servicii
          </Link>
          <p className="text-[#7A6F66] max-w-2xl leading-relaxed text-sm" style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 300 }}>
            Două tehnologii de vârf, un singur scop — recuperare profundă, relaxare musculară și remodelare corporală. Alege protocolul potrivit nevoilor tale.
          </p>
        </div>

        {/* Navigare rapidă spre cele două categorii */}
        <div className="max-w-2xl mx-auto grid grid-cols-2 gap-4 px-6 pb-16">
          <a href="#tecar" className="flex flex-col items-center gap-2 p-6 bg-[#F8F6F2] border border-[#E8E1D8] hover:border-[#C6A769] transition-all group">
            <span className="text-[#C6A769] tracking-[0.2em] text-xs uppercase" style={{ fontFamily: 'var(--font-montserrat)' }}>01</span>
            <span className="text-[#4A403A] text-lg group-hover:text-[#C6A769] transition-colors" style={{ fontFamily: 'var(--font-cormorant)' }}>Terapie Tecar</span>
            <span className="text-[#7A6F66] text-[10px] tracking-wide" style={{ fontFamily: 'var(--font-montserrat)' }}>448 kHz · Recuperare profundă</span>
          </a>
          <a href="#g5" className="flex flex-col items-center gap-2 p-6 bg-[#F8F6F2] border border-[#E8E1D8] hover:border-[#C6A769] transition-all group">
            <span className="text-[#C6A769] tracking-[0.2em] text-xs uppercase" style={{ fontFamily: 'var(--font-montserrat)' }}>02</span>
            <span className="text-[#4A403A] text-lg group-hover:text-[#C6A769] transition-colors" style={{ fontFamily: 'var(--font-cormorant)' }}>Masaj G5</span>
            <span className="text-[#7A6F66] text-[10px] tracking-wide" style={{ fontFamily: 'var(--font-montserrat)' }}>Vibrații terapeutice · Modelare</span>
          </a>
        </div>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/* CATEGORIA 1 — TERAPIE TECAR */}
      {/* ═══════════════════════════════════════ */}
      <section id="tecar" className="bg-[#F8F6F2]">

        {/* Hero Tecar */}
        <div className="relative h-64 md:h-80 w-full overflow-hidden">
          <Image src="/images/servicii/tecar.jpg" alt="Terapie Tecar" fill className="object-cover object-center" />
          <div className="absolute inset-0" style={{ background: 'rgba(26,26,26,0.65)' }} />
          <div className="absolute inset-0 flex items-end md:items-center pb-8 md:pb-0 px-8 md:px-20">
            <div className="flex flex-col gap-3">
              <span className="text-[#C6A769] tracking-[0.3em] text-xs uppercase" style={{ fontFamily: 'var(--font-montserrat)' }}>01 · Recuperare Profundă</span>
              <h2 className="text-4xl md:text-6xl text-white" style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300, textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}>
                Terapie Tecar
              </h2>
              <p className="text-[#D8B7A6] text-sm max-w-sm" style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 300 }}>
                Energie termică de 448 kHz pentru vindecare din interior
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-6 py-16">
          <p className="text-[#7A6F66] leading-relaxed text-sm mb-12 max-w-3xl" style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 300 }}>
            Terapia Tecar utilizează curentul termic de înaltă frecvență (448 kHz) pentru a activa celulele din profunzime, stimulând circulația sângelui și a limfei. Energia termică controlată pătrunde uniform în straturile profunde ale țesutului — până la 12 cm adâncime — fără supraîncălzire locală. Un tratament sigur, eficient și cu rezultate durabile, recomandat atât pentru recuperare cât și pentru remodelare estetică.
          </p>

          {/* Beneficii Tecar */}
          <h3 className="text-2xl text-[#4A403A] mb-6" style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300 }}>Beneficii</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
            {[
              'Recuperare musculară și articulară accelerată',
              'Reducerea durerilor cronice cervicale, lombare și musculare',
              'Drenaj limfatic și îmbunătățirea circulației profunde',
              'Tonifierea țesuturilor subcutanate și redarea elasticității pielii',
              'Remodelare corporală și efect de fermitate vizibil',
              'Activarea imunității celulare locale',
            ].map((b, i) => (
              <div key={i} className="flex items-start gap-4 p-5 bg-[#E8E1D8]">
                <span className="text-[#C6A769] mt-0.5 flex-shrink-0">✦</span>
                <span className="text-[#7A6F66] text-sm" style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 300 }}>{b}</span>
              </div>
            ))}
          </div>

          {/* Tehnologie Tecar */}
          <h3 className="text-2xl text-[#4A403A] mb-6" style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300 }}>Tehnologie & Sonde</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            {[
              { icon: '🔥', titlu: 'Sondă CAP (ceramică)', desc: 'Conducție termică superficială — activează ionii din țesuturi, reduce ridurile și redă fermitatea pielii' },
              { icon: '⚡', titlu: 'Sondă RES', desc: 'Conducție termică profundă până la 12 cm — accelerează circulația, reduce grăsimea subcutanată și viscerală' },
              { icon: '💪', titlu: 'Pistol EMS', desc: 'Curent biologic pentru relaxarea fasciei, ameliorarea contracturilor, durerilor cervicale și lombare' },
            ].map((t, i) => (
              <div key={i} className="p-6 flex flex-col gap-3 bg-[#4A403A]">
                <span className="text-2xl">{t.icon}</span>
                <p className="text-[#C6A769] text-xs tracking-widest uppercase" style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 500 }}>{t.titlu}</p>
                <p className="text-[#D8B7A6] text-xs leading-relaxed" style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 300 }}>{t.desc}</p>
              </div>
            ))}
          </div>

          {/* Indicații Tecar */}
          <h3 className="text-2xl text-[#4A403A] mb-6" style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300 }}>Indicații</h3>
          <div className="flex flex-wrap gap-3">
            {['Dureri musculare și articulare', 'Contracturi și tensiuni cronice', 'Recuperare post-traumatică', 'Celulită și adipozitate localizată', 'Piele flascidă după slăbire', 'Remodelare corporală'].map((ind, i) => (
              <span key={i} className="border border-[#C6A769] text-[#C6A769] px-4 py-2 text-xs tracking-wide" style={{ fontFamily: 'var(--font-montserrat)' }}>{ind}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Separator */}
      <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, #C6A769 30%, #C6A769 70%, transparent)' }} />

      {/* ═══════════════════════════════════════ */}
      {/* CATEGORIA 2 — MASAJ G5 */}
      {/* ═══════════════════════════════════════ */}
      <section id="g5" className="bg-[#E8E1D8]">

        {/* Hero G5 */}
        <div className="relative h-64 md:h-80 w-full overflow-hidden">
          <Image src="/images/servicii/g5.jpg" alt="Masaj G5" fill className="object-cover object-center" />
          <div className="absolute inset-0" style={{ background: 'rgba(26,26,26,0.65)' }} />
          <div className="absolute inset-0 flex items-end md:items-center justify-end pb-8 md:pb-0 px-8 md:px-20">
            <div className="flex flex-col gap-3 items-end text-right">
              <span className="text-[#C6A769] tracking-[0.3em] text-xs uppercase" style={{ fontFamily: 'var(--font-montserrat)' }}>02 · Modelare & Relaxare</span>
              <h2 className="text-4xl md:text-6xl text-white" style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300, textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}>
                Masaj G5
              </h2>
              <p className="text-[#D8B7A6] text-sm max-w-sm" style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 300 }}>
                Vibrații terapeutice profesionale pentru corp și minte
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-6 py-16">
          <p className="text-[#7A6F66] leading-relaxed text-sm mb-12 max-w-3xl" style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 300 }}>
            Aparatul G5 generează vibrații mecanice controlate între 900 și 3600 RPM care pătrund în profunzimea țesuturilor musculare și adipoase. Cu 5 capete interschimbabile adaptate fiecărei zone a corpului, masajul G5 stimulează intens circulația, lichefiază depozitele de grăsime, relaxează musculatura contractată și redă corpului silueta și tonusul dorit.
          </p>

          {/* Beneficii G5 */}
          <h3 className="text-2xl text-[#4A403A] mb-6" style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300 }}>Beneficii</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
            {[
              'Modelare corporală și reducerea depozitelor de grăsime',
              'Stimularea intensă a circulației sângelui',
              'Relaxarea musculară profundă și reducerea tensiunilor',
              'Diminuarea vizibilă a celulitei',
              'Îmbunătățirea tonusului muscular',
              'Efect drenant, detoxifiant și antiinflamator',
            ].map((b, i) => (
              <div key={i} className="flex items-start gap-4 p-5 bg-[#F8F6F2]">
                <span className="text-[#C6A769] mt-0.5 flex-shrink-0">✦</span>
                <span className="text-[#7A6F66] text-sm" style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 300 }}>{b}</span>
              </div>
            ))}
          </div>

          {/* Capete G5 */}
          <h3 className="text-2xl text-[#4A403A] mb-6" style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300 }}>Capete de Masaj</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
            {[
              { icon: '🔵', titlu: 'Cap pentru zone musculare', desc: 'Penetrare profundă în grupele musculare mari — spate, coapse, fese. Ideal pentru tensiuni și contracturi severe.' },
              { icon: '🟡', titlu: 'Cap cu role', desc: 'Masaj intensiv anti-celulitic — stimulează circulația superficială și lichefiază depozitele adipoase.' },
              { icon: '⚪', titlu: 'Cap plat', desc: 'Modelare uniformă și netezire — potrivit pentru abdomen și zone cu piele mai sensibilă.' },
              { icon: '🟢', titlu: 'Cap pentru zone delicate', desc: 'Braț interior, față internă coapsă și zone cu textură mai fină — presiune controlată și blândă.' },
            ].map((t, i) => (
              <div key={i} className="p-6 flex flex-col gap-3 bg-[#4A403A]">
                <span className="text-2xl">{t.icon}</span>
                <p className="text-[#C6A769] text-xs tracking-widest uppercase" style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 500 }}>{t.titlu}</p>
                <p className="text-[#D8B7A6] text-xs leading-relaxed" style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 300 }}>{t.desc}</p>
              </div>
            ))}
          </div>

          {/* Indicații G5 */}
          <h3 className="text-2xl text-[#4A403A] mb-6" style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300 }}>Indicații</h3>
          <div className="flex flex-wrap gap-3">
            {['Celulită și piele cu aspect neuniform', 'Grăsime localizată (abdomen, coapse, fese)', 'Tensiuni și contracturi musculare', 'Circulație deficitară', 'Recuperare după efort fizic intens', 'Drenaj și detoxifiere corporală'].map((ind, i) => (
              <span key={i} className="border border-[#C6A769] text-[#C6A769] px-4 py-2 text-xs tracking-wide" style={{ fontFamily: 'var(--font-montserrat)' }}>{ind}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Prețuri */}
      <section className="py-20 px-6 bg-[#4A403A]">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col items-center text-center gap-5 mb-12">
            <h2 className="text-4xl text-[#F8F6F2]" style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300 }}>
              Lista de Prețuri
            </h2>
            <div className="gold-line" />
          </div>

          <div className="flex flex-col mb-10">
            {[
              { name: 'Terapie Tecar – Ședință unică', price: '250 lei', duration: '45 min' },
              { name: 'Masaj G5 – Ședință unică', price: '150 lei', duration: '30 min' },
              { name: 'Protocol combinat Tecar + G5', price: '350 lei', duration: '60 min' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between py-4 border-b border-[#7A6F66]/40 last:border-0">
                <div className="flex items-center gap-3">
                  <span className="text-[#C6A769] text-xs">◇</span>
                  <span className="text-[#E8E1D8] text-sm" style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 300 }}>{item.name}</span>
                  {item.duration && <span className="text-[#7A6F66] text-xs" style={{ fontFamily: 'var(--font-montserrat)' }}>· {item.duration}</span>}
                </div>
                <span className="text-[#C6A769] font-medium" style={{ fontFamily: 'var(--font-cormorant)', fontSize: '18px' }}>{item.price}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { name: 'Pachet Tecar · 6 ședințe', discount: '15% reducere', items: [{ name: 'Total pachet', price: '1275 lei' }, { name: 'Per ședință', price: '212 lei' }] },
              { name: 'Pachet G5 · 6 ședințe', discount: '15% reducere', items: [{ name: 'Total pachet', price: '765 lei' }, { name: 'Per ședință', price: '127 lei' }] },
            ].map((pkg, i) => (
              <div key={i} className="bg-[#F8F6F2] p-8 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl text-[#4A403A]" style={{ fontFamily: 'var(--font-cormorant)' }}>{pkg.name}</h3>
                  <span className="text-[#C6A769] text-xs tracking-wide border border-[#C6A769] px-2 py-0.5" style={{ fontFamily: 'var(--font-montserrat)' }}>{pkg.discount}</span>
                </div>
                <div className="gold-line" style={{ marginLeft: 0 }} />
                <div className="flex flex-col gap-3 mt-2">
                  {pkg.items.map((item, j) => (
                    <div key={j} className="flex justify-between items-center">
                      <span className="text-[#7A6F66] text-xs" style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 300 }}>{item.name}</span>
                      <span className="text-[#C6A769]" style={{ fontFamily: 'var(--font-cormorant)', fontSize: '17px' }}>{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-[#F8F6F2] text-center">
        <div className="max-w-xl mx-auto flex flex-col items-center gap-6">
          <h2 className="text-3xl text-[#4A403A]" style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300 }}>
            Programează o consultație
          </h2>
          <div className="gold-line" />
          <p className="text-[#7A6F66] text-sm" style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 300 }}>
            Îți recomand protocolul potrivit în funcție de nevoile tale — recuperare, relaxare sau remodelare.
          </p>
          <a href="https://wa.me/40771569093" target="_blank" rel="noopener noreferrer" className="btn-gold" style={{ fontFamily: 'var(--font-montserrat)' }}>
            Programare WhatsApp
          </a>
        </div>
      </section>

      <Footer />
    </>
  );
}
