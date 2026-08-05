import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SurveyClient from './survey-client';

export const metadata: Metadata = {
  title: 'Cât de bine ai grijă de tine? | Roxana Ica Aesthetic',
  description: 'Un chestionar despre corp, piele și felul în care alegem să avem grijă de noi în timp.',
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
