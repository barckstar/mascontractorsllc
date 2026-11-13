"use client";
import Script from "next/script";

// Contenedor de Google Tag Manager (el ID es público: sale en el HTML de todos modos).
// Dentro del contenedor viven las etiquetas: Google tag de GA4, clics al teléfono, etc.
// No añadir gtag.js de GA4 por separado: duplicaría las visitas.
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "GTM-KMQQ3RGM";

export default function GoogleTagManager() {
    return (
        <>
            <Script id="gtm" strategy="afterInteractive">
                {`window.dataLayer=window.dataLayer||[];window.dataLayer.push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=document.getElementsByTagName('script')[0],j=document.createElement('script');j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id=${GTM_ID}';f.parentNode.insertBefore(j,f);`}
            </Script>
            <noscript>
                <iframe
                    src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
                    height="0"
                    width="0"
                    style={{ display: "none", visibility: "hidden" }}
                    title="gtm"
                />
            </noscript>
        </>
    );
}
