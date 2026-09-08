import Link from 'next/link';
import Image from 'next/image';
import { articles, CATEGORIES, CATEGORY_SLUGS, type Article, type Category } from '@/lib/blog';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Skin Edit — Blog | Roxana Ica Aesthetic Brașov',
  description: 'Articole despre îngrijirea pielii, tratamente estetice și tehnologii moderne. Piele. Estetică. Tehnologie. Explicate simplu.',
  openGraph: {
    title: 'The Skin Edit — Blog de estetică și skin care',
    description: 'Piele. Estetică. Tehnologie. Explicate simplu.',
    url: 'https://www.roxanaicaaesthetic.com/blog',
  },
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ categorie?: string }>;
}) {
  const { categorie } = await searchParams;
  const activeSlug = categorie ?? '';
  const activeCategory = CATEGORIES.find(c => CATEGORY_SLUGS[c] === activeSlug) ?? null;
  const filtered = activeCategory ? articles.filter(a => a.category === activeCategory) : articles;
  const sorted = [...filtered].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      <Navigation />

      {/* Hero header */}
      <section className="pt-40 pb-16 px-6 bg-[#F8F6F2]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#C6A769] tracking-[0.3em] text-xs uppercase mb-4" style={{ fontFamily: 'var(--font-montserrat)' }}>
            Roxana Ica Aesthetic
          </p>
          <h1
            className="text-6xl md:text-8xl text-[#4A403A] tracking-[0.08em] uppercase mb-4"
            style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300 }}
          >
            The Skin Edit
          </h1>
          <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, #C6A769, transparent)', margin: '1.5rem auto', width: '160px' }} />
          <p className="text-[#7A6F66] tracking-[0.15em] text-sm uppercase" style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 400 }}>
            Piele. Estetică. Tehnologie. Explicate simplu.
          </p>
        </div>
      </section>

      {/* Category filter */}
      <section className="sticky top-[73px] z-40 bg-[#F8F6F2]/95 backdrop-blur-sm border-b border-[#E8E1D8] px-6 py-4">
        <div className="max-w-6xl mx-auto flex flex-wrap gap-2 justify-center">
          <Link
            href="/blog"
            className={`px-5 py-2 text-xs tracking-[0.15em] uppercase transition-all duration-200 ${
              !activeCategory
                ? 'bg-[#4A403A] text-white'
                : 'text-[#7A6F66] hover:text-[#4A403A] border border-[#E8E1D8] hover:border-[#C6A769]'
            }`}
            style={{ fontFamily: 'var(--font-montserrat)' }}
          >
            Toate articolele
          </Link>
          {CATEGORIES.map(cat => (
            <Link
              key={cat}
              href={`/blog?categorie=${CATEGORY_SLUGS[cat]}`}
              className={`px-5 py-2 text-xs tracking-[0.12em] uppercase transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-[#C6A769] text-white'
                  : 'text-[#7A6F66] hover:text-[#4A403A] border border-[#E8E1D8] hover:border-[#C6A769]'
              }`}
              style={{ fontFamily: 'var(--font-montserrat)' }}
            >
              {cat}
            </Link>
          ))}
        </div>
      </section>

      {/* Articles grid */}
      <main className="bg-[#F8F6F2] px-6 py-16">
        <div className="max-w-6xl mx-auto">
          {sorted.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-[#7A6F66] text-sm tracking-wide" style={{ fontFamily: 'var(--font-montserrat)' }}>
                Nu există articole în această categorie momentan.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sorted.map(article => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}

function ArticleCard({ article }: { article: Article }) {
  const formattedDate = new Date(article.date).toLocaleDateString('ro-RO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <Link href={`/blog/${article.slug}`} className="group flex flex-col bg-white border border-[#E8E1D8] hover:border-[#C6A769] transition-all duration-300 hover:shadow-md">
      {/* Image */}
      <div className="relative w-full aspect-[4/3] bg-[#E8E1D8] overflow-hidden">
        {article.image && !article.image.includes('placeholder') ? (
          <Image
            src={article.image}
            alt={article.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[#C6A769] opacity-30 text-5xl" style={{ fontFamily: 'var(--font-cormorant)' }}>✦</span>
          </div>
        )}
        {/* Category badge */}
        <span
          className="absolute top-4 left-4 px-3 py-1 text-[10px] tracking-[0.15em] uppercase bg-[#C6A769] text-white z-10"
          style={{ fontFamily: 'var(--font-montserrat)' }}
        >
          {article.category}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6 gap-3">
        <div className="flex items-center gap-3 text-[10px] text-[#7A6F66] tracking-wide" style={{ fontFamily: 'var(--font-montserrat)' }}>
          <span>{formattedDate}</span>
          <span>·</span>
          <span>{article.readingTime} min citire</span>
        </div>

        <h2
          className="text-xl text-[#4A403A] leading-snug group-hover:text-[#C6A769] transition-colors"
          style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 400 }}
        >
          {article.title}
        </h2>

        <p className="text-sm text-[#7A6F66] leading-relaxed flex-1" style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 300 }}>
          {article.excerpt}
        </p>

        <div className="flex items-center gap-2 mt-2">
          <span
            className="text-[11px] tracking-[0.15em] uppercase text-[#C6A769]"
            style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 500 }}
          >
            Citește articolul
          </span>
          <svg className="w-3 h-3 text-[#C6A769] group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
