import { DigitizationView, digitizationMetadata } from "@/views/Digitization";

export const metadata = digitizationMetadata("sq");

export default function Page() {
  return <DigitizationView locale="sq" />;
}
