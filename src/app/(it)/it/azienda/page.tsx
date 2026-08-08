import { AboutView, aboutMetadata } from "@/views/About";

export const metadata = aboutMetadata("it");

export default function Page() {
  return <AboutView locale="it" />;
}
