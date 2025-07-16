import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ReportsPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Reports</h1>
          <p className="text-muted-foreground">
            View financial reports and analytics
          </p>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Aging Report</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">View overdue invoices and payment aging</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Payment Report</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Analyze payment patterns and trends</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
}