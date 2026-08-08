import { DigitizationView, digitizationMetadata } from "@/views/Digitization";

export const metadata = digitizationMetadata("en");

export default function Page() {
  return <DigitizationView locale="en" />;
}
