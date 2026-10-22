'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { GOOGLE_REVIEW_URL } from '@/lib/google-review';

const reviews = [
  { name: 'Carmen Laura Rebei', text: 'Recomand cu căldură serviciile Roxanei deoarece rezultatele s-au văzut încă de la prima ședință de epilare. Pielea a devenit din ce în ce mai fină și pot spune că am scăpat de foliculită. Profesionalismul și pasiunea de care dă dovadă, mă motivează să revin cu plăcere, de fiecare dată!' },
  { name: 'Andrada Vîlcu', text: 'A fost una dintre cele mai bune decizii pe care le-am luat pentru mine. Acum pot spune că mă bucur de o piele mult mai fină, fără grija epilatului constant, fără iritații și fără stres. Recomand cu drag oricărei persoane care își dorește confort și mai multă încredere în sine.' },
  { name: 'Roxana Păncescu', text: 'O recomand din tot sufletul pe Roxi, adevărata vindecătoare a tenului meu! Am trecut prin numeroși dermatologi fără niciun rezultat real. De când am ajuns la Roxi, totul s-a schimbat. Încă de la prima ședință, rezultatele au fost vizibile. Pentru mine, Roxi este cel mai bun dermatolog al pielii.' },
  { name: 'Tamara Trifan', text: 'Nu este doar talentată, ci este cea mai pasionată persoană pe care o cunosc în acest domeniu. Mi-a curățat fața de pete pigmentare vechi de peste 20 ani. Acum tenul meu radiază, nu mai am complexe și am trecut de la fond de ten cu acoperire mare la bb cream și nimic altceva.' },
  { name: 'Roxana B', text: 'Roxana pune devotament, pasiune și profesionalism în ceea ce face. O recomand tuturor femeilor care își doresc mai multă încredere în sine și o schimbare semnificativă!' },
  { name: 'Monica Coman', text: 'Pot spune cu încredere că a fost o alegere excelentă. Experiența a fost de fiecare dată impecabilă și m-a cucerit din prima clipă! Este extrem de atentă la detalii. M-am simțit răsfățată, relaxată și cu o piele mai luminoasă ca niciodată!' },
  { name: 'Laura Vlădău', text: 'Dacă sunteți în căutarea unui loc unde profesionalismul se îmbină perfect cu relaxarea, Roxana este omul la care trebuie să ajungeți. Știe să asculte și să ofere exact ceea ce ai nevoie. Revin cu drag de fiecare dată!' },
  { name: 'Adriana Runner', text: 'O experiență minunată! Roxana a dat dovadă de profesionalism, grijă și atenție la detalii. Tenul meu nu a mai strălucit așa de mult de multă vreme, iar rezultatul se vede și se simte. Recomand din toată inima!' },
  { name: 'Monica Zbarcea', text: 'Profesionalism, implicare, pasiune, atenție, răbdare, de toate am avut parte la Roxana Ica Aesthetic. Tenul arată mai curat, mai fin, mai luminos pe o perioadă lungă de timp. Recomand cu încredere!' },
  { name: 'Corina Ibanescu', text: 'Am avut o experiență remarcabilă cu Roxana, o profesionistă desăvârșită. Și-a făcut timp să explice fiecare pas cu răbdare și claritate. M-a ajutat să înțeleg opțiunile potrivite pentru nevoile mele. Recomand cu încredere!' },
  { name: 'Cristian Mocanu', text: 'Prima mea experiență cu un tratament facial profesional a fost peste așteptări. Nu credeam că o curățare cosmetică poate face o diferență atât de mare, dar pielea mea arată vizibil mai curată, mai fină și mult mai hidratată.' },
  { name: 'Denisa Ungureanu', text: 'O cunosc pe Roxana de aproximativ trei ani, în continuare merg cu regularitate la ea. Spre deosebire de alte opțiuni intens promovate pe piață, am avut parte de o părere autentică și profesională. O recomand cu mare drag!' },
  { name: 'Simona Belibou', text: 'Am avut parte de o experiență minunată datorită Roxanei, o persoană pasionată de ceea ce face, atentă și foarte pricepută. Mulțumesc Roxi pentru răsfăț și profesionalism! Recomand cu drag!' },
  { name: 'Livia Grosaru', text: 'Sunt clienta fidelă și îndrăgostită de Roxana! Am testat toate tratamentele oferite de ea și sunt super mulțumită de rezultate! Programările la Roxi au devenit dependență. The best in town!' },
  { name: 'Malina Pop', text: 'Este o cosmeticiană impecabilă, cu mâini de aur și o atitudine caldă și prietenoasă. De fiecare dată când merg la ea, fața mea capătă un glow incredibil și tenul arată vizibil mai sănătos. O recomand din suflet!' },
  { name: 'Arianna Tudor', text: 'Ador fiecare tratament facial făcut la Rox — e o oră de terapie, de răsfăț și cele mai faine discuții. Pleci nu doar cu un ten luminos, ci și cu un super vibe care te ține toată ziua. Revin mereu cu drag!' },
  { name: 'Adina Albu', text: 'Roxana este o cosmeticiană extraordinară. De la prima întâlnire, am fost impresionată de profesionalismul ei și de abordarea personalizată. Am observat o îmbunătățire semnificativă a stării pielii mele. Recomand cu căldură!' },
  { name: 'Andrada Roman', text: 'Mulțumesc Roxana pentru cel mai sănătos și strălucitor ten. Mi-am dorit să am un ten luminos și exact asta mi-ai oferit, plus hidratare și bună dispoziție. Ai mâini de aur!' },
  { name: 'Mădălina Maria', text: 'Profesionalismul, atenția la detalii și atmosfera relaxantă din cabinet m-au făcut să mă simt complet răsfățată. Produsele folosite sunt de calitate superioară, iar rezultatele au fost vizibile imediat.' },
  { name: 'Valentina Manea', text: 'De când am cunoscut-o pe Roxana, încrederea în mine a crescut enorm! Roxana a devenit mult mai mult pentru mine – o prietenă dragă, o profesionistă desăvârșită și omul care m-a ajutat să mă simt mai bine în pielea mea.' },
  { name: 'Oana Maria', text: 'Nu am cuvinte să descriu devotamentul și pasiunea ei pentru acest domeniu. Pe lângă serviciile de înaltă calitate, Roxi creează și o adevărată terapie prin atmosfera din timpul tratamentelor. Cea mai bună cosmeticiană!' },
  { name: 'Laura E Ghinea', text: 'If you\'re searching for a way to keep your skin smooth and healthy, you\'re in the right place. I\'ve been seeing Roxana for over a year now, and I still find it refreshing to meet with her at least once a month. Thank you, Roxana!' },
  { name: 'Magda Lalau', text: 'The best in Brasov! Am primit cadou de la fiica-mea curățare facială. A fost o experiență unică de la customer service până la profesionalism greu de găsit. Roxana este o beauticiană desăvârșită. Recomand!' },
  { name: 'Clau Mîndreanu', text: 'O recomand cu toată încrederea pe Roxana! Prin profesionalismul și dedicarea ei, mi-a transformat tenul, oferindu-i luminozitate și un aspect impecabil. Fiecare ședință este o experiență plăcută.' },
  { name: 'Elena Royal', text: 'Profesionalism, dedicare, implicare și mai ales calitatea produselor pentru un ten sensibil, mă face întotdeauna recunoscătoare și fericită datorită Roxanei. Mulțumesc infinit!' },
];

