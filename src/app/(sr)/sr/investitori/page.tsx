import { InvestorsView, investorsMetadata } from "@/views/Investors";

export const metadata = investorsMetadata("sr");

export default function Page() {
  return <InvestorsView locale="sr" />;
}
