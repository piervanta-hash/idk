import { PrivacyView, privacyMetadata } from "@/views/Privacy";

export const metadata = privacyMetadata("sr");

export default function Page() {
  return <PrivacyView locale="sr" />;
}
