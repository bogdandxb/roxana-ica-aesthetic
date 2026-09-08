import Link from 'next/link';
import { notFound } from 'next/navigation';
import { articles, getArticleBySlug, getRelatedArticles, CATEGORY_SLUGS } from '@/lib/blog';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  return articles.map(a => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = getArticleBySlug(params.slug);
  if (!article) return { title: 'Articol negăsit' };
  return {
    title: article.seoTitle,
    description: article.metaDescription,
    openGraph: {
      title: article.seoTitle,
      description: article.metaDescription,
      url: `https://www.roxanaicaaesthetic.com/blog/${article.slug}`,
      type: 'article',
      publishedTime: article.date,
    },
    alternates: {
      canonical: `https://www.roxanaicaaesthetic.com/blog/${article.slug}`,
    },
  };
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug);
  if (!article) notFound();

  const related = getRelatedArticles(article, 3);
  const formattedDate = new Date(article.date).toLocaleDateString('ro-RO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <>
      <Navigation />

      {/* Breadcrumb */}
      <div className="pt-32 pb-0 px-6 bg-[#F8F6F2]">
        <div className="max-w-3xl mx-auto">
          <nav className="flex items-center gap-2 text-[10px] tracking-[0.15em] uppercase text-[#7A6F66]" style={{ fontFamily: 'var(--font-montserrat)' }}>
            <Link href="/" className="hover:text-[#C6A769] transition-colors">Acasă</Link>
            <span>·</span>
            <Link href="/blog" className="hover:text-[#C6A769] transition-colors">The Skin Edit</Link>
            <span>·</span>
            <Link href={`/blog?categorie=${CATEGORY_SLUGS[article.category]}`} className="hover:text-[#C6A769] transition-colors">
              {article.category}
            </Link>
          </nav>
        </div>
      </div>

      {/* Article header */}
      <header className="px-6 pt-8 pb-12 bg-[#F8F6F2]">
        <div className="max-w-3xl mx-auto">
          <Link
            href={`/blog?categorie=${CATEGORY_SLUGS[article.category]}`}
            className="inline-block px-3 py-1 text-[10px] tracking-[0.2em] uppercase bg-[#C6A769] text-white mb-6"
            style={{ fontFamily: 'var(--font-montserrat)' }}
          >
            {article.category}
          </Link>

          <h1
            className="text-4xl md:text-6xl text-[#4A403A] leading-tight mb-6"
            style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300 }}
          >
            {article.title}
          </h1>

          <div className="flex items-center gap-6 text-xs text-[#7A6F66] tracking-wide mb-8" style={{ fontFamily: 'var(--font-montserrat)' }}>
            <span>{formattedDate}</span>
            <span>·</span>
            <span>{article.readingTime} minute de lectură</span>
            <span>·</span>
            <span>de <strong className="text-[#4A403A]">Roxana Ica</strong></span>
          </div>

          <div style={{ height: '1px', background: 'linear-gradient(90deg, #C6A769, transparent)', opacity: 0.5 }} />
        </div>
      </header>

      {/* Article image placeholder */}
      <div className="px-6 mb-12 bg-[#F8F6F2]">
        <div className="max-w-3xl mx-auto">
          <div className="w-full aspect-[16/7] bg-[#E8E1D8] flex items-center justify-center">
            <span className="text-[#C6A769] opacity-20 text-8xl" style={{ fontFamily: 'var(--font-cormorant)' }}>✦</span>
          </div>
          {article.imageAlt && (
            <p className="text-center text-[10px] text-[#7A6F66] mt-2 tracking-wide" style={{ fontFamily: 'var(--font-montserrat)' }}>
              {article.imageAlt}
            </p>
          )}
        </div>
      </div>

      {/* Article body */}
      <article className="px-6 pb-20 bg-[#F8F6F2]">
        <div className="max-w-3xl mx-auto">
          {/* Lead excerpt */}
          <p
            className="text-xl text-[#4A403A] leading-relaxed mb-10 pb-10 border-b border-[#E8E1D8] italic"
            style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300 }}
          >
            {article.excerpt}
          </p>

          {/* Main content */}
          <div
            className="prose-blog text-[#4A403A]"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Tags / category */}
          <div className="mt-16 pt-8 border-t border-[#E8E1D8] flex items-center gap-4">
            <span className="text-xs text-[#7A6F66] tracking-wide" style={{ fontFamily: 'var(--font-montserrat)' }}>Categorie:</span>
            <Link
              href={`/blog?categorie=${CATEGORY_SLUGS[article.category]}`}
              className="px-4 py-1.5 text-xs tracking-[0.12em] uppercase border border-[#C6A769] text-[#C6A769] hover:bg-[#C6A769] hover:text-white transition-colors"
              style={{ fontFamily: 'var(--font-montserrat)' }}
            >
              {article.category}
            </Link>
          </div>
        </div>
      </article>

      {/* CTA programare */}
      <section className="px-6 py-16 bg-[#4A403A]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[#C6A769] tracking-[0.3em] text-xs uppercase mb-3" style={{ fontFamily: 'var(--font-montserrat)' }}>
            Roxana Ica Aesthetic · Brașov
          </p>
          <h2
            className="text-3xl md:text-5xl text-white mb-4"
            style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300 }}
          >
            Vrei un consult personalizat?
          </h2>
          <p className="text-[#E8E1D8] text-sm mb-8 leading-relaxed" style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 300 }}>
            Fiecare piele este diferită. Programează o consultație și primești un protocol adaptat nevoilor tale reale.
          </p>
          <a
            href="https://wa.me/40771569093"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-10 py-4 bg-[#C6A769] text-white text-xs tracking-[0.2em] uppercase hover:bg-[#b8975e] transition-colors"
            style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 500 }}
          >
            Programează-te pe WhatsApp
          </a>
        </div>
      </section>

      {/* Related articles */}
      {related.length > 0 && (
        <section className="px-6 py-16 bg-[#F8F6F2]">
          <div className="max-w-6xl mx-auto">
            <h2
              className="text-3xl text-[#4A403A] text-center mb-2"
              style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300 }}
            >
              Articole înrudite
            </h2>
            <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, #C6A769, transparent)', margin: '1rem auto 3rem', width: '80px' }} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map(rel => (
                <Link
                  key={rel.slug}
                  href={`/blog/${rel.slug}`}
                  className="group flex flex-col bg-white border border-[#E8E1D8] hover:border-[#C6A769] transition-all duration-300 p-6 gap-3"
                >
                  <span
                    className="text-[10px] tracking-[0.2em] uppercase text-[#C6A769]"
                    style={{ fontFamily: 'var(--font-montserrat)' }}
                  >
                    {rel.category}
                  </span>
                  <h3
                    className="text-lg text-[#4A403A] leading-snug group-hover:text-[#C6A769] transition-colors"
                    style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 400 }}
                  >
                    {rel.title}
                  </h3>
                  <p className="text-xs text-[#7A6F66] leading-relaxed" style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 300 }}>
                    {rel.excerpt.substring(0, 100)}…
                  </p>
                  <span className="text-[11px] tracking-[0.12em] uppercase text-[#C6A769] mt-auto" style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 500 }}>
                    Citește →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back to blog */}
      <div className="px-6 pb-12 bg-[#F8F6F2] text-center">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-[#7A6F66] hover:text-[#C6A769] transition-colors"
          style={{ fontFamily: 'var(--font-montserrat)' }}
        >
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Înapoi la The Skin Edit
        </Link>
      </div>

      <Footer />
    </>
  );
}
