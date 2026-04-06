import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArtikelContent from "@/components/ArtikelContent";
import { getArtikelBySlug, getArtikel } from "@/lib/articles";

export async function generateStaticParams() {
  return getArtikel().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const artikel = getArtikelBySlug(slug);
  if (!artikel) return {};
  return {
    title: artikel.title,
    description: artikel.description,
    openGraph: {
      type: "article",
      title: artikel.title,
      description: artikel.description,
      ...(artikel.bild ? { images: [{ url: artikel.bild }] } : {}),
    },
  };
}

export default async function ArtikelPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const artikel = getArtikelBySlug(slug);
  if (!artikel) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: artikel.title,
    description: artikel.description,
    ...(artikel.datum ? { datePublished: artikel.datum } : {}),
    author: {
      "@type": "Organization",
      name: "schwabenspart",
    },
    publisher: {
      "@type": "Organization",
      name: "schwabenspart",
      logo: {
        "@type": "ImageObject",
        url: "https://schwabenspart.com/logos/logo.png",
      },
    },
    ...(artikel.bild
      ? { image: `https://schwabenspart.com${artikel.bild}` }
      : {}),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://schwabenspart.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Spartipps",
        item: "https://schwabenspart.com/spartipps",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: artikel.title,
        item: `https://schwabenspart.com/spartipps/${slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([articleJsonLd, breadcrumbJsonLd]),
        }}
      />
      <ArtikelContent artikel={artikel} />
    </>
  );
}
