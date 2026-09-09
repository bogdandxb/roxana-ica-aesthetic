// ─── AUDIT: NIVELUL DE PREGĂTIRE ÎN COSMETICĂ ────────────────────────────────
// Single source of truth pentru structura auditului.
// Folosit de: app/audit-cosmetica/page.tsx, app/api/audit-cosmetica/*, admin-client.tsx

export type QType = 'scale' | 'text' | 'choice';

export interface AuditQuestion {
  key: string;        // coloana în DB
  nr: number;         // numărul din brief (1-50)
  text: string;       // întrebarea
  type: QType;
  options?: string[]; // pentru type 'choice'
  hasText?: boolean;  // pentru type 'scale' — adaugă și un câmp text de explicație
  textKey?: string;   // numele coloanei pentru câmpul text asociat unui scale
  textLabel?: string; // eticheta câmpului text
}

export interface AuditSection {
  nr: number;
  title: string;
  subtitle?: string;
  scored: boolean;    // intră în calculul scorului pe competențe?
  questions: AuditQuestion[];
}

// Scala 0–5
export const SCALE_LABELS: Record<number, string> = {
  0: 'Nu știu / nu am studiat',
  1: 'Știu foarte puțin',
  2: 'Am noțiuni de bază',
  3: 'Înțeleg, dar nu sunt sigură că pot aplica',
  4: 'Știu și pot explica',
  5: 'Stăpânesc și pot aplica în practică',
};

