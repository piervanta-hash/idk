import { CustomersView, customersMetadata } from "@/views/Customers";

export const metadata = customersMetadata("mk");

export default function Page() {
  return <CustomersView locale="mk" />;
}
