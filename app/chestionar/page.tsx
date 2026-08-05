import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SurveyClient from './survey-client';

export const metadata: Metadata = {
  title: 'Cât de bine ai grijă de tine? | Roxana Ica Aesthetic',
  description: 'Completează chestionarul Roxana Ica Aesthetic și descoperă cât de bine ai grijă de pielea ta. Analiză facială gratuită pentru cele care doresc să afle mai multe.',
};

export default function ChestionarPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-24 pb-16" style={{ background: '#F8F6F2' }}>
        <SurveyClient />
      </main>
      <Footer />
    </>
  );
}
