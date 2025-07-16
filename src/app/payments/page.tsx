import { MainLayout } from "@/components/layout/main-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PaymentsPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Payments</h1>
            <p className="text-muted-foreground">
              Track and manage payments
            </p>
          </div>
          <Button>Record Payment</Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Payment List</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">No payments found. Record your first payment to get started.</p>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}