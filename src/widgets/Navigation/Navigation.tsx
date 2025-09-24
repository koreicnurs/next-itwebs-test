'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { clsx } from 'clsx'
import { Sparkles, Home, FileText, Users, Square } from 'lucide-react'

const navigation = [
  { name: 'Главная', href: '/', icon: Home, type: 'SSR' },
  { name: 'Посты', href: '/posts', icon: FileText, type: 'SSG' },
  { name: 'Пользователи', href: '/users', icon: Users, type: 'ISR' },
  { name: 'Модальное окно', href: '/modal', icon: Square, type: 'CSR' },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="sticky top-0 z-50 glass-effect border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0 flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-800 dark:text-white">Next.js FSD App</h1>
            </div>
            <div className="hidden sm:ml-8 sm:flex sm:space-x-1">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={clsx(
                      'group relative inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                      pathname === item.href
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105'
                        : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:hover:text-white dark:hover:bg-gray-800'
                    )}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    <span>{item.name}</span>
                    <span className={clsx(
                      'ml-2 px-2 py-1 text-xs rounded-full font-semibold',
                      pathname === item.href
                        ? 'bg-white/20 text-white'
                        : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200'
                    )}>
                      {item.type}
                    </span>
                    {pathname === item.href && (
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
                    )}
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

