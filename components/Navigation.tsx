'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { services } from '@/lib/services';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'bg-[#F8F6F2]/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between pb-5">

        {/* Logo */}
        <Link href="/" className="flex flex-col items-start leading-none gap-0.5">
          <span className="text-[#4A403A] tracking-[0.2em] text-base uppercase" style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 600 }}>
            Roxana Ica
          </span>
          <span className="text-[#C6A769] tracking-[0.3em] text-sm uppercase" style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 600 }}>
            Aesthetic
          </span>
          <span className="text-[#7A6F66] tracking-[0.08em] text-xs hidden md:block mt-0.5" style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 400 }}>
            Trainer autorizat · Expert în tratamente avansate de estetică
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-10">
          <div className="relative group">
            <button
              className="text-[#4A403A] tracking-[0.12em] text-sm uppercase hover:text-[#C6A769] transition-colors flex items-center gap-1"
              style={{ fontFamily: 'var(--font-montserrat)' }}
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              Servicii
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown */}
            {servicesOpen && (
              <div
                className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-[#F8F6F2] border border-[#E8E1D8] shadow-lg py-3"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                {services.map(s => (
                  <Link
                    key={s.id}
                    href={`/servicii/${s.slug}`}
                    className="block px-6 py-2.5 text-[#7A6F66] hover:text-[#C6A769] hover:bg-[#E8E1D8] transition-colors text-xs tracking-wide"
                    style={{ fontFamily: 'var(--font-montserrat)' }}
                  >
                    {s.title}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {['Despre', 'Recenzii', 'Contact'].map(item => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-[#4A403A] tracking-[0.12em] text-sm uppercase hover:text-[#C6A769] transition-colors"
              style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 500 }}
            >
              {item}
            </a>
          ))}

          <a
            href="#contact"
            className="btn-gold text-[10px]"
            style={{ fontFamily: 'var(--font-montserrat)' }}
          >
            Programează-te
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-[#4A403A]"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Separator fin gold */}
      <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, #C6A769 30%, #C6A769 70%, transparent)', opacity: 0.4 }} />

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#F8F6F2] border-t border-[#E8E1D8] px-6 py-6 flex flex-col gap-4">
          {services.map(s => (
            <Link
              key={s.id}
              href={`/servicii/${s.slug}`}
              className="text-[#7A6F66] text-xs uppercase tracking-widest hover:text-[#C6A769] transition-colors"
              style={{ fontFamily: 'var(--font-montserrat)' }}
              onClick={() => setMenuOpen(false)}
            >
              {s.title}
            </Link>
          ))}
          <div className="h-px bg-[#E8E1D8] my-1" />
          <a href="#despre" className="text-[#7A6F66] text-xs uppercase tracking-widest hover:text-[#C6A769] transition-colors" style={{ fontFamily: 'var(--font-montserrat)' }} onClick={() => setMenuOpen(false)}>Despre</a>
          <a href="#recenzii" className="text-[#7A6F66] text-xs uppercase tracking-widest hover:text-[#C6A769] transition-colors" style={{ fontFamily: 'var(--font-montserrat)' }} onClick={() => setMenuOpen(false)}>Recenzii</a>
          <a href="#contact" className="text-[#7A6F66] text-xs uppercase tracking-widest hover:text-[#C6A769] transition-colors" style={{ fontFamily: 'var(--font-montserrat)' }} onClick={() => setMenuOpen(false)}>Contact</a>
          <a href="#contact" className="btn-gold text-center mt-2 text-[10px]" style={{ fontFamily: 'var(--font-montserrat)' }}>Programare</a>
        </div>
      )}
    </nav>
  );
}
