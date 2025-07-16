import { MainLayout } from "@/components/layout/main-layout"
import { InvoiceManagement } from '@/components/invoices/invoice-management'
import { getCustomers } from './actions'

export default async function InvoicesPage() {
  // Server-side data fetching using server actions
  const customers = await getCustomers()

  return (
    <MainLayout>
      <InvoiceManagement initialCustomers={customers} />
    </MainLayout>
  )
}