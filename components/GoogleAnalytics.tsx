"use client";

import Script from "next/script";

export default function GoogleAnalytics({ gaId }: { gaId: string }) {
  // Guard clause: If no ID is provided, do not inject script
  if (!gaId) return null;

  return (
    <>
      {/* 1. Load the GTAG library asynchronously */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      
      {/* 2. Initialize the Data Layer */}
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${gaId}', {
            page_path: window.location.pathname,
            send_page_view: true
          });
        `}
      </Script>
    </>
  );
}
