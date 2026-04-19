'use client';

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

function ReviewCard({ review }: { review: { name: string; text: string } }) {
  return (
    <div
      className="flex-shrink-0 w-80 bg-white p-6 flex flex-col gap-4 border border-[#E8E1D8]"
      style={{ boxShadow: '0 2px 20px rgba(74,64,58,0.06)' }}
    >
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
            Facebook · ★★★★★
          </p>
        </div>
      </div>
      <p className="text-[#7A6F66] leading-relaxed italic flex-1" style={{ fontFamily: 'var(--font-cormorant)', fontSize: '15px' }}>
        „{review.text}"
      </p>
    </div>
  );
}

export default function Reviews() {
  const doubled = [...reviews, ...reviews];

  return (
    <section id="recenzii" className="py-24 bg-[#F8F6F2] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center text-center gap-5 mb-16">
          <span className="text-[#C6A769] tracking-[0.25em] text-xs uppercase" style={{ fontFamily: 'var(--font-montserrat)' }}>
            Ce Spun Clientele
          </span>
          <h2 className="text-4xl md:text-5xl text-[#4A403A]" style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300 }}>
            Recenzii Reale
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
          animation: marquee 60s linear infinite;
          width: max-content;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="overflow-hidden">
        <div className="marquee-track">
          {doubled.map((review, i) => (
            <ReviewCard key={i} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}
