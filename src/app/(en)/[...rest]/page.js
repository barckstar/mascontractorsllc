import { notFound } from "next/navigation";

// Unknown English URLs land here so the 404 renders inside the English layout.
// (A root app/not-found.js wrapping the site layout would put the English
// dictionary into every page's payload, Spanish ones included.)
export default function CatchAll() {
    notFound();
}
