import { Badge } from '@/components/ui/badge'
import { InvoiceStatus } from '@/types/invoice'

interface StatusBadgeProps {
  status: InvoiceStatus | string
  className?: string
}

export function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case InvoiceStatus.DRAFT:
        return 'bg-gray-100 text-gray-800'
      case InvoiceStatus.SENT:
        return 'bg-blue-100 text-blue-800'
      case InvoiceStatus.PAID:
        return 'bg-green-100 text-green-800'
      case InvoiceStatus.OVERDUE:
        return 'bg-red-100 text-red-800'
      case InvoiceStatus.CANCELLED:
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <Badge className={`${getStatusColor(status)} ${className}`}>
      {status}
    </Badge>
  )
}