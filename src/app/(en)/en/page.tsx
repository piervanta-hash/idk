import { HomeView, homeMetadata } from "@/views/Home";

export const metadata = homeMetadata("en");

export default function Page() {
  return <HomeView locale="en" />;
}