// Recenzii Google (transcrise din Google Maps). Cele care se termină în „…” sunt trunchiate în Google ("More").
const googleReviews = [
  { name: 'Andre Sonya', text: 'Merg la Roxana din august și pot spune sincer că experiența e la cu totul alt nivel. Am făcut epilare definitivă, remodelare corporală și tratamente faciale, iar rezultatele și modul în care mă simt după fiecare ședință sunt peste așteptări. Roxana nu oferă doar servicii, ci creează o experiență. De fiecare dată când ajung la ea, parcă intru într-o altă lume — una în care mă pot relaxa complet, unde sunt răsfățată, ascultată și îngrijită cu atenție reală. Se vede pasiunea ei pentru ceea ce face, profesionalismul și grija pentru detalii. Nu e doar despre estetică, ci despre starea pe care o ai când pleci de acolo: mai încrezătoare, mai relaxată și cu un boost de energie. O recomand din toată inima oricui vrea mai mult decât un simplu tratament — o experiență care chiar face diferența.' },
  { name: 'Magdalena Mogos Oratie', text: 'Am mers la Roxana ceva timp și la mai multe proceduri și pot spune sincer că, experiența este de fiecare dată peste așteptări. Roxana este extrem de profesionistă, atentă la detalii și știe exact cum să identifice zonele tensionate și să le …' },
  { name: 'Anca Cojocaru', text: 'Merg la Roxana de câteva luni bune și pot spune cu mâna pe inimă că este una dintre cele mai bune decizii pe care le-am luat pentru mine. De fiecare dată când ies din cabinet mă simt mai tânără, mai relaxată și mai …' },
  { name: 'Denisa Ungureanu', text: 'Merg la Roxana de mulți ani și cred că asta spune deja tot 😄 Între timp am ajuns să îi las fața mea în custodie fără emoții pentru tot felul de tratamente, pentru că are foarte multă atenție la detalii și se vede că știe …' },
  { name: 'Ioana Burciu', text: 'O recomand pe Roxana din tot sufletul! Merg la ea de aproape 3 ani pentru tratamente corporale, faciale și epilare definitivă, iar experiența a fost mereu minunată. Dincolo de profesionalism și de cât de atentă este la tot ce face, Roxana …' },
  { name: 'Georgiana Bejan', text: 'Am avut un tratament facial la Roxana Ica Aesthetic cu Roxana si a fost o experienta foarte placuta de la inceput pana la sfarsit. Roxana este foarte atenta, delicata si profesionista, ceea te face sa te simti confortabil imediat. …' },
  { name: 'Mari Pascu', text: 'merg cu drag de fiecare data sa ma las rasfatata indiferent ca este tratament facial sau drenaj limfatic! am ajuns sa am atata incredere incat nici nu o mai intreb ce tratament imi face. diferenta dupa nici 6 luni este foarte mare: pielea …' },
  { name: 'Elena Galynska', text: 'O experiență foarte plăcută! Roxana mi-a explicat fiecare pas al procedurii. M-am simțit răsfățată. Recomand cu drag' },
  { name: 'Bitay Julia', text: 'Recomand cu drag! Servicii de calitate și multă profesionalitate. Orice tratament mi-a făcut a fost explicat pe înțelesul meu, astfel încât să înțeleg întregul proces. Abia astept să revin luna viitoare !' },
  { name: 'MaX XaM', text: 'Am avut ieri sedinta de epilare cu laser la Roxana Ica Aesthetic si a fost o experienta absolut minunata. Din momentul in care am ajuns, Roxana m-a primit cu multa caldura si m-a facut sa ma simt imediat confortabil. Atmosfera din salon …' },
  { name: 'Maria Mocanu', text: 'Merg lunar la tratamente cosmetice desi am 73 de ani pentru ca am vazut pielea mai luminoasa si hidratata. Imi pare rau ca nu am dat importanta mai devreme. Roxana este incredibil de atenta si are foarte multe cu cunostinte si explica …' },
  { name: 'Simona Tudo', text: 'Tenul meu este mai luminos, mai hidratat! Cautam de mult un specialist care sa-mi aduca prospetime fetei! Un moment de rasfat la care orice femeie viseaza!' },
  { name: 'Mirela Ciobota', text: 'Am fost la Roxana pentru epilare definitivă și pot spune că, începând cu a treia ședință, rezultatele chiar s-au simțit – părul a crescut vizibil mai rar și mai fin. …' },
  { name: 'Karla Zamfir', text: 'Roxana este o cosmeticiană foarte bună, cu cunoștințe solide atât în cosmetică, cât și în medicină.' },
  { name: 'Raluca Danca', text: 'Experiența avută de fiecare dată când intru în cabinetul Roxanei este la superlativ, profesionalismul este la un nivel foarte înalt, îmi plac foarte mult produsele și tehnica pe care o folosește la tratamentele faciale, este prima cosmeticiana la care nu mă doare absolut nimic în timpul tratamentelor faciale. Rezultatele la epilarea definitivă se văd de la prima ședință, are cele mai performante și moderne aparate. Revin de fiecare dată cu drag.' },
  { name: 'Mirela Kornfeld', text: 'Roxy, draga mea, vreau să-ți spun cât de încântată am fost de experiența mea la tine! 💖 Pe lângă faptul că ai o mână incredibil de ușoară, mi-a plăcut foarte mult grija cu care ai făcut totul. Faptul că mi-ai aplicat crema anestezică înainte a făcut ca procedura să fie pentru mine absolut fără durere. Nu am simțit nimic, nimic, nimic! 😂💖 Nici când ai introdus acul, nici soluția. Iar rezultatul m-a încântat și mai mult! 💖 Am plecat de la tine foarte mulțumită, iar faptul că după aproximativ două ore aproape că nu se mai vedea nimic din inflamația provocată de ace m-a surprins plăcut. Îți mulțumesc pentru delicatețea, răbdarea și atenția cu care lucrezi! Se vede că pui suflet în ceea ce faci și, mai ales, că îți pasă ca omul din fața ta să se simtă bine și în siguranță. 🥰' },
  { name: 'Maria Clinciu', text: 'Am 66 de ani și vin cu drag la Roxana de ceva timp. Sunt foarte mulțumită de tratamente și de rezultatele pe care le văd. Am încredere în recomandările ei și revin de fiecare dată cu drag.' },
  { name: 'Andrada Vilcu', text: 'Vreau să îți mulțumesc din suflet pentru tot ceea ce faci și pentru modul în care reușești să transmiți informația. Cursul tău nu este doar despre cosmetică, ci despre încredere, profesionalism și atenția la detalii care fac cu adevărat diferența. Am avut extrem de multe de învățat de la tine, iar fiecare sesiune mi-a oferit claritate, inspirație și motivația de a deveni mai bună în ceea ce fac. Modul tău de a explica este nu doar profesionist, ci și foarte cald și autentic, ceea ce face ca tot procesul de învățare să fie plăcut și eficient. Se vede pasiunea ta pentru acest domeniu în fiecare detaliu, iar dedicarea ta este cu adevărat remarcabilă. Pentru mine, acest curs a fost mai mult decât o experiență de învățare a fost un pas important în dezvoltarea mea. Îți sunt recunoscătoare pentru tot și mă bucur enorm că am avut ocazia să învăț de la tine. 🤍' },
  { name: 'Roxana', text: 'Am întâlnit-o pe Roxana la sală, mi-a oferit ajutorul ei și mi-am dat seama cu timpul că este o femeie devotată, disciplinată și plină de pasiune, care nu se dă bătută. Îmi pun încrederea în ea la fiecare ședință și mă face să înțeleg că orice se poate, dacă îți dorești si crezi în propriile puteri. Nu te naști cu încrederea de sine, ci o dobândești cu fiecare efort pe care îl depui pentru tine. 🫶' },
];

