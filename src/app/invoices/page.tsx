import { MainLayout } from "@/components/layout/main-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function InvoicesPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Invoices</h1>
            <p className="text-muted-foreground">
              Create and manage your invoices
            </p>
          </div>
          <Button>Create Invoice</Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Invoice List</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">No invoices found. Create your first invoice to get started.</p>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}