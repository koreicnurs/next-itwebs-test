import { ReactNode } from 'react'
import { clsx } from 'clsx'
import { CheckCircle, AlertCircle, Info, XCircle } from 'lucide-react'

interface AlertProps {
  children: ReactNode
  variant?: 'success' | 'error' | 'warning' | 'info'
  className?: string
}

export function Alert({ children, variant = 'info', className }: AlertProps) {
  const icons = {
    success: CheckCircle,
    error: XCircle,
    warning: AlertCircle,
    info: Info,
  }

  const Icon = icons[variant]

  return (
    <div
      className={clsx(
        'flex items-start p-4 rounded-md border',
        {
          'bg-green-50 border-green-200 text-green-800': variant === 'success',
          'bg-red-50 border-red-200 text-red-800': variant === 'error',
          'bg-yellow-50 border-yellow-200 text-yellow-800': variant === 'warning',
          'bg-blue-50 border-blue-200 text-blue-800': variant === 'info',
        },
        className
      )}
    >
      <Icon className="h-5 w-5 mr-3 flex-shrink-0" />
      <div className="text-sm">{children}</div>
    </div>
  )
}

