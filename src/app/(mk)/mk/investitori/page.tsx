import { InvestorsView, investorsMetadata } from "@/views/Investors";

export const metadata = investorsMetadata("mk");

export default function Page() {
  return <InvestorsView locale="mk" />;
}
