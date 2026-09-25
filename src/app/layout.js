import "./globals.css";
import LangHtml from "@/components/LangHtml";

// The one root layout for every language. English pages live in app/(en)/ at
// their original URLs and Spanish ones in app/es/; both sit under this layout,
// so switching language is a normal client-side navigation (Next does a full
// page load when moving between different root layouts).
export default function RootLayout({ children }) {
  return <LangHtml>{children}</LangHtml>;
}
