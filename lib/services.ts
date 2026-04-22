export interface Service {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  benefits: string[];
  slug: string;
  image: string;
  imagePosition?: string;
}

export interface PriceItem {
  name: string;
  price: string;
  duration?: string;
  description?: string;
}

export interface PricePackage {
  name: string;
  discount?: string;
  items: PriceItem[];
}

export const services: Service[] = [
  {
    id: 'protocoale-faciale',
    title: 'Protocoale Faciale',
    subtitle: 'Tratamente avansate pentru tenul tău',
    description: 'Protocoale personalizate care combină tehnologii de ultimă generație cu ingrediente premium pentru rezultate vizibile și de durată.',
    benefits: ['Hidratare profundă', 'Reducerea imperfecțiunilor', 'Stimularea colagenului', 'Efect de luminozitate'],
    slug: 'protocoale-faciale',
    image: '/images/servicii/protocoale-faciale.jpg',
  },
  {
    id: 'epilare-definitiva',
    title: 'Epilare Definitivă',
    subtitle: 'Diodă Laser cu 4 lungimi de undă',
    description: 'Tehnologie Diodă Laser cu 4 lungimi de undă, adaptată oricărui tip de piele și fir de păr. Reducere progresivă și vizibilă a pilozității, cu disconfort minim și siguranță maximă.',
    benefits: ['Diodă Laser cu 4 lungimi de undă', 'Adaptat oricărui tip de piele', 'Rezultate vizibile de la prima ședință', 'Protocol personalizat'],
    slug: 'epilare-definitiva',
    image: '/images/servicii/epilare-definitiva.jpg',
  },
  {
    id: 'remodelare-corporala',
    title: 'Remodelare Corporală',
    subtitle: 'LipoShape Pro – rezultate vizibile',
    description: 'Sistem avansat prin ultrasunet, cavitație, vacuum și radiofrecvență care acționează asupra țesutului adipos și calității pielii.',
    benefits: ['Reducerea grăsimii localizate', 'Diminuarea celulitei', 'Piele mai fermă', 'Remodelare vizibilă'],
    slug: 'remodelare-corporala',
    image: '/images/servicii/remodelare-corporala.webp',
  },
  {
    id: 'electrostimulare',
    title: 'Electrostimulare Musculară',
    subtitle: 'Tonifiere și definire profundă',
    description: 'Tehnologie avansată care activează intens musculatura prin contracții profunde imposibil de obținut prin antrenament clasic.',
    benefits: ['Tonifiere și definire musculară', 'Reducerea flacidității', 'Recuperare post-partum', 'Îmbunătățirea circulației'],
    slug: 'electrostimulare',
    image: '/images/servicii/electrostimulare2.jpg',
  },
  {
    id: 'plasma-fusion',
    title: 'Plasma Fusion',
    subtitle: 'Lifting fără bisturiu',
    description: 'Tehnologie non-invazivă cu plasmă pentru lifting, îndepărtarea imperfecțiunilor și regenerarea pielii cu rezultate de lungă durată.',
    benefits: ['Lifting pleoape și față', 'Eliminarea vergeturilor', 'Tratarea cicatricilor', 'Rezultate de lungă durată'],
    slug: 'plasma-fusion',
    image: '/images/servicii/plasma-fusion2.jpg',
    imagePosition: 'object-top',
  },
  {
    id: 'ipl',
    title: 'IPL',
    subtitle: 'Lumină pulsată pentru ten perfect',
    description: 'Tehnologie avansată pentru uniformizarea pielii, reducerea petelor, roșeții și acneei, cu efect de rejuvenare și stimulare a colagenului.',
    benefits: ['Reducerea petelor pigmentare', 'Tratarea roșeții și cupeozei', 'Stimularea colagenului', 'Aplicabil pe față, gât, decolteu, mâini'],
    slug: 'ipl',
    image: '/images/servicii/ipl3.jpg',
  },
  {
    id: 'laser-yag',
    title: 'Laser Nd:YAG',
    subtitle: 'Precizie și eficiență maximă',
    description: 'Tratamente laser avansate pentru rejuvenare, acnee, pigmentare și ștergere tatuaje. Rezultate precise cu timp de recuperare minim.',
    benefits: ['Carbon Laser Hollywood Peel', 'Tratament acnee activ', 'Estompare pete pigmentare', 'Ștergere tatuaje progresivă'],
    slug: 'laser-yag',
    image: '/images/servicii/laser-yag2.jpg',
  },
  {
    id: 'recuperare-terapie',
    title: 'Recuperare & Terapie Corporală',
    subtitle: 'Vindecare profundă prin tehnologii avansate',
    description: 'Combinație unică între Terapia Tecar cu frecvență de 448 kHz și Masajul Terapeutic cu Vibrații G5 — un protocol complet pentru recuperare, relaxare musculară și remodelare corporală.',
    benefits: ['Recuperare musculară profundă', 'Reducerea durerilor cronice', 'Stimularea circulației și limfei', 'Tonifiere și remodelare corporală'],
    slug: 'recuperare-terapie',
    image: '/images/servicii/tecar.jpg',
    imagePosition: 'object-center',
  },
];