export const SECTIONS: AuditSection[] = [
  {
    nr: 0,
    title: 'Date participantă',
    scored: false,
    questions: [
      { key: 'nume', nr: 0, text: 'Nume și prenume', type: 'text' },
      { key: 'telefon', nr: 0, text: 'Telefon', type: 'text' },
      { key: 'email', nr: 0, text: 'E-mail', type: 'text' },
      { key: 'terminat_curs', nr: 1, text: 'Când ai terminat cursul de cosmetică?', type: 'text' },
      { key: 'lucreaza_cu_cliente', nr: 2, text: 'Lucrezi deja cu cliente?', type: 'choice', options: ['Da', 'Nu'] },
      { key: 'proceduri_actuale', nr: 3, text: 'Ce proceduri efectuezi în prezent?', type: 'text' },
      { key: 'proceduri_dorite', nr: 4, text: 'Ce proceduri ai vrea să înveți?', type: 'text' },
    ],
  },
  {
    nr: 1,
    title: 'Biologia pielii',
    scored: true,
    questions: [
      {
        key: 'bio_straturi_piele', nr: 5, type: 'scale',
        text: 'Poți explica cele 3 straturi principale ale pielii și rolul fiecăruia?',
        hasText: true, textKey: 'bio_straturi_piele_txt', textLabel: 'Explică pe scurt',
      },
      {
        key: 'bio_bariera_cutanata', nr: 6, type: 'scale',
        text: 'Ce este bariera cutanată și din ce este formată?',
        hasText: true, textKey: 'bio_bariera_cutanata_txt', textLabel: 'Explică pe scurt',
      },
      {
        key: 'bio_celule', nr: 7, type: 'scale',
        text: 'Ce sunt keratinocitele, melanocitele și fibroblastele și ce rol au?',
        hasText: true, textKey: 'bio_celule_txt', textLabel: 'Explică pe scurt',
      },
      {
        key: 'bio_leziune_microneedling', nr: 8, type: 'scale',
        text: 'Ce se întâmplă în piele atunci când producem o leziune controlată prin microneedling?',
        hasText: true, textKey: 'bio_leziune_microneedling_txt', textLabel: 'Explică pe scurt',
      },
      {
        key: 'bio_de_ce_biologie', nr: 9, type: 'scale',
        text: 'De ce trebuie să cunoști biologia pielii înainte să efectuezi microneedling?',
        hasText: true, textKey: 'bio_de_ce_biologie_txt', textLabel: 'Explică pe scurt',
      },
    ],
  },
  {
    nr: 2,
    title: 'Consultație și analiza pielii',
    scored: true,
    questions: [
      {
        key: 'cons_tip_vs_conditie', nr: 10, type: 'scale',
        text: 'Știi să diferențiezi tipul de piele de condiția actuală a pielii?',
        hasText: true, textKey: 'cons_tip_vs_conditie_txt', textLabel: 'Explică pe scurt',
      },
      {
        key: 'cons_anamneza', nr: 11, type: 'text',
        text: 'Ce informații trebuie să obții obligatoriu în anamneză înainte de alegerea unui tratament?',
      },
      {
        key: 'cons_bariera_compromisa', nr: 12, type: 'scale',
        text: 'Poți identifica o barieră cutanată compromisă și știi când trebuie să amâni o procedură?',
        hasText: true, textKey: 'cons_bariera_compromisa_txt', textLabel: 'Explică pe scurt',
      },
      {
        key: 'cons_plan_multi_sedinte', nr: 13, type: 'scale',
        text: 'Poți construi un plan de tratament pe mai multe ședințe, nu doar să alegi o procedură pentru ziua respectivă?',
        hasText: true, textKey: 'cons_plan_multi_sedinte_txt', textLabel: 'Explică pe scurt',
      },
    ],
  },
  {
    nr: 3,
    title: 'Afecțiuni și condiții ale pielii',
    subtitle: 'Cât de sigură te simți să recunoști și să lucrezi corect cu:',
    scored: true,
    questions: [
      { key: 'afect_acnee', nr: 14, type: 'scale', text: 'Acneea' },
      { key: 'afect_rozacee', nr: 15, type: 'scale', text: 'Rozaceea / cuperoza' },
      { key: 'afect_hiperpigmentare', nr: 16, type: 'scale', text: 'Hiperpigmentarea / melasma' },
      { key: 'afect_piele_sensibila', nr: 17, type: 'scale', text: 'Pielea sensibilă / reactivă' },
      { key: 'afect_piele_deshidratata', nr: 18, type: 'scale', text: 'Pielea deshidratată și bariera compromisă' },
      {
        key: 'afect_refuz_microneedling', nr: 19, type: 'text',
        text: 'Dacă o clientă vine pentru microneedling, există situații în care ai refuza sau ai amâna procedura? Dă 3 exemple.',
      },
    ],
  },
  {
    nr: 4,
    title: 'Ingrediente și produse cosmetice',
    scored: true,
    questions: [
      {
        key: 'ingr_active', nr: 20, type: 'scale',
        text: 'Cât de bine înțelegi principalele ingrediente active: AHA, BHA, PHA, retinoizi, vitamina C, niacinamidă, acid azelaic, peptide și acid hialuronic?',
        hasText: true, textKey: 'ingr_active_txt', textLabel: 'Detaliază (opțional)',
      },
      {
        key: 'ingr_combinatii', nr: 21, type: 'scale',
        text: 'Știi ce ingrediente sau proceduri nu trebuie combinate ori necesită precauție?',
        hasText: true, textKey: 'ingr_combinatii_txt', textLabel: 'Detaliază (opțional)',
      },
      {
        key: 'ingr_rutina_homecare', nr: 22, type: 'scale',
        text: 'Poți recomanda o rutină de îngrijire acasă în funcție de problema pielii și tratamentul efectuat?',
        hasText: true, textKey: 'ingr_rutina_homecare_txt', textLabel: 'Detaliază (opțional)',
      },
    ],
  },
  {
    nr: 5,
    title: 'Peelinguri și proceduri avansate',
    scored: true,
    questions: [
      {
        key: 'peel_tipuri', nr: 23, type: 'scale',
        text: 'Înțelegi diferența dintre AHA, BHA, PHA și principalele tipuri de peeling chimic?',
        hasText: true, textKey: 'peel_tipuri_txt', textLabel: 'Detaliază (opțional)',
      },
      {
        key: 'peel_ph_concentratie', nr: 24, type: 'scale',
        text: 'Înțelegi rolul pH-ului, concentrației, acidului liber și timpului de contact într-un peeling?',
        hasText: true, textKey: 'peel_ph_concentratie_txt', textLabel: 'Detaliază (opțional)',
      },
      {
        key: 'peel_alegere_procedura', nr: 25, type: 'scale',
        text: 'Știi să alegi procedura în funcție de indicație, fototip, sensibilitate și starea barierei cutanate?',
        hasText: true, textKey: 'peel_alegere_procedura_txt', textLabel: 'Detaliază (opțional)',
      },
    ],
  },
  {
    nr: 6,
    title: 'Microneedling — test de siguranță',
    subtitle: 'Notează cât de sigură te simți pe fiecare aspect (0–5) și, unde poți, scrie răspunsul.',
    scored: true,
    questions: [
      { key: 'mn_indicatii', nr: 26, type: 'scale', text: 'Care sunt indicațiile principale pentru microneedling?', hasText: true, textKey: 'mn_indicatii_txt', textLabel: 'Răspunsul tău' },
      { key: 'mn_contraindicatii', nr: 27, type: 'scale', text: 'Care sunt contraindicațiile?', hasText: true, textKey: 'mn_contraindicatii_txt', textLabel: 'Răspunsul tău' },
      { key: 'mn_adancime', nr: 28, type: 'scale', text: 'Cum alegi adâncimea de lucru și de ce nu se lucrează aceeași adâncime pe toate zonele feței?', hasText: true, textKey: 'mn_adancime_txt', textLabel: 'Răspunsul tău' },
      { key: 'mn_endpoint', nr: 29, type: 'scale', text: 'Care este endpoint-ul pe care îl urmărești în timpul procedurii?', hasText: true, textKey: 'mn_endpoint_txt', textLabel: 'Răspunsul tău' },
      { key: 'mn_biologic_dupa', nr: 30, type: 'scale', text: 'Ce se întâmplă biologic după procedură și care sunt etapele procesului de reparare?', hasText: true, textKey: 'mn_biologic_dupa_txt', textLabel: 'Răspunsul tău' },
      { key: 'mn_inflamatie', nr: 31, type: 'scale', text: 'Cum influențează inflamația rezultatul tratamentului?', hasText: true, textKey: 'mn_inflamatie_txt', textLabel: 'Răspunsul tău' },
      { key: 'mn_produse', nr: 32, type: 'scale', text: 'Ce produse pot fi utilizate în timpul procedurii și ce produse NU ai introduce prin microcanalele create?', hasText: true, textKey: 'mn_produse_txt', textLabel: 'Răspunsul tău' },
      { key: 'mn_recomandari_dupa', nr: 33, type: 'scale', text: 'Ce recomanzi clientei după procedură și ce trebuie să evite?', hasText: true, textKey: 'mn_recomandari_dupa_txt', textLabel: 'Răspunsul tău' },
      { key: 'mn_reactie_intensa', nr: 34, type: 'scale', text: 'Cum procedezi dacă pielea reacționează mai intens decât te așteptai?', hasText: true, textKey: 'mn_reactie_intensa_txt', textLabel: 'Răspunsul tău' },
      { key: 'mn_decizie_procedura', nr: 35, type: 'scale', text: 'Cum decizi dacă microneedling-ul este într-adevăr cea mai bună procedură pentru clienta din fața ta?', hasText: true, textKey: 'mn_decizie_procedura_txt', textLabel: 'Răspunsul tău' },
    ],
  },
  {
    nr: 7,
    title: 'Gândirea de cosmetician — caz practic',
    subtitle: 'O clientă de 38 de ani vine și spune: „Am pete, pori vizibili, câteva coșuri și vreau microneedling." Răspunsurile tale vor fi analizate ulterior de Roxana — nu sunt evaluate automat.',
    scored: false,
    questions: [
      { key: 'caz_ce_intrebi', nr: 36, type: 'text', text: 'Ce o întrebi?' },
      { key: 'caz_ce_analizezi', nr: 37, type: 'text', text: 'Ce analizezi?' },
      { key: 'caz_ce_excluzi', nr: 38, type: 'text', text: 'Ce trebuie să excluzi?' },
      { key: 'caz_prioritate', nr: 39, type: 'text', text: 'Care este prioritatea pielii?' },
      { key: 'caz_microneedling_prima_sedinta', nr: 40, type: 'text', text: 'Ai face microneedling în prima ședință? De ce?' },
      { key: 'caz_plan', nr: 41, type: 'text', text: 'Ce plan i-ai propune?' },
      { key: 'caz_homecare', nr: 42, type: 'text', text: 'Ce i-ai recomanda pentru acasă?' },
    ],
  },
  {
    nr: 8,
    title: 'Autoevaluare finală',
    scored: false,
    questions: [
      { key: 'final_stapanesti', nr: 43, type: 'text', text: 'Ce consideri că stăpânești deja foarte bine?' },
      { key: 'final_aprofundare', nr: 44, type: 'text', text: 'Unde simți că ai nevoie de aprofundare?' },
      { key: 'final_nesigura_aplicare', nr: 45, type: 'text', text: 'Unde ai informații, dar nu te simți încă sigură să le aplici în practică?' },
      { key: 'final_proceduri_cu_incredere', nr: 46, type: 'text', text: 'Ce proceduri poți efectua în prezent cu încredere?' },
      { key: 'final_proceduri_de_invatat', nr: 47, type: 'text', text: 'Ce proceduri ai vrea să înveți sau să aprofundezi?' },
      { key: 'final_ce_lipseste', nr: 48, type: 'text', text: 'Ce simți că îți lipsește pentru a putea lucra independent și cu mai multă siguranță?' },
      {
        key: 'final_proces_complet', nr: 49, type: 'choice',
        options: ['Da', 'Parțial', 'Nu'],
        text: 'Dacă mâine intră în cabinet o clientă nouă, te simți pregătită să faci singură întregul proces: anamneză → analiza pielii → identificarea priorității → alegerea procedurii → protocol → recomandarea pentru acasă → monitorizarea rezultatului?',
      },
      { key: 'final_etapa_ajutor', nr: 50, type: 'text', text: 'Dacă ai răspuns „parțial" sau „nu", la ce etapă simți că ai cea mai mare nevoie de ajutor?' },
    ],
  },
];

