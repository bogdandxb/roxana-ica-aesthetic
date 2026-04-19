import Link from 'next/link';
import { services } from '@/lib/services';

export default function Footer() {
  return (
    <footer className="bg-[#4A403A] text-[#E8E1D8] py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">

        <div className="flex flex-col gap-5">
          <div>
            <p className="tracking-[0.2em] text-xs uppercase text-[#E8E1D8]" style={{ fontFamily: 'var(--font-montserrat)' }}>Roxana Ica</p>
            <p className="tracking-[0.3em] text-[10px] uppercase" style={{ fontFamily: 'var(--font-montserrat)', background: 'linear-gradient(135deg, #C9A84C, #8B6914)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Aesthetic</p>
          </div>
          <div className="gold-line" />
          <p className="text-[#D8B7A6] text-xs leading-relaxed italic" style={{ fontFamily: 'var(--font-cormorant)', fontSize: '15px' }}>
            „Diferența Care Se Simte"
          </p>
          <div className="flex gap-4 mt-2">
            {[
              { label: 'Instagram', href: 'https://www.instagram.com/roxana_ica_brasov?igsh=MTQ1ZnBjbjEydGUxMQ==' },
              { label: 'Facebook', href: 'https://www.facebook.com/share/1FdWAuiw7o/' },
              { label: 'TikTok', href: 'https://www.tiktok.com/@rox22ro' },
            ].map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                className="text-[#D8B7A6] hover:text-[#B8952A] transition-colors text-xs tracking-widest"
                style={{ fontFamily: 'var(--font-montserrat)' }}>
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <p className="text-[#B8952A] tracking-[0.2em] text-xs uppercase" style={{ fontFamily: 'var(--font-montserrat)' }}>Servicii</p>
          {services.map(s => (
            <Link key={s.id} href={`/servicii/${s.slug}`}
              className="text-[#D8B7A6] hover:text-[#B8952A] transition-colors text-xs tracking-wide"
              style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 300 }}>
              {s.title}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          <p className="text-[#B8952A] tracking-[0.2em] text-xs uppercase" style={{ fontFamily: 'var(--font-montserrat)' }}>Contact</p>
          <a href="tel:0771569093" className="text-[#D8B7A6] hover:text-[#B8952A] transition-colors text-xs" style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 300 }}>
            0771 569 093
          </a>
          <p className="text-[#D8B7A6] text-xs leading-relaxed" style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 300 }}>
            Dihamului 16A<br />Brașov, România
          </p>
          <a href="https://wa.me/40771569093" target="_blank" rel="noopener noreferrer"
            className="text-[#B8952A] hover:text-[#C9A84C] transition-colors text-xs tracking-widest uppercase border-b border-[#B8952A] w-fit pb-0.5"
            style={{ fontFamily: 'var(--font-montserrat)' }}>
            WhatsApp
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-[#7A6F66] flex justify-between items-center">
        <p className="text-[#7A6F66] text-xs" style={{ fontFamily: 'var(--font-montserrat)' }}>
          © 2025 Roxana Ica Aesthetic. Toate drepturile rezervate.
        </p>
      </div>
    </footer>
  );
}
