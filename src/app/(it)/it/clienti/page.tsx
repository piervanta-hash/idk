import { CustomersView, customersMetadata } from "@/views/Customers";

export const metadata = customersMetadata("it");

export default function Page() {
  return <CustomersView locale="it" />;
}
