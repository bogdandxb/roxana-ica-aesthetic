import Link from 'next/link';
import { services } from '@/lib/services';

export default function Footer() {
  return (
    <footer className="bg-[#4A403A] text-[#E8E1D8]">

      {/* Banda CTA deasupra footer */}
      <div className="border-t border-[#C6A769]/30 border-b border-[#C6A769]/30 py-8 px-6 text-center">
        <p className="text-[#D8B7A6] text-base md:text-lg" style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic' }}>
          „Programează-ți consultația și descoperă protocolul potrivit pentru tine."
        </p>
        <a
          href="https://wa.me/40771569093"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 btn-gold text-[10px]"
          style={{ fontFamily: 'var(--font-montserrat)' }}
        >
          Programează-te pe WhatsApp
        </a>
      </div>

      {/* Conținut principal */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 py-16 px-6">

        {/* Coloana 1 — Brand */}
        <div className="flex flex-col gap-5">
          <div>
            <p className="tracking-[0.2em] text-sm uppercase text-[#E8E1D8]" style={{ fontFamily: 'var(--font-montserrat)' }}>Roxana Ica</p>
            <p className="tracking-[0.3em] text-[11px] uppercase" style={{ fontFamily: 'var(--font-montserrat)', background: 'linear-gradient(135deg, #C9A84C, #8B6914)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Aesthetic</p>
          </div>
          <div className="gold-line" />
          <p className="text-[#E8E1D8] text-sm" style={{ fontFamily: 'var(--font-cormorant)', fontSize: '17px' }}>
            „Diferența Care Se Simte."
          </p>
          <p className="text-[#D8B7A6] text-sm leading-relaxed" style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 400 }}>
            Tratamente avansate, construite pe expertiză și protocoale personalizate.
          </p>

          {/* Social icons */}
          <div className="flex gap-4 mt-2">
            <a href="https://www.instagram.com/roxana_ica_brasov?igsh=MTQ1ZnBjbjEydGUxMQ==" target="_blank" rel="noopener noreferrer"
              className="w-9 h-9 border border-[#7A6F66] flex items-center justify-center text-[#D8B7A6] hover:border-[#C6A769] hover:text-[#C6A769] transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a href="https://www.facebook.com/share/1FdWAuiw7o/" target="_blank" rel="noopener noreferrer"
              className="w-9 h-9 border border-[#7A6F66] flex items-center justify-center text-[#D8B7A6] hover:border-[#C6A769] hover:text-[#C6A769] transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="https://www.tiktok.com/@rox22ro" target="_blank" rel="noopener noreferrer"
              className="w-9 h-9 border border-[#7A6F66] flex items-center justify-center text-[#D8B7A6] hover:border-[#C6A769] hover:text-[#C6A769] transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Coloana 2 — Servicii */}
        <div className="flex flex-col gap-4">
          <p className="text-[#C6A769] tracking-[0.2em] text-sm uppercase mb-1" style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 500 }}>Servicii</p>
          {services.map(s => (
            <Link key={s.id} href={`/servicii/${s.slug}`}
              className="text-[#D8B7A6] hover:text-[#C6A769] transition-colors text-sm tracking-wide"
              style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 400 }}>
              {s.title}
            </Link>
          ))}
        </div>

        {/* Coloana 3 — Contact */}
        <div className="flex flex-col gap-4">
          <p className="text-[#C6A769] tracking-[0.2em] text-sm uppercase mb-1" style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 500 }}>Contact</p>
          <a href="tel:0771569093" className="text-[#D8B7A6] hover:text-[#C6A769] transition-colors text-sm flex items-center gap-2" style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 400 }}>
            <span>☎</span> 0771 569 093
          </a>
          <p className="text-[#D8B7A6] text-sm leading-relaxed" style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 400 }}>
            Brașov, România<br />
            <span className="text-[#7A6F66] text-xs">Locație dedicată tratamentelor personalizate</span>
          </p>
          <a href="tel:0771569093" className="text-[#D8B7A6] hover:text-[#C6A769] transition-colors text-sm flex items-center gap-2 mt-2" style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 400 }}>
            WhatsApp: <span className="text-[#C6A769]">0771 569 093</span>
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto px-6 pb-8 pt-4 border-t border-[#7A6F66]/40 flex flex-col md:flex-row justify-between items-center gap-3">
        <p className="text-[#7A6F66] text-xs" style={{ fontFamily: 'var(--font-montserrat)' }}>
          © 2025 Roxana Ica Aesthetic. Toate drepturile rezervate.
        </p>
        <div className="flex gap-6">
          <Link
            href="/politica-de-confidentialitate"
            className="text-[#7A6F66] hover:text-[#C6A769] transition-colors text-xs tracking-wide"
            style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 300 }}
          >
            Politică de Confidențialitate
          </Link>
          <Link
            href="/termeni-si-conditii"
            className="text-[#7A6F66] hover:text-[#C6A769] transition-colors text-xs tracking-wide"
            style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 300 }}
          >
            Termeni și Condiții
          </Link>
        </div>
      </div>

    </footer>
  );
}
