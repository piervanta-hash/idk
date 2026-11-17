import { AnamnesisView, anamnesisMetadata } from "@/views/Anamnesis";

export const metadata = anamnesisMetadata("mk");

export default function Page() {
  return <AnamnesisView locale="mk" />;
}