export const pricesData: Record<string, { single?: PriceItem[]; packages?: PricePackage[] }> = {
  'protocoale-faciale': {
    single: [
      { name: 'Skin Reset Hydration', price: '420 lei', duration: '50–70 min', description: 'O hidratare profundă care resetează echilibrul natural al pielii. Tratamentul restabilește nivelul optim de umiditate, lăsând tenul luminos, catifelat și revitalizat de la prima ședință.' },
      { name: 'Acne Control Protocol', price: '390–480 lei', duration: '50–70 min', description: 'Protocol profesional dedicat tenului acneic, cu acțiune directă asupra cauzelor apariției imperfecțiunilor. Reduce inflamația, purifică porii și reglează secreția de sebum pentru un ten curat și echilibrat.' },
      { name: 'Skin Tone Balance', price: '420 lei', duration: '50–70 min', description: 'Tratament specializat pentru uniformizarea tonului pielii. Estompează petele pigmentare, hiperpigmentația și discromatozele, redând feței un aspect uniform și natural strălucitor.' },
      { name: 'Bio Renewal Peels', price: '480 lei', duration: '50–70 min', description: 'Exfoliere chimică bio-activă care stimulează reînnoirea celulară în profunzime. Textura pielii se rafinează vizibil, porii se micșorează, iar fața recapătă prospețimea și fermitatea tinereții.' },
      { name: 'Carboxy Revital Therapy', price: '480 lei', duration: '50–70 min', description: 'Terapie avansată cu CO₂ care oxigenează țesuturile și stimulează microcirculația. Îmbunătățește elasticitatea pielii, reduce ridurile fine și conferă un efect de lifting natural și de durată.' },
      { name: 'Facial Glow Ritual', price: '350 lei', duration: '50 min', description: 'Un ritual de înfrumusețare complet care iluminează și revitalizează tenul obosit. Pielea devine instantaneu luminoasă, catifelată și plină de viață — efectul perfect înainte de un eveniment special.' },
      { name: 'Advanced Microneedling', price: '660 lei', duration: '50–70 min', description: 'Tehnica micro-needling de ultimă generație stimulează producția naturală de colagen și elastină. Reduce ridurile, cicatricile acneice și laxitatea cutanată, oferind un ten ferm, neted și vizibil întinerit.' },
      { name: 'Biorevitalizare Eye Boost', price: '390 lei', duration: '50–70 min', description: 'Tratament de recuperare intensivă dedicat zonei periorbitale. Diminuează cearcănele, pungile sub ochi și ridurile de expresie, redând priviri odihnite, tinere și expresive.' },
      { name: 'Biorevitalizare Neck Boost', price: '420 lei', duration: '50–70 min', description: 'Tratament intensiv dedicat zonei gâtului, una dintre primele zone care trădează vârsta. Stimulează colagenul, îmbunătățește fermitatea și elasticitatea pielii, reducând vizibil ridurile orizontale și laxitatea cutanată.' },
      { name: 'Biorevitalizare Full Face Boost', price: '1250 lei', duration: '50–70 min', description: 'Tratament complex de regenerare celulară care acționează în profunzime pentru hidratare, fermitate și uniformizarea pielii. Se bazează pe combinații personalizate de acid hialuronic, vitamine, exosomi sau polinucleotide, alese în funcție de nevoile pielii.' },
      { name: 'Back Deep Clean Protocol', price: '600–840 lei', duration: '50–70 min', description: 'Curățare profundă specializată pentru zona spatelui, predispusă la pori dilatați, puncte negre și erupții. Protocolul purifică în profunzime, reglează sebumul și lasă pielea curată, netedă și oxigenată.' },
      { name: 'Body Microneedling + BioRePeel', price: '800 lei', duration: '50–70 min', description: 'Combinație de elită între micro-needling și peeling bio-activ pentru corp. Stimulează regenerarea celulară, reduce vergeturile, cicatricile și textura neuniformă, oferind o piele vizibil mai fermă și mai netedă.' },
      { name: 'Hair Density Protocol', price: '420 lei', duration: '50–70 min', description: 'Protocol avansat pentru stimularea creșterii firului de păr și combaterea căderii acestuia. Activează foliculii piloși, îmbunătățește microcirculația scalpului și redă densitate și vitalitate părului.' },
      { name: 'BioRePeel Face Therapy', price: '480 lei', duration: '50–70 min', description: 'Terapie cu peeling biochimic de nouă generație, cu acțiune dublă: exfoliantă și biostimulatoare. Îmbunătățește textura, luminozitatea și tonusul pielii, fără timp de recuperare — potrivită pentru orice tip de ten.' },
      { name: 'Spongilla Bio Microneedling', price: '420 lei', duration: '50–70 min', description: 'Microneedling natural cu spicule din bureți de apă dulce. Stimulează colagenul, tratează acneea, petele și porii dilatați. Fără ace metalice, fără timp de recuperare.' },
    ],
  },
  'epilare-definitiva': {
    packages: [
      {
        name: 'Femei',
        items: [
          { name: 'Față', price: '150 lei' },
          { name: 'Mustață', price: '45 lei' },
          { name: 'Bărbie', price: '65 lei' },
          { name: 'Axilă', price: '130 lei' },
          { name: 'Inghinal parțial', price: '130 lei' },
          { name: 'Inghinal complet', price: '170 lei' },
          { name: 'Fese', price: '80 lei' },
          { name: 'Picioare scurt', price: '250 lei' },
          { name: 'Picioare lung', price: '350 lei' },
          { name: 'Spate / Piept', price: '160 lei' },
          { name: 'Abdomen / Lombar', price: '125 lei' },
          { name: 'Brațe', price: '170 lei' },
          { name: 'Full Body', price: '650 lei' },
        ],
      },
      {
        name: 'Bărbați',
        items: [
          { name: 'Axilă', price: '150 lei' },
          { name: 'Picioare scurt', price: '300 lei' },
          { name: 'Picioare lung', price: '450 lei' },
          { name: 'Spate / Piept', price: '200 lei' },
          { name: 'Abdomen / Lombar', price: '200 lei' },
          { name: 'Brațe', price: '250 lei' },
          { name: 'Full Body', price: '800 lei' },
        ],
      },
    ],
  },
  'remodelare-corporala': {
    single: [
      { name: 'Față / Flancuri', price: '150 lei', duration: '20 min' },
      { name: 'Fese / Spate', price: '200 lei', duration: '20 min' },
      { name: 'Abdomen', price: '250 lei', duration: '30 min' },
      { name: 'Picioare', price: '400 lei', duration: '60 min' },
      { name: 'Full Body', price: '1150 lei', duration: '90 min' },
    ],
    packages: [
      {
        name: '6 ședințe',
        discount: '25% discount',
        items: [
          { name: 'Față / Flancuri', price: '450 lei' },
          { name: 'Fese / Spate', price: '900 lei' },
          { name: 'Abdomen', price: '1125 lei' },
          { name: 'Picioare', price: '1800 lei' },
          { name: 'Full Body', price: '5175 lei' },
        ],
      },
      {
        name: '12 ședințe',
        discount: '50% discount',
        items: [
          { name: 'Față / Flancuri', price: '900 lei' },
          { name: 'Fese / Spate', price: '1200 lei' },
          { name: 'Abdomen', price: '1500 lei' },
          { name: 'Picioare', price: '2400 lei' },
          { name: 'Full Body', price: '6900 lei' },
        ],
      },
    ],
  },
  'electrostimulare': {
    single: [
      { name: '1 ședință', price: '250 lei' },
    ],
    packages: [
      {
        name: 'Pachet 6 ședințe',
        items: [{ name: 'Total', price: '1200 lei' }, { name: 'Per ședință', price: '200 lei' }],
      },
      {
        name: 'Pachet 12 ședințe',
        items: [{ name: 'Total', price: '2040 lei' }, { name: 'Per ședință', price: '170 lei' }],
      },
      {
        name: 'Pachet 15 ședințe',
        items: [{ name: 'Total', price: '2250 lei' }, { name: 'Per ședință', price: '150 lei' }],
      },
    ],
  },
  'plasma-fusion': {
    single: [
      { name: 'Ridicare pleoape', price: '500–700 lei' },
      { name: 'Riduri zona ochilor', price: '500–700 lei' },
      { name: 'Pungi sub ochi', price: '500–700 lei' },
      { name: 'Full Face', price: '800–1000 lei' },
      { name: 'Riduri frunte', price: '500 lei' },
      { name: 'Gât și decolteu', price: '600 lei' },
      { name: 'Piele flască abdomen', price: '600 lei' },
      { name: 'Vergeturi abdomen', price: '600–800 lei' },
      { name: 'Vergeturi coapse', price: '500–800 lei' },
      { name: 'Vergeturi picioare', price: '500–800 lei' },
      { name: 'Celulită', price: '400 lei' },
      { name: 'Cicatrici acnee', price: '400–600 lei' },
      { name: 'Pete pigmentare', price: '300–500 lei' },
      { name: 'Lifting coate / genunchi / mâini', price: '200–400 lei' },
      { name: 'Alopecie', price: '300–500 lei' },
      { name: 'Acnee', price: '400–600 lei' },
    ],
  },
  'ipl': {
    single: [
      { name: 'IPL Skin Rejuvenation', price: '480 lei' },
      { name: 'IPL Pigment Correction', price: '480–520 lei' },
      { name: 'IPL Vascular Therapy', price: '480–550 lei' },
      { name: 'IPL Rosacea Control', price: '480–550 lei' },
      { name: 'IPL Acne Therapy', price: '420–480 lei' },
      { name: 'IPL Skin Tone & Texture', price: '480 lei' },
    ],
  },
  'laser-yag': {
    single: [
      { name: 'Carbon Laser Detox (Hollywood Peel)', price: '420 lei' },
      { name: 'Laser Acne Therapy', price: '420–480 lei' },
      { name: 'Laser Skin Rejuvenation', price: '480 lei' },
      { name: 'Pigment Removal Laser', price: '480–550 lei' },
      { name: 'Tattoo Removal', price: 'de la 200 lei / zonă' },
    ],
  },
  'recuperare-terapie': {
    single: [
      { name: 'Terapie Tecar – Ședință unică', price: '250 lei', duration: '45 min' },
      { name: 'Masaj G5 – Ședință unică', price: '150 lei', duration: '30 min' },
      { name: 'Protocol combinat Tecar + G5', price: '350 lei', duration: '60 min' },
    ],
    packages: [
      {
        name: 'Pachet Tecar 6 ședințe',
        discount: '15% reducere',
        items: [
          { name: 'Total pachet', price: '1275 lei' },
          { name: 'Per ședință', price: '212 lei' },
        ],
      },
      {
        name: 'Pachet G5 6 ședințe',
        discount: '15% reducere',
        items: [
          { name: 'Total pachet', price: '765 lei' },
          { name: 'Per ședință', price: '127 lei' },
        ],
      },
    ],
  },
};
