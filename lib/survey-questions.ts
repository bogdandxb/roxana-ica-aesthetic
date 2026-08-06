export type SurveyQuestion = {
  key: string;
  nr: number;
  text: string;
  multi?: boolean;
};

export const SURVEY_QUESTIONS: SurveyQuestion[] = [
  { key: 'q1_varsta', nr: 1, text: 'În ce categorie de vârstă te încadrezi?' },
  { key: 'q2_copii', nr: 2, text: 'Ai copii?' },
  { key: 'q3_sport', nr: 3, text: 'Cât de des faci sport?' },
  { key: 'q4_motiv_sport', nr: 4, text: 'De ce faci sport, în primul rând?' },
  { key: 'q5_grija_de_mine', nr: 5, text: '„Am grijă de mine" înseamnă pentru tine mai ales:' },
  { key: 'q6_alimentatie', nr: 6, text: 'Cât de atentă ești la alimentație?' },
  { key: 'q7_nutritie', nr: 7, text: 'Cât știi despre proteine, carbohidrați și grăsimi?' },
  { key: 'q8_masa_musculara', nr: 8, text: 'Știi de ce masa musculară devine importantă odată cu vârsta?' },
  { key: 'q9_sport_suficient', nr: 9, text: 'Sportul și alimentația sunt suficiente și pentru piele?' },
  { key: 'q10_fermitate', nr: 10, text: 'Te-ai întrebat vreodată de ce poți avea un corp tonifiat, dar pielea feței să-și piardă treptat fermitatea?' },
  { key: 'q11_organ_activ', nr: 11, text: 'Știai că, odată cu trecerea anilor, pielea produce mai puțin colagen și elastină?' },
  { key: 'q12_fibroblast', nr: 12, text: 'Știai că pielea feței și a gâtului nu se „antrenează" cu greutăți la sală?' },
  { key: 'q13_fibroblast_colagen', nr: 13, text: 'Te gândești cum va arăta pielea ta peste 5–10 ani?' },
  { key: 'q14_fata_greutati', nr: 14, text: 'Ai observat că fața sau gâtul și-au pierdut din fermitate, deși faci sport?' },
  { key: 'q15_tratamente_fibroblast', nr: 15, text: 'Ce observi cel mai mult la pielea ta?', multi: true },
  { key: 'q16_cunosti_pielea', nr: 16, text: 'Când observi una dintre aceste schimbări, o consideri ceva cu care trebuie să te obișnuiești sau ceva ce poate fi îmbunătățit?' },
  { key: 'q17_viitor_piele', nr: 17, text: 'Dacă ai slăbit mult, ai observat schimbări la nivelul feței?', multi: true },
  { key: 'q18_sport_piele', nr: 18, text: 'Faci tratamente faciale profesionale?' },
  { key: 'q19_fermitate_fata', nr: 19, text: 'Pentru tine, un tratament facial înseamnă mai ales:', multi: true },
  { key: 'q20_observi', nr: 20, text: 'Te-ai gândit vreodată că tratamentele faciale regulate pot avea pentru piele un rol asemănător consecvenței pe care o ai cu sportul pentru corp?' },
  { key: 'q21_normala', nr: 21, text: 'În timpul unui tratament facial, ți s-a explicat de ce a fost aleasă procedura respectivă și ce rezultate urmărește pentru pielea ta?' },
  { key: 'q22_problema', nr: 22, text: 'Știai că un specialist poate construi un plan de tratament în funcție de nevoile pielii tale și de rezultatele pe care le urmărești?' },
  { key: 'q23_slabit', nr: 23, text: 'Ce te oprește să mergi regulat la tratamente faciale?', multi: true },
  { key: 'q24_tratamente', nr: 24, text: 'Comparativ cu cât știi despre sport și alimentație, cât de bine simți că îți cunoști pielea?' },
  { key: 'q25_tratament_facial', nr: 25, text: 'Când crezi că este momentul potrivit să începi să ai grijă profesional de piele?', multi: true },
  { key: 'q26_explicatii', nr: 26, text: 'Dacă investești constant în sănătatea și forma corpului tău, crezi că aceeași consecvență poate face diferența și pentru pielea ta în timp?' },
  { key: 'q27_plan_termen', nr: 27, text: 'Dacă pentru corp alegi un specialist care să te ghideze, crezi că și pielea feței are nevoie de îndrumarea unui specialist, dincolo de produsele folosite acasă?' },
];
