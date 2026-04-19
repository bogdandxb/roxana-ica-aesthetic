import { services, pricesData } from '@/lib/services';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return services.map(s => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find(s => s.slug === slug);
  if (!service) return {};
  return {
    title: `${service.title} | Roxana Ica Aesthetic`,
    description: service.description,
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
              className="object-cover"
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
                      className="flex items-center justify-between py-4 border-b border-[#D8B7A6] last:border-0 group"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-[#C6A769] text-xs">◇</span>
                        <span className="text-[#4A403A] text-sm" style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 300 }}>
                          {item.name}
                        </span>
                        {item.duration && (
                          <span className="text-[#7A6F66] text-xs" style={{ fontFamily: 'var(--font-montserrat)' }}>
                            · {item.duration}
                          </span>
                        )}
                      </div>
                      <span className="text-[#C6A769] font-medium text-sm" style={{ fontFamily: 'var(--font-cormorant)', fontSize: '18px' }}>
                        {item.price}
                      </span>
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

      {/* CTA */}
      <section className="py-20 px-6 bg-[#4A403A] text-center">
        <div className="max-w-xl mx-auto flex flex-col items-center gap-6">
          <h2 className="text-3xl text-[#F8F6F2]" style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300 }}>
            Programează o consultație
          </h2>
          <div className="gold-line" />
          <p className="text-[#D8B7A6] text-sm" style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 300 }}>
            Contactează-mă pentru a stabili cel mai potrivit protocol pentru tine.
          </p>
          <a
            href="https://wa.me/40771569093"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold"
            style={{ fontFamily: 'var(--font-montserrat)' }}
          >
            Programare WhatsApp
          </a>
        </div>
      </section>

      <Footer />
    </>
  );
}
