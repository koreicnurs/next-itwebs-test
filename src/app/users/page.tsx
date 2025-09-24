import { Navigation } from '../../widgets/Navigation/Navigation'
import { Card } from '../../shared/ui/Card/Card'
import type { User } from '../../shared/api/types'

async function getUsers(): Promise<User[]> {
  const res = await fetch('https://jsonplaceholder.typicode.com/users', {
    next: { revalidate: 60 }
  })
  
  if (!res.ok) {
    throw new Error('Failed to fetch users')
  }
  
  return res.json()
}

export default async function UsersPage() {
  const users = await getUsers()
  const buildTime = new Date().toLocaleString('ru-RU')

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Пользователи (ISR)
            </h1>
            <p className="text-lg text-gray-600">
              Эта страница использует Incremental Static Regeneration
            </p>
            <div className="text-sm text-gray-500 mt-2">
              Время последнего обновления: {buildTime}
            </div>
          </div>

          <div className="mb-8">
            <Card title="ISR - Incremental Static Regeneration">
              <p className="text-gray-600 mb-4">
                Страница генерируется статически, но может быть пересоздана в фоне 
                при необходимости. Это сочетает преимущества SSG с актуальностью данных.
              </p>
              <ul className="text-gray-600 space-y-1">
                <li>• Быстрая загрузка как у SSG</li>
                <li>• Автоматическое обновление данных</li>
                <li>• Настраиваемый интервал обновления</li>
                <li>• Фоновое пересоздание страниц</li>
              </ul>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {users.map((user: User) => (
              <Card key={user.id}>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {user.name}
                </h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Телефон:</strong> {user.phone}</p>
                  <p><strong>Веб-сайт:</strong> {user.website}</p>
                  <p><strong>Компания:</strong> {user.company.name}</p>
                </div>
                <div className="mt-4 p-3 bg-gray-50 rounded-md">
                  <p className="text-sm font-medium text-gray-700 mb-1">Адрес:</p>
                  <p className="text-sm text-gray-600">
                    {user.address.street}, {user.address.suite}<br />
                    {user.address.city}, {user.address.zipcode}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
