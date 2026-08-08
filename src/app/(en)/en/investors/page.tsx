import { InvestorsView, investorsMetadata } from "@/views/Investors";

export const metadata = investorsMetadata("en");

export default function Page() {
  return <InvestorsView locale="en" />;
}
