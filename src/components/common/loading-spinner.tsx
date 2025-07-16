import { Card, CardContent } from '@/components/ui/card'

interface LoadingSpinnerProps {
  /** Size of the spinner */
  size?: 'sm' | 'md' | 'lg'
  /** Text to display below the spinner */
  text?: string
  /** Whether to wrap in a card component */
  withCard?: boolean
  /** Custom className for styling */
  className?: string
}

export function LoadingSpinner({ 
  size = 'md', 
  text, 
  withCard = false,
  className = '' 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  }

  const content = (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className={`animate-spin rounded-full border-b-2 border-primary ${sizeClasses[size]}`} />
      {text && (
        <p className="mt-2 text-sm text-muted-foreground">{text}</p>
      )}
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