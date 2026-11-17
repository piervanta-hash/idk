import { HomeView, homeMetadata } from "@/views/Home";

export const metadata = homeMetadata("sq");

export default function Page() {
  return <HomeView locale="sq" />;
}
