import PrivacyContent from "@/components/PrivacyContent";
import { pageMetadata } from "@/i18n/metadata";
import PageSections from "@/i18n/PageSections";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return pageMetadata(lang, "privacy", "/privacy");
}

export default async function PrivacyPage({ params }) {
  const { lang } = await params;
  return (
    <PageSections lang={lang} names={["privacyPage"]}>
      <PrivacyContent />
    </PageSections>
  );
}
