import { notFound } from "next/navigation";

// Every URL that matches no page lands here, so the 404 renders inside the
// language layout (navbar, footer, dictionary) instead of Next's bare default.
export const dynamicParams = true;

export default function CatchAll() {
    notFound();
}
