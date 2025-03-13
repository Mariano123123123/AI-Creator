import type { Organization, WebSite, WithContext } from "schema-dts"

export function SchemaOrg() {
  const organizationSchema: WithContext<Organization> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "AI Creator Platform",
    url: "https://aicreator-platform.com",
    logo: "https://aicreator-platform.com/logo.png",
    sameAs: [
      "https://twitter.com/aicreator",
      "https://instagram.com/aicreator",
      "https://github.com/aicreator",
      "https://youtube.com/aicreator",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-555-555-5555",
      contactType: "customer service",
      email: "support@aicreator-platform.com",
      availableLanguage: "English",
    },
  }

  const websiteSchema: WithContext<WebSite> = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "AI Creator Platform",
    url: "https://aicreator-platform.com",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://aicreator-platform.com/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
    </>
  )
}

