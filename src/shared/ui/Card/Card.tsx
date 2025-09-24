import { ReactNode } from 'react'
import { clsx } from 'clsx'

interface CardProps {
  children: ReactNode
  className?: string
  title?: string
  variant?: 'default' | 'glass' | 'gradient'
}

export function Card({ children, className, title, variant = 'default' }: CardProps) {
  return (
    <div className={clsx(
      'rounded-xl transition-all duration-300',
      {
        'bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700': variant === 'default',
        'glass-effect shadow-2xl border border-white/20': variant === 'glass',
        'bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-xl border border-gray-200/50 dark:border-gray-700/50': variant === 'gradient',
      },
      className
    )}>
      {title && (
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
    </div>
  )
}

