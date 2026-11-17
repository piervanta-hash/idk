import { AboutView, aboutMetadata } from "@/views/About";

export const metadata = aboutMetadata("sr");

export default function Page() {
  return <AboutView locale="sr" />;
}
