import { Navigation } from '../../widgets/Navigation/Navigation'
import { Card } from '../../shared/ui/Card/Card'
import type { Post } from '../../shared/api/types'

async function getPosts(): Promise<Post[]> {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10', {
    next: { revalidate: 3600 }
  })
  
  if (!res.ok) {
    throw new Error('Failed to fetch posts')
  }
  
  return res.json()
}

export default async function PostsPage() {
  const posts = await getPosts()
  const buildTime = new Date().toLocaleString('ru-RU')

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Посты (SSG)
            </h1>
            <p className="text-lg text-gray-600">
              Эта страница генерируется статически во время сборки (Static Site Generation)
            </p>
            <div className="text-sm text-gray-500 mt-2">
              Время сборки: {buildTime}
            </div>
          </div>

          <div className="mb-8">
            <Card title="SSG - Static Site Generation">
              <p className="text-gray-600 mb-4">
                Страница генерируется во время сборки и кэшируется. 
                Это обеспечивает максимальную производительность, но данные могут быть устаревшими.
              </p>
              <ul className="text-gray-600 space-y-1">
                <li>• Максимальная производительность</li>
                <li>• Отлично подходит для контента, который редко изменяется</li>
                <li>• Можно использовать с ISR для обновления данных</li>
              </ul>
            </Card>
          </div>

          <div className="grid gap-6">
            {posts.map((post: Post) => (
              <Card key={post.id}>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4">{post.body}</p>
                <div className="text-sm text-gray-500">
                  ID пользователя: {post.userId} | ID поста: {post.id}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
