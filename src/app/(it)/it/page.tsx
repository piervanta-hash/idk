import { HomeView, homeMetadata } from "@/views/Home";

export const metadata = homeMetadata("it");

export default function Page() {
  return <HomeView locale="it" />;
}
