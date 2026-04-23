import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Termeni și Condiții | Roxana Ica Aesthetic',
  description: 'Termeni și condiții de utilizare a serviciilor Roxana Ica Aesthetic, Brașov.',
};

export default function TermeniConditii() {
  return (
    <>
      <Navigation />

      <section className="pt-32 pb-20 px-6 bg-[#E8E1D8]">
        <div className="max-w-3xl mx-auto flex flex-col items-center text-center gap-6">
          <Link
            href="/"
            className="text-[#C6A769] text-xs tracking-widest uppercase flex items-center gap-2 hover:gap-4 transition-all"
            style={{ fontFamily: 'var(--font-montserrat)' }}
          >
            ← Înapoi acasă
          </Link>
          <h1 className="text-5xl text-[#4A403A]" style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300 }}>
            Termeni și Condiții
          </h1>
          <div className="gold-line" />
          <p className="text-[#7A6F66] text-sm" style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 300 }}>
            Ultima actualizare: Aprilie 2025
          </p>
        </div>
      </section>

      <section className="py-16 px-6 bg-[#F8F6F2]">
        <div className="max-w-3xl mx-auto flex flex-col gap-10">

          {[
            {
              title: '1. Programări',
              content: `Serviciile oferite de Roxana Ica Aesthetic se desfășoară exclusiv pe bază de programare prealabilă. Nu se efectuează tratamente fără programare confirmată în prealabil.\n\nProgramările se realizează prin WhatsApp la numărul 0771 569 093 sau prin alte canale de comunicare indicate pe site.`,
            },
            {
              title: '2. Confirmare și anulare',
              content: `Programarea se consideră confirmată după ce ați primit un răspuns de confirmare din partea noastră.\n\nVă rugăm să anulați sau să reprogramați cu cel puțin 24 de ore înainte. Anulările repetate de ultim moment pot duce la refuzul unor programări viitoare.`,
            },
            {
              title: '3. Servicii',
              content: `Toate tratamentele sunt personalizate în funcție de nevoile individuale ale fiecărui client. Rezultatele pot varia în funcție de tipul de piele, starea de sănătate și alți factori individuali.\n\nRoxana Ica Aesthetic nu garantează rezultate identice pentru toți clienții.`,
            },
            {
              title: '4. Contraindicații',
              content: `Clientul are obligația de a informa specialistul despre orice afecțiune medicală, tratament în curs, sarcină sau altă condiție relevantă înainte de efectuarea unui tratament.\n\nRoxana Ica Aesthetic nu este responsabilă pentru efectele adverse cauzate de nedeclararea unor contraindicații.`,
            },
            {
              title: '5. Prețuri și plată',
              content: `Prețurile afișate pe site sunt orientative și pot fi actualizate fără notificare prealabilă. Prețul final va fi comunicat la momentul programării sau la consultație.\n\nPlata se efectuează la sediu, după efectuarea tratamentului.`,
            },
            {
              title: '6. Confidențialitate',
              content: `Datele personale colectate sunt utilizate exclusiv pentru gestionarea programărilor și comunicarea cu clienții. Pentru detalii, consultați Politica de Confidențialitate.`,
            },
            {
              title: '7. Contact',
              content: `Pentru orice întrebări legate de acești termeni, ne puteți contacta:\n\nTelefon / WhatsApp: 0771 569 093\nAdresă: Str. Dihamului 16A, Brașov`,
            },
          ].map((section) => (
            <div key={section.title} className="flex flex-col gap-4">
              <h2 className="text-2xl text-[#4A403A]" style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 400 }}>
                {section.title}
              </h2>
              <div className="h-px bg-[#E8E1D8]" />
              {section.content.split('\n\n').map((para, i) => (
                <p key={i} className="text-[#7A6F66] text-sm leading-relaxed" style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 300 }}>
                  {para}
                </p>
              ))}
            </div>
          ))}

        </div>
      </section>

      <Footer />
    </>
  );
}
