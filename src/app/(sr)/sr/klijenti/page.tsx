import { CustomersView, customersMetadata } from "@/views/Customers";

export const metadata = customersMetadata("sr");

export default function Page() {
  return <CustomersView locale="sr" />;
}
