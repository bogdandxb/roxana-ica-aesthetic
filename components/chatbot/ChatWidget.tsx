'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';

// Fereastra de chat se încarcă abia la primul click — nu încetinește deschiderea paginilor
const ChatPanel = dynamic(() => import('./ChatPanel'), { ssr: false });

export default function ChatWidget() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  if (pathname?.startsWith('/admin')) return null;

  return (
    <>
      {loaded && <ChatPanel open={open} onClose={() => setOpen(false)} />}

      <button
        type="button"
        onClick={() => {
          setLoaded(true);
          setOpen(o => !o);
        }}
        aria-label={open ? 'Închide asistentul virtual' : 'Deschide asistentul virtual'}
        aria-expanded={open}
        className={`fixed bottom-5 right-5 z-[60] h-14 w-14 rounded-full flex items-center justify-center text-white shadow-[0_10px_30px_rgba(74,64,58,0.35)] transition-all duration-300 hover:scale-105 ${open ? 'max-sm:hidden' : ''}`}
        style={{ background: 'linear-gradient(135deg, #C9A84C, #8B6914)' }}
      >
        {open ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20.5l1.4-4.6A8 8 0 1 1 21 12z" />
            <path d="M8.5 11.5h.01M12 11.5h.01M15.5 11.5h.01" strokeWidth="2.4" />
          </svg>
        )}
      </button>
    </>
  );
}
