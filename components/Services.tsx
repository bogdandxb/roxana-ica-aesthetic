import Link from 'next/link';
import Image from 'next/image';
import { services } from '@/lib/services';

export default function Services() {
  return (
    <section id="servicii" className="py-28 px-3 md:px-6 bg-[#F8F6F2]">
      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col items-center text-center gap-5 mb-10 md:mb-20">
          <span className="text-[#B8952A] tracking-[0.25em] text-sm uppercase" style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 500 }}>
            Ce Oferim
          </span>
          <h2 className="text-4xl md:text-5xl text-[#4A403A]" style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300 }}>
            Serviciile Noastre
          </h2>
          <div className="gold-line" />
          <p className="text-[#7A6F66] max-w-xl text-base leading-relaxed" style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 400 }}>
            Fiecare tratament este personalizat în funcție de nevoile tale, cu tehnologii de ultimă generație.
          </p>
        </div>

        {/* Telefon: 3 căsuțe mici pe rând (doar poză + titlu); de la md în sus: cardurile mari */}
        <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-6">
          {services.map((service) => {
            // Pe telefon, Mentorat & Cursuri apare ca bandă pe toată lățimea (poză stânga, text dreapta)
            const band = service.slug === 'mentorat-cursuri';
            return (
            <Link
              key={service.id}
              href={`/servicii/${service.slug}`}
              className={`group flex ${band ? 'col-span-3 flex-row md:col-span-1 md:flex-col' : 'flex-col'} overflow-hidden bg-[#F8F6F2] border border-[#E8E1D8] hover:border-[#B8952A] transition-all duration-300 cursor-pointer`}
              style={{ boxShadow: '0 2px 20px rgba(74,64,58,0.06)' }}
            >
              {/* Poza / Video */}
              <div className={`relative ${band ? 'w-1/3 shrink-0 md:w-auto' : ''} aspect-square md:aspect-auto md:h-64 overflow-hidden`}>
                {service.id === 'recuperare-terapie' ? (
                  <div className="flex h-full">
                    <div className="relative flex-1 overflow-hidden">
                      <Image src="/images/servicii/tecar.jpg" alt="Terapie Tecar" fill className="object-cover object-center group-hover:scale-105 transition-transform duration-700" />
                    </div>
                    <div className="w-px bg-white/40 z-10" />
                    <div className="relative flex-1 overflow-hidden">
                      <Image src="/images/servicii/g5.jpg" alt="Masaj G5" fill className="object-cover object-center group-hover:scale-105 transition-transform duration-700" />
                    </div>
                  </div>
                ) : service.image.endsWith('.mp4') ? (
                  <video
                    src={service.image}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className={`w-full h-full object-cover ${service.imagePosition ?? 'object-center'} group-hover:scale-105 transition-transform duration-700`}
                  />
                ) : (
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className={`object-cover ${service.imagePosition ?? 'object-center'} group-hover:scale-105 transition-transform duration-700`}
                  />
                )}
                <div className="absolute inset-0 bg-[#4A403A] opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              </div>

              {/* Text */}
              <div className={`${band ? 'p-4 justify-center gap-1.5' : 'p-2 gap-3'} md:p-7 md:justify-start md:gap-3 flex flex-col flex-1 min-w-0`}>
                <h3 className={`${band ? 'text-xl' : 'text-[13px]'} max-md:leading-tight md:text-xl text-[#4A403A] group-hover:text-[#B8952A] transition-colors break-words`} style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 400 }}>
                  <span className="md:hidden" style={{ fontWeight: 600 }}>{service.title}</span>
                  <span className="hidden md:inline">{service.title}</span>
                </h3>
                {band && (
                  <>
                    <span className="md:hidden text-[#7A6F66] text-xs leading-snug" style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 400 }}>
                      {service.subtitle}
                    </span>
                    <span className="md:hidden text-[#B8952A] text-[11px] tracking-widest uppercase mt-1" style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 500 }}>
                      Detalii →
                    </span>
                  </>
                )}
                <p className="hidden md:block text-[#7A6F66] text-sm leading-relaxed flex-1" style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 400 }}>
                  {service.description}
                </p>
                <div className="hidden md:flex items-center gap-2 text-[#B8952A] text-sm tracking-widest uppercase group-hover:gap-4 transition-all mt-2" style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 500 }}>
                  <span>Detalii & Prețuri</span>
                  <span>→</span>
                </div>
              </div>
            </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
