import { HomeView, homeMetadata } from "@/views/Home";

export const metadata = homeMetadata("sr");

export default function Page() {
  return <HomeView locale="sr" />;
}
