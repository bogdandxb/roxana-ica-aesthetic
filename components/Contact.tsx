export default function Contact() {
  return (
    <section id="contact" className="py-28 px-6 bg-[#F8F6F2]">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex flex-col items-center text-center gap-5 mb-16">
          <span className="text-[#C6A769] tracking-[0.25em] text-xs uppercase" style={{ fontFamily: 'var(--font-montserrat)' }}>
            Programare
          </span>
          <h2 className="text-4xl md:text-5xl text-[#4A403A]" style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300 }}>
            Contactează-mă
          </h2>
          <div className="gold-line" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

          {/* Info contact */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <span className="text-[#C6A769] text-xs tracking-widest uppercase" style={{ fontFamily: 'var(--font-montserrat)' }}>Telefon & WhatsApp</span>
              <a href="tel:0771569093" className="text-[#4A403A] text-2xl hover:text-[#C6A769] transition-colors" style={{ fontFamily: 'var(--font-cormorant)' }}>
                0771 569 093
              </a>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-[#C6A769] text-xs tracking-widest uppercase" style={{ fontFamily: 'var(--font-montserrat)' }}>Locație</span>
              <p className="text-[#7A6F66] text-sm" style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 300 }}>
                Dihamului 16A<br />Brașov, România
              </p>
              <div className="mt-2 overflow-hidden border border-[#E8E1D8]" style={{ borderRadius: 0 }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2791.0!2d25.6048!3d45.6427!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b35ca3e3e3e3e3%3A0x0!2sStrada+Dihamului+16A%2C+Bra%C8%99ov+500353%2C+Romania!5e0!3m2!1sro!2sro!4v1714000000000!5m2!1sro!2sro"
                  width="100%"
                  height="200"
                  style={{ border: 0, display: 'block' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Roxana Ica Aesthetic — Dihamului 16A, Brașov"
                />
              </div>
              <a
                href="https://maps.google.com/?q=Strada+Dihamului+16A,+Brasov,+Romania"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#C6A769] text-[10px] tracking-widest uppercase flex items-center gap-1 hover:gap-3 transition-all mt-1"
                style={{ fontFamily: 'var(--font-montserrat)' }}
              >
                Deschide în Google Maps →
              </a>
            </div>

            <div className="flex flex-col gap-4">
              <span className="text-[#C6A769] text-xs tracking-widest uppercase" style={{ fontFamily: 'var(--font-montserrat)' }}>Social Media</span>
              <div className="flex gap-4">
                <a
                  href="https://www.instagram.com/roxana_ica_brasov?igsh=MTQ1ZnBjbjEydGUxMQ=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#7A6F66] hover:text-[#C6A769] transition-colors text-xs tracking-widest uppercase border-b border-[#E8E1D8] hover:border-[#C6A769] pb-0.5"
                  style={{ fontFamily: 'var(--font-montserrat)' }}
                >
                  Instagram
                </a>
                <a
                  href="https://www.facebook.com/share/1FdWAuiw7o/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#7A6F66] hover:text-[#C6A769] transition-colors text-xs tracking-widest uppercase border-b border-[#E8E1D8] hover:border-[#C6A769] pb-0.5"
                  style={{ fontFamily: 'var(--font-montserrat)' }}
                >
                  Facebook
                </a>
                <a
                  href="https://www.tiktok.com/@rox22ro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#7A6F66] hover:text-[#C6A769] transition-colors text-xs tracking-widest uppercase border-b border-[#E8E1D8] hover:border-[#C6A769] pb-0.5"
                  style={{ fontFamily: 'var(--font-montserrat)' }}
                >
                  TikTok
                </a>
              </div>
            </div>

          </div>

          {/* WhatsApp CTA */}
          <div className="flex flex-col gap-8 justify-center">
            <div className="flex flex-col gap-4">
              <p className="text-[#4A403A] text-2xl md:text-3xl leading-snug" style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontStyle: 'italic' }}>
                „Cel mai simplu mod de a te programa este direct pe WhatsApp."
              </p>
              <div className="gold-line" style={{ marginLeft: 0 }} />
              <p className="text-[#7A6F66] text-sm leading-relaxed" style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 300 }}>
                Scrie-mi un mesaj cu numele tău și serviciul dorit, și te contactez eu în cel mai scurt timp pentru a stabili detaliile.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              {[
                { label: 'Protocoale Faciale', msg: 'Bună ziua! Aș dori să mă programez pentru Protocoale Faciale.' },
                { label: 'Epilare Definitivă', msg: 'Bună ziua! Aș dori să mă programez pentru Epilare Definitivă.' },
                { label: 'Remodelare Corporală', msg: 'Bună ziua! Aș dori să mă programez pentru Remodelare Corporală.' },
                { label: 'Alt serviciu', msg: 'Bună ziua! Aș dori să mă programez. Vă rog să mă contactați.' },
              ].map((item) => (
                <a
                  key={item.label}
                  href={`https://wa.me/40771569093?text=${encodeURIComponent(item.msg)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-5 py-4 border border-[#E8E1D8] hover:border-[#C6A769] group transition-all"
                  style={{ fontFamily: 'var(--font-montserrat)' }}
                >
                  <span className="text-[#4A403A] group-hover:text-[#C6A769] transition-colors text-xs tracking-wide uppercase">{item.label}</span>
                  <span className="text-[#C6A769] text-xs group-hover:translate-x-1 transition-transform">→</span>
                </a>
              ))}
            </div>

            <a
              href="https://wa.me/40771569093"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold w-fit flex items-center gap-3"
              style={{ fontFamily: 'var(--font-montserrat)' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Deschide WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
