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

            <a
              href="https://wa.me/40771569093"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold w-fit"
              style={{ fontFamily: 'var(--font-montserrat)' }}
            >
              Scrie pe WhatsApp
            </a>
          </div>

          {/* Formular */}
          <form className="flex flex-col gap-5">
            {[
              { label: 'Nume', type: 'text', placeholder: 'Numele tău' },
              { label: 'Telefon', type: 'tel', placeholder: '07xx xxx xxx' },
            ].map(field => (
              <div key={field.label} className="flex flex-col gap-2">
                <label className="text-[#7A6F66] text-xs tracking-widest uppercase" style={{ fontFamily: 'var(--font-montserrat)' }}>
                  {field.label}
                </label>
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  className="bg-transparent border-b border-[#E8E1D8] focus:border-[#C6A769] outline-none py-3 text-[#4A403A] text-sm placeholder-[#D8B7A6] transition-colors"
                  style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 300 }}
                />
              </div>
            ))}

            <div className="flex flex-col gap-2">
              <label className="text-[#7A6F66] text-xs tracking-widest uppercase" style={{ fontFamily: 'var(--font-montserrat)' }}>
                Serviciu dorit
              </label>
              <input
                type="text"
                placeholder="Ex: Epilare definitivă, Remodelare..."
                className="bg-transparent border-b border-[#E8E1D8] focus:border-[#C6A769] outline-none py-3 text-[#4A403A] text-sm placeholder-[#D8B7A6] transition-colors"
                style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 300 }}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[#7A6F66] text-xs tracking-widest uppercase" style={{ fontFamily: 'var(--font-montserrat)' }}>
                Mesaj
              </label>
              <textarea
                rows={3}
                placeholder="Orice detalii relevante..."
                className="bg-transparent border-b border-[#E8E1D8] focus:border-[#C6A769] outline-none py-3 text-[#4A403A] text-sm placeholder-[#D8B7A6] transition-colors resize-none"
                style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 300 }}
              />
            </div>

            <button type="submit" className="btn-gold w-fit mt-2" style={{ fontFamily: 'var(--font-montserrat)' }}>
              Trimite Mesajul
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
