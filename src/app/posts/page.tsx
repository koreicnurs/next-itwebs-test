'use client'

import { useState, useEffect } from 'react'
import { Navigation } from '../../widgets/Navigation/Navigation'
import { Card } from '../../shared/ui/Card/Card'
import type { Post } from '../../shared/api/types'
import { FileText, Clock, Zap, Database } from 'lucide-react'

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [buildTime, setBuildTime] = useState<string>('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
        if (!res.ok) {
          throw new Error('Failed to fetch posts')
        }
        const data = await res.json()
        setPosts(data)
        setBuildTime(new Date().toLocaleString('ru-RU'))
      } catch (error) {
        console.error('Error fetching posts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-100 dark:from-emerald-900 dark:via-teal-900 dark:to-cyan-900">
      <Navigation />
      
      <main className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full mb-6 animate-float">
              <FileText className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-gray-800 dark:text-white mb-4">
              Посты
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-2">
              Static Site Generation (SSG)
            </p>
            <p className="text-lg text-gray-500 dark:text-gray-400">
              Эта страница генерируется статически во время сборки
            </p>
            <div className="mt-4 inline-flex items-center px-4 py-2 bg-white/50 dark:bg-gray-800/50 rounded-full text-sm text-gray-600 dark:text-gray-300">
              <Clock className="h-4 w-4 mr-2" />
              Время сборки: {buildTime || 'Загрузка...'}
            </div>
          </div>

          <div className="mb-12">
            <Card variant="glass" className="border-0">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg mr-4">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">SSG - Static Site Generation</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-600 mb-6 text-lg">
                Страница генерируется во время сборки и кэшируется. 
                Это обеспечивает максимальную производительность, но данные могут быть устаревшими.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 rounded-lg border border-emerald-200 dark:border-emerald-700">
                  <div className="flex items-center mb-2">
                    <Database className="h-5 w-5 text-emerald-600 dark:text-emerald-400 mr-2" />
                    <span className="font-semibold text-emerald-800 dark:text-emerald-200">Производительность</span>
                  </div>
                  <p className="text-sm text-emerald-700 dark:text-emerald-300">Максимальная скорость загрузки</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-900/20 dark:to-teal-800/20 rounded-lg border border-teal-200 dark:border-teal-700">
                  <div className="flex items-center mb-2">
                    <Clock className="h-5 w-5 text-teal-600 dark:text-teal-400 mr-2" />
                    <span className="font-semibold text-teal-800 dark:text-teal-200">Кэширование</span>
                  </div>
                  <p className="text-sm text-teal-700 dark:text-teal-300">Отлично для статичного контента</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-cyan-50 to-cyan-100 dark:from-cyan-900/20 dark:to-cyan-800/20 rounded-lg border border-cyan-200 dark:border-cyan-700">
                  <div className="flex items-center mb-2">
                    <FileText className="h-5 w-5 text-cyan-600 dark:text-cyan-400 mr-2" />
                    <span className="font-semibold text-cyan-800 dark:text-cyan-400">ISR совместимость</span>
                  </div>
                  <p className="text-sm text-cyan-700 dark:text-cyan-300">Можно использовать с ISR</p>
                </div>
              </div>
            </Card>
          </div>

          <div className="grid gap-8">
            {loading ? (
              <Card className="text-center py-12">
                <div className="flex items-center justify-center mb-4">
                  <Clock className="h-8 w-8 text-emerald-600 animate-spin" />
                </div>
                <p className="text-gray-600 dark:text-gray-300">Загрузка постов...</p>
              </Card>
            ) : (
              posts.map((post: Post, index) => (
              <Card 
                key={post.id} 
                className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                variant="gradient"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-sm mr-4">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        {post.title}
                      </h3>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 text-xs rounded-full font-medium">
                          ID: {post.id}
                        </span>
                        <span className="px-3 py-1 bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 text-xs rounded-full font-medium">
                          User: {post.userId}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                  {post.body}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <FileText className="h-4 w-4 mr-2" />
                    Статически сгенерирован
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {Math.floor(Math.random() * 100) + 1} просмотров
                  </div>
                </div>
              </Card>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
