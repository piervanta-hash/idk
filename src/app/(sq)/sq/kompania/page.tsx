import { AboutView, aboutMetadata } from "@/views/About";

export const metadata = aboutMetadata("sq");

export default function Page() {
  return <AboutView locale="sq" />;
}
