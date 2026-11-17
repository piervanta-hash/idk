import { PrivacyView, privacyMetadata } from "@/views/Privacy";

export const metadata = privacyMetadata("sq");

export default function Page() {
  return <PrivacyView locale="sq" />;
}
