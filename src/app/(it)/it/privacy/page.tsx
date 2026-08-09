import { PrivacyView, privacyMetadata } from "@/views/Privacy";

export const metadata = privacyMetadata("it");

export default function Page() {
  return <PrivacyView locale="it" />;
}
