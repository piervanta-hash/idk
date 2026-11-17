import { AnamnesisView, anamnesisMetadata } from "@/views/Anamnesis";

export const metadata = anamnesisMetadata("sq");

export default function Page() {
  return <AnamnesisView locale="sq" />;
}
