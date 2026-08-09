import { PrivacyView, privacyMetadata } from "@/views/Privacy";

export const metadata = privacyMetadata("en");

export default function Page() {
  return <PrivacyView locale="en" />;
}
