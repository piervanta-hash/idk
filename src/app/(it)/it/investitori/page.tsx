import { InvestorsView, investorsMetadata } from "@/views/Investors";

export const metadata = investorsMetadata("it");

export default function Page() {
  return <InvestorsView locale="it" />;
}
