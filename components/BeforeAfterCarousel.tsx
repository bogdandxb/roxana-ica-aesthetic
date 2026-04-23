'use client';

const pairsMap: Record<string, { before: string; after: string }[]> = {
  'protocoale-faciale': [
    { before: '/images/before-after/1.jpg', after: '/images/before-after/2.jpg' },
    { before: '/images/before-after/3.jpg', after: '/images/before-after/4.jpg' },
    { before: '/images/before-after/5.jpg', after: '/images/before-after/6.jpg' },
    { before: '/images/before-after/7.jpg', after: '/images/before-after/8.jpg' },
    { before: '/images/before-after/9.jpg', after: '/images/before-after/10.jpg' },
    { before: '/images/before-after/11.jpg', after: '/images/before-after/12.jpg' },
  ],
  'remodelare-corporala': [
    { before: '/images/before-after-remodelare/1.jpg', after: '/images/before-after-remodelare/2.jpg' },
    { before: '/images/before-after-remodelare/3.jpg', after: '/images/before-after-remodelare/4.jpg' },
    { before: '/images/before-after-remodelare/5.jpg', after: '/images/before-after-remodelare/6.jpg' },
    { before: '/images/before-after-remodelare/7.jpg', after: '/images/before-after-remodelare/8.jpg' },
    { before: '/images/before-after-remodelare/9.jpg', after: '/images/before-after-remodelare/10.jpg' },
    { before: '/images/before-after-remodelare/11.jpg', after: '/images/before-after-remodelare/12.jpg' },
  ],
};

function BeforeAfterCard({ before, after }: { before: string; after: string }) {
  return (
    <div className="flex-shrink-0 w-72 md:w-80 overflow-hidden" style={{ boxShadow: '0 4px 20px rgba(74,64,58,0.12)' }}>
      <div className="flex">
        <div className="relative flex-1">
          <img src={before} alt="Before" className="w-full h-56 md:h-64 object-cover object-center" />
          <div className="absolute bottom-0 left-0 right-0 py-1.5 text-center" style={{ background: 'rgba(74,64,58,0.75)' }}>
            <span className="text-white text-[10px] tracking-[0.2em] uppercase" style={{ fontFamily: 'var(--font-montserrat)' }}>Before</span>
          </div>
        </div>
        <div className="w-px bg-white/60" />
        <div className="relative flex-1">
          <img src={after} alt="After" className="w-full h-56 md:h-64 object-cover object-center" />
          <div className="absolute bottom-0 left-0 right-0 py-1.5 text-center" style={{ background: 'linear-gradient(135deg, rgba(201,168,76,0.85), rgba(139,105,20,0.85))' }}>
            <span className="text-white text-[10px] tracking-[0.2em] uppercase" style={{ fontFamily: 'var(--font-montserrat)' }}>After</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BeforeAfterCarousel({ slug }: { slug: string }) {
  const pairs = pairsMap[slug] ?? [];
  const doubled = [...pairs, ...pairs];

  if (pairs.length === 0) return null;

  return (
    <section className="py-20 bg-[#F8F6F2] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center text-center gap-5 mb-12">
          <span className="text-[#C6A769] tracking-[0.25em] text-xs uppercase" style={{ fontFamily: 'var(--font-montserrat)' }}>
            Rezultate Reale
          </span>
          <h2 className="text-4xl md:text-5xl text-[#4A403A]" style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300 }}>
            Before & After
          </h2>
          <div className="gold-line" />
        </div>
      </div>

      <style>{`
        @keyframes marquee-ba {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-ba {
          display: flex;
          gap: 16px;
          animation: marquee-ba 15s linear infinite;
          width: max-content;
        }
        @media (min-width: 768px) {
          .marquee-ba {
            animation-duration: 20s;
          }
        }
        .marquee-ba:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="overflow-hidden">
        <div className="marquee-ba">
          {doubled.map((pair, i) => (
            <BeforeAfterCard key={i} before={pair.before} after={pair.after} />
          ))}
        </div>
      </div>
    </section>
  );
}
