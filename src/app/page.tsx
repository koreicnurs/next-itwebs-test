import { Navigation } from '../widgets/Navigation/Navigation'
import { Card } from '../shared/ui/Card/Card'

export default function Home() {
  const currentTime = new Date().toLocaleString('ru-RU')

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Главная страница (SSR)
            </h1>
            <p className="text-lg text-gray-600">
              Эта страница рендерится на сервере (Server Side Rendering)
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card title="SSR - Server Side Rendering">
              <p className="text-gray-600 mb-4">
                Страница рендерится на сервере при каждом запросе. 
                Это обеспечивает актуальные данные, но может быть медленнее.
              </p>
              <div className="text-sm text-gray-500">
                Время рендеринга: {currentTime}
              </div>
            </Card>

            <Card title="Преимущества SSR">
              <ul className="text-gray-600 space-y-2">
                <li>• SEO-оптимизация</li>
                <li>• Быстрая загрузка для пользователя</li>
                <li>• Актуальные данные</li>
                <li>• Работает без JavaScript</li>
              </ul>
            </Card>

            <Card title="Технологии">
              <ul className="text-gray-600 space-y-2">
                <li>• Next.js 14</li>
                <li>• React 18</li>
                <li>• TypeScript</li>
                <li>• Tailwind CSS</li>
                <li>• FSD Architecture</li>
              </ul>
            </Card>
          </div>

          <div className="mt-8">
            <Card title="Навигация по приложению">
              <p className="text-gray-600 mb-4">
                Используйте навигацию выше для перехода между страницами с разными типами рендеринга:
              </p>
              <ul className="text-gray-600 space-y-2">
                <li>• <strong>Посты (SSG)</strong> - Static Site Generation</li>
                <li>• <strong>Пользователи (ISR)</strong> - Incremental Static Regeneration</li>
                <li>• <strong>Модальное окно (CSR)</strong> - Client Side Rendering</li>
              </ul>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}