import { AboutView, aboutMetadata } from "@/views/About";

export const metadata = aboutMetadata("en");

export default function Page() {
  return <AboutView locale="en" />;
}