type Review = { name: string; text: string; source: 'Facebook' | 'Google' };

// Alternează Facebook / Google în bandă, ca sursele să fie amestecate.
const fb: Review[] = reviews.map(r => ({ ...r, source: 'Facebook' }));
const gg: Review[] = googleReviews.map(r => ({ ...r, source: 'Google' }));
const allReviews: Review[] = [];
for (let i = 0; i < Math.max(fb.length, gg.length); i++) {
  if (fb[i]) allReviews.push(fb[i]);
  if (gg[i]) allReviews.push(gg[i]);
}

function ReviewCard({ review, onOpen }: { review: Review; onOpen: (r: Review) => void }) {
  // Textul e limitat vizual la 8 rânduri; dacă nu încape, apare „Citește tot” cu recenzia completă.
  const textRef = useRef<HTMLParagraphElement>(null);
  const [overflows, setOverflows] = useState(false);
  useEffect(() => {
    const el = textRef.current;
    if (!el) return;
    const check = () => setOverflows(el.scrollHeight > el.clientHeight + 1);
    check();
    document.fonts?.ready.then(check);
  }, [review.text]);

  return (
    <div
      className="flex-shrink-0 w-80 bg-white p-6 flex flex-col gap-4 border border-[#E8E1D8]"
      style={{ boxShadow: '0 2px 20px rgba(74,64,58,0.06)' }}
    >
      <ReviewHeader review={review} />
      <p ref={textRef} className="text-[#7A6F66] leading-relaxed italic line-clamp-[8]" style={{ fontFamily: 'var(--font-cormorant)', fontSize: '15px' }}>
        „{review.text}"
      </p>
      {overflows && (
        <button
          onClick={() => onOpen(review)}
          className="mt-auto self-start text-[#C6A769] hover:text-[#8B6914] text-[10px] uppercase tracking-[0.15em] transition-colors"
          style={{ fontFamily: 'var(--font-montserrat)', background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
        >
          Citește tot →
        </button>
      )}
    </div>
  );
}

function ReviewHeader({ review }: { review: Review }) {
  return (
      <div className="flex items-center gap-3 pb-3 border-b border-[#E8E1D8]">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs font-medium"
          style={{ background: 'linear-gradient(135deg, #C9A84C, #8B6914)', fontFamily: 'var(--font-montserrat)' }}
        >
          {review.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
        </div>
        <div>
          <p className="text-[#4A403A] text-xs tracking-wide uppercase" style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 500 }}>
            {review.name}
          </p>
          <p className="text-[#C6A769] text-[10px] mt-0.5" style={{ fontFamily: 'var(--font-montserrat)' }}>
            {review.source} · ★★★★★
          </p>
        </div>
      </div>
  );
}

function ReviewModal({ review, onClose }: { review: Review; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: 'rgba(74,64,58,0.55)' }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Recenzie ${review.name}`}
    >
      <div
        className="relative bg-white w-full max-w-lg max-h-[85vh] overflow-y-auto p-8 flex flex-col gap-5 border border-[#E8E1D8]"
        style={{ boxShadow: '0 10px 40px rgba(74,64,58,0.2)' }}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Închide"
          className="absolute top-3 right-4 text-[#C6A769] hover:text-[#8B6914] text-2xl leading-none transition-colors"
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        >
          ×
        </button>
        <ReviewHeader review={review} />
        <p className="text-[#7A6F66] leading-relaxed italic" style={{ fontFamily: 'var(--font-cormorant)', fontSize: '17px' }}>
          „{review.text}"
        </p>
      </div>
    </div>
  );
}

export default function Reviews() {
  const doubled = [...allReviews, ...allReviews];
  const [openReview, setOpenReview] = useState<Review | null>(null);
  const closeModal = useCallback(() => setOpenReview(null), []);

  return (
    <section id="recenzii" className="py-24 bg-[#F8F6F2] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center text-center gap-5 mb-16">
          <span className="text-[#C6A769] tracking-[0.25em] text-xs uppercase" style={{ fontFamily: 'var(--font-montserrat)' }}>
            Ce Spun Clientele
          </span>
          <h2 className="text-4xl md:text-5xl text-[#4A403A]" style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300 }}>
            Recenzii
          </h2>
          <div className="gold-line" />
          <div className="flex gap-1">
            {[1,2,3,4,5].map(s => <span key={s} className="text-[#C6A769] text-lg">★</span>)}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          display: flex;
          gap: 24px;
          animation: marquee 105s linear infinite;
          width: max-content;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="overflow-hidden">
        <div className="marquee-track">
          {doubled.map((review, i) => (
            <ReviewCard key={i} review={review} onOpen={setOpenReview} />
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-14 px-6">
        <a
          href={GOOGLE_REVIEW_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gold text-center"
          style={{ fontFamily: 'var(--font-montserrat)' }}
        >
          ⭐ Lasă o recenzie pe Google
        </a>
      </div>

      {openReview && <ReviewModal review={openReview} onClose={closeModal} />}
    </section>
  );
}
