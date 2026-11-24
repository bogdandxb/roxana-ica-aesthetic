// Video-uri YouTube Shorts afișate pe pagina /video.
// Pentru un video nou: adaugă { id, title, text } în grupa potrivită.
// `id` = codul din link (youtube.com/shorts/<id>).

export type Video = {
  id: string;
  title: string;
  text: string;
};

export type VideoGroup = {
  name: string;
  videos: Video[];
};

export const videoGroups: VideoGroup[] = [
  {
    name: 'Ten și protocoale faciale',
    videos: [
      {
        id: 'KRONmlZBzAo',
        title: 'Tratamente faciale: cât de des trebuie făcute pentru rezultate?',
        text: 'De ce contează ritmul ședințelor și cum construim un protocol cu rezultate care durează.',
      },
      {
        id: 'Rqs0VUgk0yc',
        title: 'Carboxiterapie facială cu CO₂',
        text: 'De ce încep multe tratamente cu această procedură care oxigenează și pregătește pielea.',
      },
      {
        id: 'TlWZnAbAOhY',
        title: 'Dermaplaning facial',
        text: 'Ce se întâmplă când îndepărtăm puful și celulele moarte: ten mai luminos și produse care pătrund mai bine.',
      },
      {
        id: '6PiDukynx5M',
        title: 'Ten tânăr cu acnee și pori încărcați',
        text: 'Un tratament facial blând, fără agresiune, pentru pielea tânără cu imperfecțiuni.',
      },
      {
        id: '6Oa3yjGAU0U',
        title: 'Terapia cu spicule',
        text: 'Cum îmbunătățim textura pielii, semnele post-acneice și aspectul tenului sensibil.',
      },
      {
        id: 'nuwyaDB26YU',
        title: 'Piele sensibilă și reactivă: tratament cu NAD+',
        text: 'Pentru pielea care se înroșește ușor: calmare și refacerea echilibrului.',
      },
      {
        id: 'G5pb4_pGfZw',
        title: 'Lifting Code by Bioline Jatò',
        text: 'Biotehnologie pentru fermitatea și elasticitatea pielii.',
      },
    ],
  },
  {
    name: 'Biorevitalizare: față, gât, mâini, scalp',
    videos: [
      {
        id: 'TsV-OhyTKbs',
        title: 'Biorevitalizare full face și gât',
        text: 'Regenerare, hidratare profundă și fermitate.',
      },
      {
        id: '2fnCvb23DAM',
        title: 'Piele laxă și riduri pe gât? Biorevitalizarea gâtului',
        text: 'Soluția pentru pielea laxă și ridurile de pe gât, și beneficiile ei.',
      },
      {
        id: 'ZzSylv_TWIc',
        title: 'Riduri în jurul gurii și buze deshidratate',
        text: 'Tratament cu acid hialuronic, fără filler, cu MicronJet.',
      },
      {
        id: 'Z0LBSiO_H_Y',
        title: 'Biorevitalizare mâini',
        text: 'Peeling și microneedling pentru întinerirea pielii mâinilor.',
      },
      {
        id: 'WLWbIccGa60',
        title: 'Microneedling și biorevitalizare scalp',
        text: 'Îngrijirea scalpului și sprijin în căderea părului.',
      },
    ],
  },
  {
    name: 'Pete pigmentare și melasmă',
    videos: [
      {
        id: 'xWEw0t2YdZk',
        title: 'Melasmă de 20 de ani',
        text: 'Se mai pot trata petele pigmentare vechi? Vezi rezultatul.',
      },
      {
        id: 'r0RZKuVWhVA',
        title: 'Melasma: ce faci acasă contează',
        text: 'Rutina de acasă e la fel de importantă ca tratamentul din salon.',
      },
      {
        id: 'j8050PgSeyE',
        title: 'Fotoîmbătrânirea mâinilor',
        text: 'Tratament profesional pentru pete pigmentare și riduri pe mâini.',
      },
    ],
  },
  {
    name: 'Tehnologii',
    videos: [
      {
        id: 'EjoYe03GZE4',
        title: 'Ce este IPL?',
        text: 'Cum funcționează lumina pulsată și ce poate trata.',
      },
    ],
  },
];
