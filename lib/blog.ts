export type Category =
  | 'Problemele pielii'
  | 'Tratamente & Tehnologii'
  | 'Skin Science'
  | 'Slow Aging'
  | 'Epilare Definitivă'
  | 'Body & Wellness';

export interface Article {
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  category: Category;
  date: string; // YYYY-MM-DD
  image: string; // path din /public/blog/
  imageAlt: string;
  excerpt: string; // scurtă introducere, ~2 propoziții
  readingTime: number; // minute
  relatedSlugs?: string[]; // slug-uri articole înrudite
  relatedServices?: string[]; // slug-uri servicii (din lib/services.ts)
  content: string; // HTML sau text simplu cu paragrafe
}

export const CATEGORIES: Category[] = [
  'Problemele pielii',
  'Tratamente & Tehnologii',
  'Skin Science',
  'Slow Aging',
  'Epilare Definitivă',
  'Body & Wellness',
];

export const CATEGORY_DESCRIPTIONS: Record<Category, string> = {
  'Problemele pielii': 'Acnee, rozacee, melasmă, hiperpigmentare și alte dezechilibre — explicate simplu.',
  'Tratamente & Tehnologii': 'Microneedling, peelinguri, IPL, laser și toate procedurile estetice moderne.',
  'Skin Science': 'Cum funcționează pielea ta — biologie, ingrediente active și mecanisme cutanate.',
  'Slow Aging': 'Prevenție, stimulare de colagen, SPF și strategii pentru o piele sănătoasă pe termen lung.',
  'Epilare Definitivă': 'Tot ce trebuie să știi despre laserul diodă, cicluri, rezultate și mituri.',
  'Body & Wellness': 'Remodelare corporală, celulită, drenaj limfatic și îngrijirea pielii corpului.',
};

export const CATEGORY_SLUGS: Record<Category, string> = {
  'Problemele pielii': 'problemele-pielii',
  'Tratamente & Tehnologii': 'tratamente-tehnologii',
  'Skin Science': 'skin-science',
  'Slow Aging': 'slow-aging',
  'Epilare Definitivă': 'epilare-definitiva',
  'Body & Wellness': 'body-wellness',
};

export const CATEGORY_FROM_SLUG: Record<string, Category> = Object.fromEntries(
  Object.entries(CATEGORY_SLUGS).map(([cat, slug]) => [slug, cat as Category])
);

// ─── ARTICOLE ────────────────────────────────────────────────────────────────
// Pentru a adăuga un articol nou: copiază un obiect de mai jos, schimbă câmpurile și adaugă-l în array.
// Articolul va apărea automat în blog și în categoria corespunzătoare.

