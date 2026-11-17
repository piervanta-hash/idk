import { AnamnesisView, anamnesisMetadata } from "@/views/Anamnesis";

export const metadata = anamnesisMetadata("sr");

export default function Page() {
  return <AnamnesisView locale="sr" />;
}