// Secțiunile care contează pentru scor (au întrebări de tip scale)
export const SCORED_SECTIONS = SECTIONS.filter(s => s.scored);

// Toate cheile de tip scale, pe secțiune
export function scaleKeysForSection(section: AuditSection): string[] {
  return section.questions.filter(q => q.type === 'scale').map(q => q.key);
}

// ─── SCORING ─────────────────────────────────────────────────────────────────
// Nivel pe baza mediei 0–5 a unei secțiuni

export interface NivelInfo {
  label: string;
  descriere: string;
  color: string;
}

export function nivelFromMedie(medie: number): NivelInfo {
  if (medie < 2) return {
    label: 'Bază în dezvoltare',
    descriere: 'Ai pornit pe drumul cel bun. Acesta este momentul în care fundamentele se construiesc temeinic.',
    color: '#C89B6B',
  };
  if (medie < 3) return {
    label: 'Nivel intermediar',
    descriere: 'Ai deja repere solide. Următorul pas este să transformi informația în siguranță practică.',
    color: '#B8935E',
  };
  if (medie < 4) return {
    label: 'Bază bună – necesită consolidare practică',
    descriere: 'Înțelegi bine teoria. Ce urmează este exersarea până când deciziile devin automate.',
    color: '#A67C4E',
  };
  return {
    label: 'Nivel avansat',
    descriere: 'Ai o înțelegere matură a pielii și a procedurilor. Rafinezi detalii și cazuri complexe.',
    color: '#8C6A42',
  };
}

