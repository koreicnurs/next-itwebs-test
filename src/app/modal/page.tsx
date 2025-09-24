'use client'

import { useState } from 'react'
import { Navigation } from '../../widgets/Navigation/Navigation'
import { Card } from '../../shared/ui/Card/Card'
import { PostsList } from '../../widgets/PostsList/PostsList'
import { CreatePostModal } from '../../features/CreatePostModal/CreatePostModal'

export default function ModalPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [renderTime] = useState(new Date().toLocaleString('ru-RU'))

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Модальное окно (CSR)
            </h1>
            <p className="text-lg text-gray-600">
              Эта страница рендерится на клиенте (Client Side Rendering)
            </p>
            <div className="text-sm text-gray-500 mt-2">
              Время рендеринга на клиенте: {renderTime}
            </div>
          </div>

          <div className="mb-8">
            <Card title="CSR - Client Side Rendering">
              <p className="text-gray-600 mb-4">
                Страница рендерится в браузере пользователя. 
                Это обеспечивает интерактивность, но может быть медленнее при первой загрузке.
              </p>
              <ul className="text-gray-600 space-y-1">
                <li>• Высокая интерактивность</li>
                <li>• Динамическое обновление контента</li>
                <li>• Меньше нагрузки на сервер</li>
                <li>• Подходит для SPA-приложений</li>
              </ul>
            </Card>
          </div>

          <div className="mb-8">
            <Card title="Функциональность модального окна">
              <p className="text-gray-600 mb-4">
                Ниже представлен список постов с возможностью создания новых через модальное окно.
                Модальное окно содержит форму с текстовыми полями и загрузкой файлов.
              </p>
              <ul className="text-gray-600 space-y-1">
                <li>• Создание новых постов через API</li>
                <li>• Загрузка файлов</li>
                <li>• Валидация формы</li>
                <li>• Обработка состояний загрузки</li>
              </ul>
            </Card>
          </div>

          <PostsList onCreatePost={() => setIsModalOpen(true)} />
        </div>
      </main>

      <CreatePostModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  )
}
