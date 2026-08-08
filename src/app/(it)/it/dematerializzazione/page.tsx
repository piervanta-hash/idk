import { DigitizationView, digitizationMetadata } from "@/views/Digitization";

export const metadata = digitizationMetadata("it");

export default function Page() {
  return <DigitizationView locale="it" />;
}
