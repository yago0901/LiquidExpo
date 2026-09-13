export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Liquid Art",
    alternateName: "#LiquidExpo",
    url: "https://liquidart.example",
    logo: "https://liquidart.example/images/logo-mark.webp",
    founder: {
      "@type": "Person",
      name: "Carolina Damasceno",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
