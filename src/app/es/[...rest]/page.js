import { notFound } from "next/navigation";

// Unknown /es/… URLs land here so the 404 renders inside the Spanish layout.
export default function CatchAll() {
    notFound();
}
