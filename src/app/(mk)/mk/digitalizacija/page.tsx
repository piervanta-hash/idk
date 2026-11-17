import { DigitizationView, digitizationMetadata } from "@/views/Digitization";

export const metadata = digitizationMetadata("mk");

export default function Page() {
  return <DigitizationView locale="mk" />;
}
