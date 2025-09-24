'use client'

import { useState, useEffect } from 'react'
import { Navigation } from '../../widgets/Navigation/Navigation'
import { Card } from '../../shared/ui/Card/Card'
import { PostsList } from '../../widgets/PostsList/PostsList'
import { CreatePostModal } from '../../features/CreatePostModal/CreatePostModal'
import { Monitor, Zap, Smartphone, Plus, FileText, Upload, CheckCircle, Loader } from 'lucide-react'

export default function ModalPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [renderTime, setRenderTime] = useState<string>('')
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    setRenderTime(new Date().toLocaleString('ru-RU'))
  }, [])

  const handleCreatePost = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handlePostCreated = () => {
    setRefreshKey(prev => prev + 1)
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-100 dark:from-orange-900 dark:via-amber-900 dark:to-yellow-900">
      <Navigation />
      
      <main className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-orange-500 to-amber-600 rounded-full mb-6 animate-float">
              <Monitor className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-gray-800 dark:text-white mb-4">
              Модальное окно
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-2">
              Client Side Rendering (CSR)
            </p>
            <p className="text-lg text-gray-500 dark:text-gray-400">
              Эта страница рендерится на клиенте в браузере пользователя
            </p>
            <div className="mt-4 inline-flex items-center px-4 py-2 bg-white/50 dark:bg-gray-800/50 rounded-full text-sm text-gray-600 dark:text-gray-300">
              <Loader className="h-4 w-4 mr-2" />
              Время рендеринга на клиенте: {renderTime || 'Загрузка...'}
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 mb-12">
            <Card variant="glass" className="border-0">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-gradient-to-r from-orange-500 to-amber-600 rounded-lg mr-4">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">CSR - Client Side Rendering</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-600 mb-6 text-lg">
                Страница рендерится в браузере пользователя. 
                Это обеспечивает интерактивность, но может быть медленнее при первой загрузке.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-lg border border-orange-200 dark:border-orange-700">
                  <div className="flex items-center mb-2">
                    <Zap className="h-5 w-5 text-orange-600 dark:text-orange-400 mr-2" />
                    <span className="font-semibold text-orange-800 dark:text-orange-200">Интерактивность</span>
                  </div>
                  <p className="text-sm text-orange-700 dark:text-orange-300">Высокая</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 rounded-lg border border-amber-200 dark:border-amber-700">
                  <div className="flex items-center mb-2">
                    <Smartphone className="h-5 w-5 text-amber-600 dark:text-amber-400 mr-2" />
                    <span className="font-semibold text-amber-800 dark:text-amber-200">Динамика</span>
                  </div>
                  <p className="text-sm text-amber-700 dark:text-amber-300">Обновление контента</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 rounded-lg border border-yellow-200 dark:border-yellow-700">
                  <div className="flex items-center mb-2">
                    <Monitor className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mr-2" />
                    <span className="font-semibold text-yellow-800 dark:text-yellow-200">Нагрузка</span>
                  </div>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300">Меньше на сервер</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-lime-50 to-lime-100 dark:from-lime-900/20 dark:to-lime-800/20 rounded-lg border border-lime-200 dark:border-lime-700">
                  <div className="flex items-center mb-2">
                    <Plus className="h-5 w-5 text-lime-600 dark:text-lime-400 mr-2" />
                    <span className="font-semibold text-lime-800 dark:text-lime-200">SPA</span>
                  </div>
                  <p className="text-sm text-lime-700 dark:text-lime-300">Подходит для SPA</p>
                </div>
              </div>
            </Card>

            <Card variant="glass" className="border-0">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-gradient-to-r from-amber-500 to-yellow-600 rounded-lg mr-4">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Функциональность модального окна</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-600 mb-6 text-lg">
                Ниже представлен список постов с возможностью создания новых через модальное окно.
                Модальное окно содержит форму с текстовыми полями и загрузкой файлов.
              </p>
              <div className="space-y-4">
                <div className="flex items-center p-3 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-lg">
                  <Plus className="h-5 w-5 text-orange-600 dark:text-orange-400 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Создание постов</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Через API</p>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 rounded-lg">
                  <Upload className="h-5 w-5 text-amber-600 dark:text-amber-400 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Загрузка файлов</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Изображения, документы</p>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-gradient-to-r from-yellow-50 to-lime-50 dark:from-yellow-900/20 dark:to-lime-900/20 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Валидация формы</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Проверка данных</p>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-gradient-to-r from-lime-50 to-green-50 dark:from-lime-900/20 dark:to-green-900/20 rounded-lg">
                  <Loader className="h-5 w-5 text-lime-600 dark:text-lime-400 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Состояния загрузки</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Обработка процессов</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <PostsList key={refreshKey} onCreatePost={handleCreatePost} onPostCreated={handlePostCreated} />
        </div>
      </main>

      <CreatePostModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal}
        onPostCreated={handlePostCreated}
      />
    </div>
  )
}
