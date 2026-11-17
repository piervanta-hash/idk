import { PrivacyView, privacyMetadata } from "@/views/Privacy";

export const metadata = privacyMetadata("mk");

export default function Page() {
  return <PrivacyView locale="mk" />;
}
