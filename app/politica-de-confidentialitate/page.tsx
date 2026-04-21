import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const metadata = {
  title: 'Politică de Confidențialitate | Roxana Ica Aesthetic',
  description: 'Politica de confidențialitate și protecția datelor personale — Roxana Ica Aesthetic, Brașov.',
};

export default function PoliticaConfidentialitate() {
  return (
    <>
      <Navigation />

      <section className="pt-40 pb-24 px-6 bg-[#F8F6F2] min-h-screen">
        <div className="max-w-3xl mx-auto">

          <div className="flex flex-col gap-4 mb-12">
            <span className="text-[#C6A769] tracking-[0.25em] text-xs uppercase" style={{ fontFamily: 'var(--font-montserrat)' }}>
              Legal
            </span>
            <h1 className="text-4xl md:text-5xl text-[#4A403A]" style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300 }}>
              Politică de Confidențialitate
            </h1>
            <div className="gold-line" style={{ marginLeft: 0 }} />
            <p className="text-[#7A6F66] text-xs" style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 300 }}>
              Ultima actualizare: aprilie 2025
            </p>
          </div>

          <div className="flex flex-col gap-10 text-[#7A6F66] text-sm leading-relaxed" style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 300 }}>

            <div className="flex flex-col gap-3">
              <h2 className="text-[#4A403A] text-xl" style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 400 }}>1. Cine suntem</h2>
              <p>
                Roxana Ica Aesthetic este un cabinet de estetică situat în Brașov, str. Dihamului 16A. Responsabilul cu prelucrarea datelor cu caracter personal este Roxana Ica, contact: <a href="tel:0771569093" className="text-[#C6A769] hover:underline">0771 569 093</a>.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <h2 className="text-[#4A403A] text-xl" style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 400 }}>2. Ce date colectăm</h2>
              <p>Prin formularul de contact de pe acest site, colectăm:</p>
              <ul className="flex flex-col gap-2 pl-4">
                {['Numele și prenumele', 'Numărul de telefon', 'Serviciul solicitat', 'Mesajul opțional transmis'].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-[#C6A769] flex-shrink-0 mt-0.5">◇</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-3">
              <h2 className="text-[#4A403A] text-xl" style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 400 }}>3. De ce colectăm aceste date</h2>
              <p>
                Datele sunt colectate exclusiv în scopul contactării dumneavoastră pentru confirmarea sau planificarea unei programări. Nu folosim datele în scopuri de marketing fără consimțământul dumneavoastră explicit.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <h2 className="text-[#4A403A] text-xl" style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 400 }}>4. Temeiul legal</h2>
              <p>
                Prelucrarea datelor se bazează pe consimțământul dumneavoastră (art. 6 alin. 1 lit. a din Regulamentul GDPR 679/2016), exprimat prin completarea și trimiterea formularului de contact.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <h2 className="text-[#4A403A] text-xl" style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 400 }}>5. Cât timp păstrăm datele</h2>
              <p>
                Datele transmise prin formularul de contact sunt păstrate pe durata necesară gestionării solicitării dumneavoastră, dar nu mai mult de 12 luni. Datele pot fi șterse la cerere oricând.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <h2 className="text-[#4A403A] text-xl" style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 400 }}>6. Nu vindem datele</h2>
              <p>
                Datele dumneavoastră nu sunt partajate, vândute sau transferate unor terțe părți în scopuri comerciale. Acestea sunt utilizate exclusiv de Roxana Ica Aesthetic pentru gestionarea programărilor.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <h2 className="text-[#4A403A] text-xl" style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 400 }}>7. Drepturile dumneavoastră</h2>
              <p>Conform GDPR, aveți dreptul la:</p>
              <ul className="flex flex-col gap-2 pl-4">
                {[
                  'Acces la datele personale deținute despre dumneavoastră',
                  'Rectificarea datelor inexacte',
                  'Ștergerea datelor („dreptul de a fi uitat")',
                  'Restricționarea prelucrării',
                  'Portabilitatea datelor',
                  'Depunerea unei plângeri la ANSPDCP (www.dataprotection.ro)',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-[#C6A769] flex-shrink-0 mt-0.5">◇</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p>
                Pentru exercitarea acestor drepturi, ne puteți contacta la <a href="tel:0771569093" className="text-[#C6A769] hover:underline">0771 569 093</a>.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <h2 className="text-[#4A403A] text-xl" style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 400 }}>8. Cookie-uri</h2>
              <p>
                Acest site nu utilizează cookie-uri de tracking sau de publicitate. Pot fi utilizate cookie-uri tehnice esențiale pentru funcționarea corectă a site-ului.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <h2 className="text-[#4A403A] text-xl" style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 400 }}>9. Modificări</h2>
              <p>
                Ne rezervăm dreptul de a actualiza această politică de confidențialitate. Orice modificare va fi publicată pe această pagină cu data actualizării.
              </p>
            </div>

          </div>

          <div className="mt-16 pt-8 border-t border-[#E8E1D8]">
            <Link href="/" className="text-[#C6A769] text-xs tracking-widest uppercase flex items-center gap-2 hover:gap-4 transition-all" style={{ fontFamily: 'var(--font-montserrat)' }}>
              ← Înapoi la pagina principală
            </Link>
          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}
