import { Navigation } from '../../widgets/Navigation/Navigation'
import { Card } from '../../shared/ui/Card/Card'
import type { User } from '../../shared/api/types'
import { Users, RefreshCw, Globe, Mail, Phone, Building, MapPin } from 'lucide-react'

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
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-100 dark:from-violet-900 dark:via-purple-900 dark:to-fuchsia-900">
      <Navigation />
      
      <main className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-violet-500 to-purple-600 rounded-full mb-6 animate-float">
              <Users className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-gray-800 dark:text-white mb-4">
              Пользователи
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-2">
              Incremental Static Regeneration (ISR)
            </p>
            <p className="text-lg text-gray-500 dark:text-gray-400">
              Эта страница использует инкрементальную статическую регенерацию
            </p>
            <div className="mt-4 inline-flex items-center px-4 py-2 bg-white/50 dark:bg-gray-800/50 rounded-full text-sm text-gray-600 dark:text-gray-300">
              <RefreshCw className="h-4 w-4 mr-2" />
              Время последнего обновления: {buildTime}
            </div>
          </div>

          <div className="mb-12">
            <Card variant="glass" className="border-0">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-gradient-to-r from-violet-500 to-purple-600 rounded-lg mr-4">
                  <RefreshCw className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">ISR - Incremental Static Regeneration</h3>
              </div>
              <p className="text-gray-600 dark:text-black-400 mb-6 text-lg">
                Страница генерируется статически, но может быть пересоздана в фоне 
                при необходимости. Это сочетает преимущества SSG с актуальностью данных.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 bg-gradient-to-br from-violet-50 to-violet-100 dark:from-violet-900/20 dark:to-violet-800/20 rounded-lg border border-violet-200 dark:border-violet-700">
                  <div className="flex items-center mb-2">
                    <Globe className="h-5 w-5 text-violet-600 dark:text-violet-400 mr-2" />
                    <span className="font-semibold text-violet-800 dark:text-violet-200">Быстрая загрузка</span>
                  </div>
                  <p className="text-sm text-violet-700 dark:text-violet-600">Как у SSG</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg border border-purple-200 dark:border-purple-700">
                  <div className="flex items-center mb-2">
                    <RefreshCw className="h-5 w-5 text-purple-600 dark:text-purple-400 mr-2" />
                    <span className="font-semibold text-purple-800 dark:text-purple-200">Автообновление</span>
                  </div>
                  <p className="text-sm text-purple-700 dark:text-purple-600">Данных в фоне</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-fuchsia-50 to-fuchsia-100 dark:from-fuchsia-900/20 dark:to-fuchsia-800/20 rounded-lg border border-fuchsia-200 dark:border-fuchsia-700">
                  <div className="flex items-center mb-2">
                    <Building className="h-5 w-5 text-fuchsia-600 dark:text-fuchsia-400 mr-2" />
                    <span className="font-semibold text-fuchsia-800 dark:text-fuchsia-200">Настраиваемый</span>
                  </div>
                  <p className="text-sm text-fuchsia-700 dark:text-fuchsia-600">Интервал обновления</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20 rounded-lg border border-pink-200 dark:border-pink-700">
                  <div className="flex items-center mb-2">
                    <Users className="h-5 w-5 text-pink-600 dark:text-pink-400 mr-2" />
                    <span className="font-semibold text-pink-800 dark:text-pink-200">Фоновое</span>
                  </div>
                  <p className="text-sm text-pink-700 dark:text-pink-600">Пересоздание страниц</p>
                </div>
              </div>
            </Card>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {users.map((user: User) => (
              <Card 
                key={user.id} 
                className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                variant="gradient"
              >
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-violet-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                    {user.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                      {user.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Пользователь #{user.id}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center p-3 bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 rounded-lg">
                    <Mail className="h-5 w-5 text-violet-600 dark:text-violet-400 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{user.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center p-3 bg-gradient-to-r from-purple-50 to-fuchsia-50 dark:from-purple-900/20 dark:to-fuchsia-900/20 rounded-lg">
                    <Phone className="h-5 w-5 text-purple-600 dark:text-purple-400 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Телефон</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{user.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-center p-3 bg-gradient-to-r from-fuchsia-50 to-pink-50 dark:from-fuchsia-900/20 dark:to-pink-900/20 rounded-lg">
                    <Globe className="h-5 w-5 text-fuchsia-600 dark:text-fuchsia-400 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Веб-сайт</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{user.website}</p>
                    </div>
                  </div>

                  <div className="flex items-center p-3 bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 rounded-lg">
                    <Building className="h-5 w-5 text-pink-600 dark:text-pink-400 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Компания</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{user.company.name}</p>
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                    <div className="flex items-center mb-2">
                      <MapPin className="h-4 w-4 text-gray-600 dark:text-gray-400 mr-2" />
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Адрес</p>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {user.address.street}, {user.address.suite}<br />
                      {user.address.city}, {user.address.zipcode}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <span>ISR обновлен</span>
                    <span>{Math.floor(Math.random() * 24) + 1}ч назад</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