export const articles: Article[] = [
  {
    slug: 'ce-este-bariera-cutanata',
    title: 'Ce este bariera cutanată și de ce contează mai mult decât crezi',
    seoTitle: 'Bariera cutanată — ce este și cum o protejezi | Roxana Ica Aesthetic',
    metaDescription: 'Bariera cutanată este prima linie de apărare a pielii tale. Află cum funcționează, ce o afectează și cum o refaci pentru o piele sănătoasă.',
    category: 'Skin Science',
    date: '2026-09-08',
    image: '/blog/placeholder.jpg',
    imageAlt: 'Bariera cutanată — ilustrație concept îngrijire piele',
    excerpt: 'Bariera cutanată este mai mult decât un strat superficial — este sistemul de protecție al întregii tale piele. Când e afectată, apar sensibilitate, roșeață, deshidratare și reacții neașteptate.',
    readingTime: 5,
    relatedServices: ['protocoale-faciale', 'skin-analyzer'],
    content: `
<p>Dacă pielea ta reacționează la aproape orice — la schimbări de temperatură, la produse noi, la stres — cel mai probabil bariera cutanată este compromisă.</p>

<h2>Ce este bariera cutanată?</h2>
<p>Bariera cutanată (sau bariera epidermică) este stratul exterior al pielii — stratum corneum — format din celule moarte (corneocite) legate între ele prin lipide: ceramide, acizi grași și colesterol. Funcția ei principală este dublă: menține hidratarea în interior și ține agresorii externi în afară.</p>

<h2>Ce o afectează?</h2>
<p>Supraexfolierea este una dintre cele mai frecvente cauze. Folosirea excesivă a acizilor, a scrub-urilor sau a retinolului în doze prea mari poate eroda stratul lipidic. Alți factori: detergeni agresivi, apă prea caldă, vânt, poluare, stres cronic și somn insuficient.</p>

<h2>Cum știi că bariera ta e afectată?</h2>
<p>Semne clare: senzație de înțepătură după aplicarea oricărui produs, roșeață persistentă, piele care se simte strânsă imediat după curățare, descuamare fără că pielea să fie uscată în mod obișnuit.</p>

<h2>Cum o refaci?</h2>
<p>Primul pas: simplificați rutina. Renunță temporar la activi agresivi. Concentrează-te pe curățare blândă, hidratare cu ceramide și protecție solară zilnică. În cabinet, tratamentele de refacere a barierei — cu factori de creștere, exozomi sau seruri cu ceramide — pot accelera procesul semnificativ.</p>

<p>Bariera cutanată nu se reface peste noapte, dar cu răbdare și alegeri corecte, pielea revine la echilibru.</p>
    `.trim(),
  },
  {
    slug: 'acnee-cauze-si-tratament',
    title: 'Acneea la adulți — de ce apare și cum o abordezi corect',
    seoTitle: 'Acnee la adulți — cauze și tratamente eficiente | Roxana Ica Aesthetic Brașov',
    metaDescription: 'Acneea la adulți are cauze diferite față de cea din adolescență. Află ce o declanșează și ce tratamente profesionale funcționează cu adevărat.',
    category: 'Problemele pielii',
    date: '2026-09-08',
    image: '/blog/placeholder.jpg',
    imageAlt: 'Tratament profesional acnee adulți',
    excerpt: 'Acneea la adulți nu este același lucru cu acneea din adolescență. Cauzele sunt diferite, abordarea este diferită și, cel mai important, există soluții reale.',
    readingTime: 6,
    relatedServices: ['protocoale-faciale', 'skin-analyzer'],
    content: `
<p>Multe femei ajung în cabinet cu acnee la 30, 35 sau chiar 40 de ani, surprinse că o problemă „a adolescenței" le urmărește în continuare. Realitatea este că acneea adultă are mecanisme proprii și necesită o abordare diferită.</p>

<h2>De ce apare acneea la adulți?</h2>
<p>Principalii factori: fluctuații hormonale (ciclu menstrual, contraceptive, perimenopauză), stres cronic (care crește cortizolul și stimulează sebumul), produse cosmetice comedogenice și o barieră cutanată compromisă.</p>

<h2>Diferența față de acneea din adolescență</h2>
<p>Acneea adultă apare de obicei pe zona inferioară a feței — bărbie, mandibulă, gât — și este mai degrabă nodulară (profundă) decât superficială. Tinde să fie mai persistentă și mai rezistentă la tratamentele standard pentru tineri.</p>

<h2>Ce tratamente funcționează?</h2>
<p>În cabinet, peelingurile chimice cu acid salicilic sau manodelic sunt extrem de eficiente pentru acneea adultă. Microneedling-ul ajută la reducerea cicatricilor post-acnee. Terapia LED în spectru albastru reduce bacteriile fără să irite pielea.</p>

<h2>Ce poți face acasă?</h2>
<p>Rutina corectă face diferența. Curățare blândă de două ori pe zi, niciodată mai mult. Niacinamidă pentru reglarea sebumului. Evită să atingi sau să storci leziunile — riscul de cicatrici este real. Și protecție solară în fiecare dimineață, indiferent de anotimp.</p>

<p>Acneea adultă se poate controla. Cheia este să înțelegi cauza specifică a ta — și să tratezi acea cauză, nu simptomul.</p>
    `.trim(),
  },
  {
    slug: 'microneedling-ghid-complet',
    title: 'Microneedling — ghid complet: cum funcționează, rezultate și ce să știi înainte',
    seoTitle: 'Microneedling Brașov — ghid complet | Roxana Ica Aesthetic',
    metaDescription: 'Tot ce trebuie să știi despre microneedling: cum funcționează, ce rezultate oferă, câte ședințe sunt necesare și cum te pregătești. Roxana Ica Aesthetic Brașov.',
    category: 'Tratamente & Tehnologii',
    date: '2026-09-08',
    image: '/blog/placeholder.jpg',
    imageAlt: 'Microneedling tratament profesional facial',
    excerpt: 'Microneedling-ul este unul dintre cele mai eficiente tratamente de reînnoire a pielii disponibile azi. Rezultatele sunt reale, dar există lucruri esențiale pe care trebuie să le știi înainte.',
    readingTime: 7,
    relatedServices: ['protocoale-faciale'],
    content: `
<p>Microneedling-ul a câștigat popularitate pentru un motiv simplu: funcționează. Dar ca orice tratament profesional, rezultatele depind de cum este realizat și de ce protocoale sunt urmate.</p>

<h2>Cum funcționează microneedling-ul?</h2>
<p>Dispozitivul creează micro-canale în piele prin ace fine, la adâncimi controlate între 0.5 și 2.5mm, în funcție de zona tratată și obiectiv. Aceste micro-leziuni declanșează procesul natural de vindecare al pielii — producția de colagen și elastină crește semnificativ.</p>

<h2>Ce tratează microneedling-ul?</h2>
<p>Cicatrici post-acnee, riduri fine, pori dilatați, pierderea fermității, textura inegală a pielii și hiperpigmentare. Combinat cu ser de vitamina C, factori de creștere sau exozomi (aplicați în micro-canale), eficiența crește considerabil.</p>

<h2>Câte ședințe sunt necesare?</h2>
<p>Pentru rezultate vizibile, protocolul standard este 3-6 ședințe la interval de 4 săptămâni. Ședința de întreținere se poate face o dată sau de două ori pe an.</p>

<h2>La ce să te aștepți după ședință?</h2>
<p>Roșeață și o senzație ușoară de căldură în primele 24-48 de ore — aceasta este o reacție normală. Pielea poate fi ușor sensibilă 2-3 zile. Evită machiajul în prima zi și protecția solară este obligatorie în perioada post-tratament.</p>

<h2>Cine nu este candidat potrivit?</h2>
<p>Contraindicații: acnee activă în faza acută, infecții cutanate active, sarcină, anticoagulante, keloide în antecedente.</p>

<p>Microneedling-ul realizat profesional, cu protocoale adaptate tipului tău de piele, este un investiție pe termen lung în calitatea pielii tale.</p>
    `.trim(),
  },
];

export function getArticlesByCategory(category: Category): Article[] {
  return articles.filter(a => a.category === category).sort((a, b) => b.date.localeCompare(a.date));
}

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find(a => a.slug === slug);
}

export function getRelatedArticles(article: Article, max = 3): Article[] {
  return articles
    .filter(a => a.slug !== article.slug && (
      a.category === article.category ||
      article.relatedSlugs?.includes(a.slug)
    ))
    .slice(0, max);
}
