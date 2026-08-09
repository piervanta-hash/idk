import { CustomersView, customersMetadata } from "@/views/Customers";

export const metadata = customersMetadata("en");

export default function Page() {
  return <CustomersView locale="en" />;
}
