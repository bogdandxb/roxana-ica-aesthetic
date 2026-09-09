import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Audit: Nivelul de pregătire în cosmetică | Roxana Ica Aesthetic',
  description: 'Audit interactiv pentru cosmeticiene: identifică ce stăpânești deja, ce trebuie aprofundat și ce ai nevoie să dezvolți — biologia pielii, consultație, afecțiuni, ingrediente, peelinguri, microneedling.',
  openGraph: {
    title: 'Descoperă unde te afli profesional — Audit de nivel în cosmetică',
    description: 'Nu este un examen. Este un instrument prin care îți vezi clar nivelul de pregătire și prioritățile de dezvoltare.',
    url: 'https://www.roxanaicaaesthetic.com/audit-cosmetica',
  },
  alternates: {
    canonical: 'https://www.roxanaicaaesthetic.com/audit-cosmetica',
  },
};

export default function AuditCosmeticaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
