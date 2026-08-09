import { AnamnesisView, anamnesisMetadata } from "@/views/Anamnesis";

export const metadata = anamnesisMetadata("en");

export default function Page() {
  return <AnamnesisView locale="en" />;
}
