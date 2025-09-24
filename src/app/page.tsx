'use client'

import { useState, useEffect } from 'react'
import { Navigation } from '../widgets/Navigation/Navigation'
import { Card } from '../shared/ui/Card/Card'
import { Server, Zap, RefreshCw, Monitor } from 'lucide-react'

export default function Home() {
  const [currentTime, setCurrentTime] = useState<string>('')

  useEffect(() => {
    setCurrentTime(new Date().toLocaleString('ru-RU'))
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900">
      <Navigation />
      
      <main className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6 animate-float">
              <Server className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-gray-800 dark:text-white mb-4">
              Главная страница
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-2">
              Server Side Rendering (SSR)
            </p>
            <p className="text-lg text-gray-500 dark:text-gray-600">
              Эта страница рендерится на сервере при каждом запросе
            </p>
            <div className="mt-4 inline-flex items-center px-4 py-2 bg-white/50 dark:bg-gray-800/50 rounded-full text-sm text-gray-600 dark:text-gray-300">
              <RefreshCw className="h-4 w-4 mr-2" />
              Время рендеринга: {currentTime || 'Загрузка...'}
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
            <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg mr-4">
                  <Server className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">SSR</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-600 mb-4">
                Страница рендерится на сервере при каждом запросе. 
                Это обеспечивает актуальные данные, но может быть медленнее.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full">SEO</span>
                <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs rounded-full">Актуальные данные</span>
              </div>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-lg mr-4">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Преимущества</h3>
              </div>
              <ul className="text-gray-600 dark:text-gray-300 space-y-3">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  SEO-оптимизация
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Быстрая загрузка для пользователя
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Актуальные данные
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Работает без JavaScript
                </li>
              </ul>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg mr-4">
                  <Monitor className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Технологии</h3>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span className="px-3 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm rounded-lg text-center font-medium">Next.js 14</span>
                <span className="px-3 py-2 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white text-sm rounded-lg text-center font-medium">React 18</span>
                <span className="px-3 py-2 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white text-sm rounded-lg text-center font-medium">TypeScript</span>
                <span className="px-3 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white text-sm rounded-lg text-center font-medium">Tailwind</span>
                <span className="px-3 py-2 bg-gradient-to-r from-pink-500 to-pink-600 text-white text-sm rounded-lg text-center font-medium col-span-2">FSD Architecture</span>
              </div>
            </Card>
          </div>

          <Card className="glass-effect border-0 shadow-2xl">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Навигация по приложению
              </h3>
              <p className="text-gray-700 dark:text-gray-200 mb-8 text-lg">
                Используйте навигацию выше для перехода между страницами с разными типами рендеринга
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl border border-blue-200 dark:border-blue-700">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">SSG</div>
                  <div className="text-gray-800 dark:text-gray-200 font-medium">Static Site Generation</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300 mt-2">Максимальная производительность</div>
                </div>
                <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl border border-green-200 dark:border-green-700">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">ISR</div>
                  <div className="text-gray-800 dark:text-gray-200 font-medium">Incremental Static Regeneration</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300 mt-2">Автоматическое обновление</div>
                </div>
                <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl border border-purple-200 dark:border-purple-700">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-2">CSR</div>
                  <div className="text-gray-800 dark:text-gray-200 font-medium">Client Side Rendering</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300 mt-2">Высокая интерактивность</div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}



