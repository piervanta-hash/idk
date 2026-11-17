import { CustomersView, customersMetadata } from "@/views/Customers";

export const metadata = customersMetadata("sq");

export default function Page() {
  return <CustomersView locale="sq" />;
}
