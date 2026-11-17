import { AboutView, aboutMetadata } from "@/views/About";

export const metadata = aboutMetadata("mk");

export default function Page() {
  return <AboutView locale="mk" />;
}
