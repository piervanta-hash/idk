import { DigitizationView, digitizationMetadata } from "@/views/Digitization";

export const metadata = digitizationMetadata("sr");

export default function Page() {
  return <DigitizationView locale="sr" />;
}
