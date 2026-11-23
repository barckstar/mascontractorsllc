import { NextResponse } from "next/server";
import { writeReviewUrl } from "@/lib/googleReviews";
import { BUSINESS } from "@/content/business";

// mascontractors.com/review → Google's "write a review" box.
// This is the link for the QR card and the text sent when a job is handed over:
// short, on our own domain, and it keeps working if the Place ID ever changes.
//
// People get a plain redirect. Link-preview bots (WhatsApp, iMessage, Facebook,
// SMS apps…) get a small HTML page with title, description and our picture
// instead: if they followed the redirect, the preview would be Google's or empty.
// WhatsApp's preview fetcher sends just "WhatsApp/2.x" (no "Mozilla"); its in-app
// browser on Android also carries "WhatsApp/" after a normal Chrome UA, and that
// one is a person, so only the bare form counts.
const PREVIEW_BOTS =
    /^whatsapp\/|facebookexternalhit|facebookcatalog|meta-externalagent|twitterbot|slackbot|linkedinbot|telegrambot|discordbot|skypeuripreview|pinterest|redditbot|embedly|vkshare|google-pagerenderer|iframely|outbrain|quora link preview|bitlybot|applebot|bingbot|googlebot/i;

const TITLE = "Leave a Review for MAS Contractors";
const DESCRIPTION =
    "Thank you for choosing MAS Contractors in Richmond, VA. Tap to leave us a Google review. · Gracias por elegirnos: deje su reseña en Google.";

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function GET(request) {
    const target = writeReviewUrl();
    const headers = { "cache-control": "private, no-store", vary: "User-Agent" };

    if (!PREVIEW_BOTS.test(request.headers.get("user-agent") ?? "")) {
        return NextResponse.redirect(target, { status: 307, headers });
    }

    const url = `${BUSINESS.url}/review`;
    const image = `${BUSINESS.url}/review/opengraph-image`;
    const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${esc(TITLE)}</title>
<meta name="description" content="${esc(DESCRIPTION)}">
<meta name="robots" content="noindex">
<link rel="canonical" href="${url}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="MAS Contractors">
<meta property="og:url" content="${url}">
<meta property="og:title" content="${esc(TITLE)}">
<meta property="og:description" content="${esc(DESCRIPTION)}">
<meta property="og:image" content="${image}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="MAS Contractors — Leave us a review">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(TITLE)}">
<meta name="twitter:description" content="${esc(DESCRIPTION)}">
<meta name="twitter:image" content="${image}">
</head>
<body>
<p><a href="${esc(target)}">${esc(TITLE)}</a></p>
<script>location.replace(${JSON.stringify(target).replace(/</g, "\\u003c")})</script>
</body>
</html>`;
    return new Response(html, { headers: { ...headers, "content-type": "text/html; charset=utf-8" } });
}
