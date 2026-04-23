import { services, pricesData } from '@/lib/services';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import BeforeAfterCarousel from '@/components/BeforeAfterCarousel';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return services.map(s => ({ slug: s.slug }));
}

const metaDescriptions: Record<string, string> = {
  'protocoale-faciale': 'Protocoale faciale personalizate în Brașov — hidratare profundă, tratament acnee, microneedling, peeling și rejuvenare. Roxana Ica Aesthetic, Str. Dihamului 16A.',
  'epilare-definitiva': 'Epilare definitivă cu Diodă Laser 4 lungimi de undă în Brașov. Rezultate vizibile de la prima ședință, adaptat oricărui tip de piele. Roxana Ica Aesthetic.',
  'remodelare-corporala': 'Remodelare corporală cu LipoShape Pro în Brașov — cavitație, vacuum și radiofrecvență pentru reducerea celulitei și a grăsimii localizate. Roxana Ica Aesthetic.',
  'electrostimulare': 'Electrostimulare musculară în Brașov — tonifiere și definire profundă, recuperare post-partum, reducerea flacidității. Roxana Ica Aesthetic, Dihamului 16A.',
  'plasma-fusion': 'Plasma Fusion în Brașov — lifting pleoape, eliminarea vergeturilor, tratarea cicatricilor și petelor pigmentare fără bisturiu. Roxana Ica Aesthetic.',
  'ipl': 'Tratamente IPL în Brașov — uniformizarea pielii, reducerea petelor pigmentare, roșeții și acneei. Rejuvenare cu lumină pulsată. Roxana Ica Aesthetic.',
  'laser-yag': 'Laser Nd:YAG în Brașov — Carbon Laser Hollywood Peel, tratament acnee, estompare pete, ștergere tatuaje. Roxana Ica Aesthetic, Str. Dihamului 16A.',
  'recuperare-terapie': 'Terapie Tecar 448 kHz și Masaj G5 în Brașov — recuperare musculară profundă, reducerea durerilor cronice și remodelare corporală. Roxana Ica Aesthetic.',
  'mentorat-cursuri': 'Mentorat profesional și cursuri pentru cosmeticieni în Brașov — program intensiv de 6 săptămâni, lucru pe modele reale, protocoale personalizate. Roxana Ica Aesthetic.',
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find(s => s.slug === slug);
  if (!service) return {};
  return {
    title: `${service.title} Brașov | Roxana Ica Aesthetic`,
    description: metaDescriptions[slug] ?? service.description,
    keywords: [
      `${service.title} Brașov`,
      'estetică Brașov',
      'Roxana Ica Aesthetic',
      'Dihamului 16A Brașov',
      ...( slug === 'protocoale-faciale' ? [
        'tratament facial Brașov', 'microneedling Brașov', 'peeling chimic Brașov',
        'hidratare ten Brașov', 'tratament acnee Brașov', 'rejuvenare ten Brașov',
        'BioRePeel Brașov', 'carboxy terapie Brașov', 'curățare ten Brașov',
      ] : slug === 'epilare-definitiva' ? [
        'epilare laser Brașov', 'epilare definitivă laser Brașov', 'diodă laser Brașov',
        'epilare picioare Brașov', 'epilare axilă Brașov', 'epilare inghinală Brașov',
        'epilare față Brașov', 'epilare definitivă spate Brașov', 'laser epilare Brașov',
      ] : slug === 'remodelare-corporala' ? [
        'remodelare corporală Brașov', 'cavitație Brașov', 'radiofrecvență Brașov',
        'reducere celulită Brașov', 'slăbit Brașov', 'LipoShape Brașov',
        'reducere grăsime localizată Brașov', 'vacuum masaj Brașov', 'modelare corp Brașov',
      ] : slug === 'electrostimulare' ? [
        'electrostimulare musculară Brașov', 'EMS Brașov', 'tonifiere musculară Brașov',
        'recuperare post-partum Brașov', 'definire musculară Brașov', 'flaciditate Brașov',
        'electrostimulare corp Brașov', 'tonifiere abdomen Brașov',
      ] : slug === 'plasma-fusion' ? [
        'plasma fusion Brașov', 'lifting pleoape Brașov', 'lifting fără bisturiu Brașov',
        'eliminare vergeturi Brașov', 'tratament cicatrici Brașov', 'pete pigmentare Brașov',
        'lifting față Brașov', 'tratament alopecie Brașov', 'plasma pen Brașov',
      ] : slug === 'ipl' ? [
        'IPL Brașov', 'lumină pulsată Brașov', 'tratament pete pigmentare Brașov',
        'tratament roșeață față Brașov', 'cuperoză Brașov', 'rejuvenare IPL Brașov',
        'tratament acnee IPL Brașov', 'IPL față Brașov', 'uniformizare ten Brașov',
      ] : slug === 'laser-yag' ? [
        'laser Nd YAG Brașov', 'carbon laser Brașov', 'Hollywood Peel Brașov',
        'ștergere tatuaje Brașov', 'tratament acnee laser Brașov', 'laser rejuvenare Brașov',
        'carbon laser detox Brașov', 'pigment removal Brașov',
      ] : slug === 'recuperare-terapie' ? [
        'terapie tecar Brașov', 'masaj G5 Brașov', 'recuperare musculară Brașov',
        'dureri cronice tratament Brașov', 'masaj terapeutic Brașov', 'tecar 448 khz Brașov',
        'recuperare lombară Brașov', 'drenaj limfatic Brașov', 'masaj anticelulitic Brașov',
      ] : slug === 'mentorat-cursuri' ? [
        'mentorat cosmetică Brașov', 'cursuri cosmetică Brașov', 'formare cosmeticiană Brașov',
        'mentorat profesional estetică', 'curs microneedling Brașov', 'curs peeling Brașov',
        'formare cabinet cosmetică', 'mentorat piele Brașov', 'curs tratamente faciale Brașov',
      ] : []),
    ],
    openGraph: {
      title: `${service.title} | Roxana Ica Aesthetic Brașov`,
      description: metaDescriptions[slug] ?? service.description,
      locale: 'ro_RO',
      type: 'website',
    },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find(s => s.slug === slug);
  if (!service) notFound();

  const prices = pricesData[slug];

  return (
    <>
      <Navigation />

      {/* Hero serviciu */}
      <section className="pt-32 pb-20 px-6 bg-[#E8E1D8]">
        {/* Poza / Video hero */}
        <div className="relative h-72 md:h-96 w-full mb-12 overflow-hidden">
          {service.image.endsWith('.mp4') ? (
            <video
              src={service.image}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <Image
              src={service.image}
              alt={service.title}
              fill
              className={`object-cover ${service.imagePosition ?? 'object-center'}`}
              priority
            />
          )}
          <div className="absolute inset-0 bg-[#4A403A] opacity-40" />
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-5xl md:text-6xl text-[#F8F6F2] text-center" style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300 }}>
              {service.title}
            </h1>
          </div>
        </div>

        <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-6">
          <Link
            href="/#servicii"
            className="text-[#C6A769] text-xs tracking-widest uppercase flex items-center gap-2 hover:gap-4 transition-all"
            style={{ fontFamily: 'var(--font-montserrat)' }}
          >
            ← Înapoi la servicii
          </Link>

          <span className="text-[#C6A769] tracking-[0.25em] text-xs uppercase" style={{ fontFamily: 'var(--font-montserrat)' }}>
            {service.subtitle}
          </span>

          <h1 className="text-5xl md:text-6xl text-[#4A403A]" style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300 }}>
            {service.title}
          </h1>

          <div className="gold-line" />

          <p className="text-[#7A6F66] max-w-2xl leading-relaxed text-sm" style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 300 }}>
            {service.description}
          </p>

          {slug === 'mentorat-cursuri' && (
            <div className="max-w-2xl flex flex-col gap-5 text-left mt-4">
              <p className="text-[#4A403A] leading-relaxed text-sm" style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 300, fontStyle: 'italic' }}>
                Ai terminat școala de cosmetică, dar nu te simți pregătită pentru cliente reale? <strong style={{ fontWeight: 600, fontStyle: 'normal' }}>Aici începe diferența.</strong>
              </p>
              <p className="text-[#7A6F66] leading-relaxed text-sm" style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 300 }}>
                Acest mentorat este un <strong style={{ fontWeight: 600 }}>program intensiv</strong>, în care construiești o <strong style={{ fontWeight: 600 }}>înțelegere profundă a pielii</strong> și înveți să lucrezi <strong style={{ fontWeight: 600 }}>corect, sigur și argumentat</strong> în cabinet.
              </p>
              <p className="text-[#4A403A] text-sm" style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 600 }}>
                În 6 săptămâni vei învăța să:
              </p>
              <ul className="flex flex-col gap-2">
                {[
                  ['înțelegi pielea în profunzime', ': structură, reacții, microbiom'],
                  ['realizezi corect o anamneză', ' și o analiză reală a pielii'],
                  ['recunoști și abordezi corect', ': acnee, rozacee, cuperoză, melasmă, deshidratare'],
                  ['alegi și aplici corect tratamentele', ': peeling-uri, microneedling, terapii de hidratare și glow'],
                  ['stabilești indicații și contraindicații reale', ', nu generale'],
                  ['construiești protocoale personalizate', ', în funcție de fiecare tip de ten'],
                  ['lucrezi pe modele reale', ', cu afecțiuni diferite, sub ghidare directă'],
                  ['lucrezi cu aparatură de ultimă generație', ', integrată corect în tratamente'],
                  ['înțelegi cum alegi și folosești aparatura potrivită', ' pentru cabinetul tău'],
                  ['explici clientelor profesionist', ' fiecare etapă și creezi încredere'],
                  ['îți construiești prezența în online', ' și bazele unei imagini profesionale'],
                  ['înțelegi direcția unui website', ' și cum să îți poziționezi serviciile corect'],
                ].map(([bold, rest], i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[#7A6F66]" style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 300 }}>
                    <span className="text-[#C6A769] mt-0.5 flex-shrink-0">–</span>
                    <span><strong style={{ fontWeight: 600, color: '#4A403A' }}>{bold}</strong>{rest}</span>
                  </li>
                ))}
              </ul>
              <p className="text-[#7A6F66] leading-relaxed text-sm mt-2" style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 300 }}>
                Este un mentorat <strong style={{ fontWeight: 600 }}>profund</strong>, unde nu acumulezi informație —<br />
                înveți să o <strong style={{ fontWeight: 600 }}>înțelegi</strong>, să o <strong style={{ fontWeight: 600 }}>aplici</strong> și să o <strong style={{ fontWeight: 600 }}>transformi în rezultate</strong>.
              </p>
              <p className="text-[#C6A769] text-sm tracking-widest uppercase" style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 500 }}>
                Roxana Ica Aesthetic – Diferența care se simte.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Beneficii */}
      <section className="py-20 px-6 bg-[#F8F6F2]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl text-[#4A403A] mb-10 text-center" style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300 }}>
            Beneficii
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {service.benefits.map((benefit, i) => (
              <div key={i} className="flex items-start gap-4 p-6 bg-[#E8E1D8]">
                <span className="text-[#C6A769] mt-0.5">✦</span>
                <span className="text-[#7A6F66] text-sm" style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 300 }}>
                  {benefit}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before & After */}
      {(slug === 'protocoale-faciale' || slug === 'remodelare-corporala') && <BeforeAfterCarousel slug={slug} />}

      {/* Prețuri */}
      {prices && (
        <section className="py-20 px-6 bg-[#E8E1D8]">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col items-center text-center gap-5 mb-12">
              <h2 className="text-4xl text-[#4A403A]" style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300 }}>
                Lista de Prețuri
              </h2>
              <div className="gold-line" />
            </div>

            {/* Ședință unică */}
            {prices.single && (
              <div className="mb-12">
                {prices.packages && (
                  <h3 className="text-xl text-[#4A403A] mb-6" style={{ fontFamily: 'var(--font-cormorant)' }}>
                    Ședință Unică
                  </h3>
                )}
                <div className="flex flex-col">
                  {prices.single.map((item, i) => (
                    <div
                      key={i}
                      className="flex flex-col py-5 border-b border-[#D8B7A6] last:border-0 gap-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-[#C6A769] text-xs">◇</span>
                          <span className="text-[#4A403A] text-base" style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 500 }}>
                            {item.name}
                          </span>
                          {item.duration && (
                            <span className="text-[#7A6F66] text-sm" style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 400 }}>
                              · {item.duration}
                            </span>
                          )}
                        </div>
                        <span className="text-[#C6A769] flex-shrink-0 ml-4" style={{ fontFamily: 'var(--font-cormorant)', fontSize: '22px', fontWeight: 600 }}>
                          {item.price}
                        </span>
                      </div>
                      {item.description && (
                        <p className="text-[#7A6F66] text-sm leading-relaxed pl-5" style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 400 }}>
                          {item.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Pachete */}
            {prices.packages && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {prices.packages.map((pkg, i) => (
                  <div key={i} className="bg-[#F8F6F2] p-8 flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl text-[#4A403A]" style={{ fontFamily: 'var(--font-cormorant)' }}>
                        {pkg.name}
                      </h3>
                      {pkg.discount && (
                        <span className="text-[#C6A769] text-xs tracking-wide border border-[#C6A769] px-2 py-0.5" style={{ fontFamily: 'var(--font-montserrat)' }}>
                          {pkg.discount}
                        </span>
                      )}
                    </div>
                    <div className="gold-line" style={{ marginLeft: '0' }} />
                    <div className="flex flex-col gap-3 mt-2">
                      {pkg.items.map((item, j) => (
                        <div key={j} className="flex justify-between items-center">
                          <span className="text-[#7A6F66] text-xs" style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 300 }}>
                            {item.name}
                          </span>
                          <span className="text-[#C6A769]" style={{ fontFamily: 'var(--font-cormorant)', fontSize: '17px' }}>
                            {item.price}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      <Footer />
    </>
  );
}
