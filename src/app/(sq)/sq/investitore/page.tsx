import { InvestorsView, investorsMetadata } from "@/views/Investors";

export const metadata = investorsMetadata("sq");

export default function Page() {
  return <InvestorsView locale="sq" />;
}