// Calculează scorul: medie generală + medie pe fiecare secțiune notată
export interface ScoreResult {
  overall: number;                       // medie generală 0–5
  overallNivel: NivelInfo;
  perSection: {
    nr: number;
    title: string;
    medie: number;
    nivel: NivelInfo;
    answered: number;
    total: number;
  }[];
  stapanesti: string[];      // secțiuni cu medie >= 4
  aprofundat: string[];      // secțiuni cu medie 2–4
  prioritati: string[];      // secțiuni cu medie < 2
}

export function computeScore(answers: Record<string, unknown>): ScoreResult {
  const perSection = SCORED_SECTIONS.map(section => {
    const keys = scaleKeysForSection(section);
    const vals = keys
      .map(k => answers[k])
      .filter(v => v !== undefined && v !== null && v !== '')
      .map(v => Number(v));
    const answered = vals.length;
    const medie = answered > 0 ? vals.reduce((a, b) => a + b, 0) / answered : 0;
    return {
      nr: section.nr,
      title: section.title,
      medie: Math.round(medie * 100) / 100,
      nivel: nivelFromMedie(medie),
      answered,
      total: keys.length,
    };
  });

  const answeredSections = perSection.filter(s => s.answered > 0);
  const overall = answeredSections.length > 0
    ? Math.round((answeredSections.reduce((a, s) => a + s.medie, 0) / answeredSections.length) * 100) / 100
    : 0;

  return {
    overall,
    overallNivel: nivelFromMedie(overall),
    perSection,
    stapanesti: answeredSections.filter(s => s.medie >= 4).map(s => s.title),
    aprofundat: answeredSections.filter(s => s.medie >= 2 && s.medie < 4).map(s => s.title),
    prioritati: answeredSections.filter(s => s.medie < 2).map(s => s.title),
  };
}
