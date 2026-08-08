import { AnamnesisView, anamnesisMetadata } from "@/views/Anamnesis";

export const metadata = anamnesisMetadata("it");

export default function Page() {
  return <AnamnesisView locale="it" />;
}
