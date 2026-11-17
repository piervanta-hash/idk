import { HomeView, homeMetadata } from "@/views/Home";

export const metadata = homeMetadata("mk");

export default function Page() {
  return <HomeView locale="mk" />;
}
