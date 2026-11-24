import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import VideoCard from '@/components/VideoCard';
import { videoGroups } from '@/lib/videos';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Video — Descoperă experiența | Roxana Ica Aesthetic Brașov',
  description: 'Video-uri scurte în care Roxana Ica explică procedurile: tratamente faciale, biorevitalizare, melasmă și pete pigmentare, IPL.',
  alternates: {
    canonical: 'https://www.roxanaicaaesthetic.com/video',
  },
  openGraph: {
    title: 'Descoperă experiența — video-uri Roxana Ica Aesthetic',
    description: 'Video-uri în care îți explic procedurile, pas cu pas.',
    url: 'https://www.roxanaicaaesthetic.com/video',
  },
};

// Date structurate pentru Google: fiecare video ca VideoObject.
const videoSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Video-uri Roxana Ica Aesthetic',
  itemListElement: videoGroups.flatMap(g => g.videos).map((v, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'VideoObject',
      name: v.title,
      description: v.text,
      thumbnailUrl: `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`,
      uploadDate: `${v.date}T12:00:00+02:00`,
      embedUrl: `https://www.youtube.com/embed/${v.id}`,
      contentUrl: `https://www.youtube.com/shorts/${v.id}`,
      inLanguage: 'ro',
    },
  })),
};

export default function VideoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }}
      />
      <Navigation />

      <section className="pt-40 pb-16 px-6 bg-[#F8F6F2]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#C6A769] tracking-[0.3em] text-xs uppercase mb-4" style={{ fontFamily: 'var(--font-montserrat)' }}>
            Video
          </p>
          <h1
            className="text-4xl sm:text-5xl md:text-7xl text-[#4A403A] tracking-[0.06em] uppercase mb-4"
            style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300 }}
          >
            Descoperă experiența
          </h1>
          <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, #C6A769, transparent)', margin: '1.5rem auto', width: '160px' }} />
          <p className="text-[#7A6F66] tracking-[0.1em] text-sm uppercase" style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 400 }}>
            Video-uri în care îți explic procedurile, pas cu pas
          </p>
        </div>
      </section>

      <main className="bg-[#F8F6F2] px-3 sm:px-6 pb-20">
        <div className="max-w-6xl mx-auto flex flex-col gap-16">
          {videoGroups.map(group => (
            <section key={group.name} className="flex flex-col gap-8">
              <div className="flex items-center gap-4">
                <h2
                  className="text-xl sm:text-2xl md:text-3xl text-[#4A403A] px-1 sm:px-0"
                  style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 400 }}
                >
                  {group.name}
                </h2>
                <div className="flex-1 h-px bg-gradient-to-r from-[#C6A769]/60 to-transparent" />
              </div>
              <div className="grid grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 md:gap-6">
                {group.videos.map(video => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}
