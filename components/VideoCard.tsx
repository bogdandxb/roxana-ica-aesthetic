'use client';

import { useEffect, useState } from 'react';
import type { Video } from '@/lib/videos';

// Card cu copertă; la apăsare video-ul se deschide mare, peste pagină.
// Playerul YouTube (fără cookie-uri) se încarcă doar după apăsare.
export default function VideoCard({ video }: { video: Video }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <>
      <article className="flex flex-col min-w-0 bg-white border border-[#E8E1D8] hover:border-[#C6A769] transition-colors duration-300">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="group relative w-full aspect-[9/16] bg-[#4A403A] overflow-hidden"
          aria-label={`Pornește video: ${video.title}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
            alt=""
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-[#4A403A]/60 via-transparent to-transparent" />
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 md:w-16 md:h-16 rounded-full bg-[#F8F6F2]/90 border border-[#C6A769] flex items-center justify-center shadow-lg group-hover:bg-[#C6A769] transition-colors">
            <svg className="w-4 h-4 md:w-6 md:h-6 ml-0.5 md:ml-1 text-[#4A403A] group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </button>

        <div className="flex flex-col gap-2 p-2 md:p-5">
          <h3
            className="text-[13px] md:text-lg text-[#4A403A] leading-tight md:leading-snug break-words"
            style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 600 }}
          >
            {video.title}
          </h3>
          <p className="hidden md:block text-sm text-[#7A6F66] leading-relaxed" style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 300 }}>
            {video.text}
          </p>
        </div>
      </article>

      {open && (
        <div
          className="fixed inset-0 z-[100] bg-[#2E2723]/90 backdrop-blur-sm flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={video.title}
          onClick={() => setOpen(false)}
        >
          <div className="relative flex flex-col items-center gap-3 w-full max-w-[420px]" onClick={e => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="self-end text-[#F8F6F2] text-xs tracking-[0.15em] uppercase flex items-center gap-2 hover:text-[#C6A769] transition-colors"
              style={{ fontFamily: 'var(--font-montserrat)' }}
            >
              Închide
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div
              className="relative w-full aspect-[9/16] bg-black overflow-hidden"
              style={{ maxHeight: 'calc(100dvh - 140px)', maxWidth: 'calc((100dvh - 140px) * 9 / 16)' }}
            >
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&playsinline=1&rel=0`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full border-0"
              />
            </div>
            <p className="text-[#F8F6F2] text-center text-base" style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 500 }}>
              {video.title}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
