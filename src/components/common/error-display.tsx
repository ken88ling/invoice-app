import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AlertCircle, RefreshCw } from 'lucide-react'

interface ErrorDisplayProps {
  /** Error message to display */
  error: string
  /** Optional retry function */
  onRetry?: () => void
  /** Whether to wrap in a card component */
  withCard?: boolean
  /** Custom className for styling */
  className?: string
  /** Custom title for the error */
  title?: string
}

export function ErrorDisplay({ 
  error, 
  onRetry, 
  withCard = false,
  className = '',
  title = 'Error'
}: ErrorDisplayProps) {
  const content = (
    <div className={`text-center ${className}`}>
      <div className="flex flex-col items-center gap-3">
        <AlertCircle className="h-8 w-8 text-red-500" />
        <div>
          <h3 className="font-semibold text-red-600">{title}</h3>
          <p className="text-sm text-red-500 mt-1">{error}</p>
        </div>
        {onRetry && (
          <Button
            variant="outline"
            size="sm"
            onClick={onRetry}
            className="mt-2"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        )}
      </div>
    </div>
  )

  if (withCard) {
    return (
      <Card>
        <CardContent className="py-8">
          {content}
        </CardContent>
      </Card>
    )
  }

  return content
}