import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Audit Profesional 360° | Roxana Ica Aesthetic',
  description: 'Analiza completă a practicii tale de cosmetică — servicii, profitabilitate, nivel profesional, prezență online și viziune. Roxana Ica Aesthetic.',
  alternates: {
    canonical: 'https://www.roxanaicaaesthetic.com/audit-profesional',
  },
};

export default function AuditProfesionalLayout({ children }: { children: React.ReactNode }) {
  return children;
}
