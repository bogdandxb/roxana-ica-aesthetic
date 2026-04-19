import Link from 'next/link';
import Image from 'next/image';
import { services } from '@/lib/services';

export default function Services() {
  return (
    <section id="servicii" className="py-28 px-6 bg-[#F8F6F2]">
      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col items-center text-center gap-5 mb-20">
          <span className="text-[#B8952A] tracking-[0.25em] text-xs uppercase" style={{ fontFamily: 'var(--font-montserrat)' }}>
            Ce Oferim
          </span>
          <h2 className="text-4xl md:text-5xl text-[#4A403A]" style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300 }}>
            Serviciile Noastre
          </h2>
          <div className="gold-line" />
          <p className="text-[#7A6F66] max-w-xl text-sm leading-relaxed" style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 300 }}>
            Fiecare tratament este personalizat în funcție de nevoile tale, cu tehnologii de ultimă generație.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Link
              key={service.id}
              href={`/servicii/${service.slug}`}
              className="group flex flex-col overflow-hidden bg-[#F8F6F2] border border-[#E8E1D8] hover:border-[#B8952A] transition-all duration-300 cursor-pointer"
              style={{ boxShadow: '0 2px 20px rgba(74,64,58,0.06)' }}
            >
              {/* Poza / Video */}
              <div className="relative h-64 overflow-hidden">
                {service.image.endsWith('.mp4') ? (
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
              <div className="p-7 flex flex-col gap-3 flex-1">
                <h3 className="text-xl text-[#4A403A] group-hover:text-[#B8952A] transition-colors" style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 400 }}>
                  {service.title}
                </h3>
                <p className="text-[#7A6F66] text-xs leading-relaxed flex-1" style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 300 }}>
                  {service.description}
                </p>
                <div className="flex items-center gap-2 text-[#B8952A] text-xs tracking-widest uppercase group-hover:gap-4 transition-all mt-2" style={{ fontFamily: 'var(--font-montserrat)' }}>
                  <span>Detalii & Prețuri</span>
                  <span>→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
