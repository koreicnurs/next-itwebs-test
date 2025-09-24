'use client'

import { useGetPostsQuery } from '../../shared/api/postsApi'
import { Card } from '../../shared/ui/Card/Card'
import { Button } from '../../shared/ui/Button/Button'
import { Alert } from '../../shared/ui/Alert/Alert'
import { Plus, RefreshCw } from 'lucide-react'

interface PostsListProps {
  onCreatePost: () => void
}

export function PostsList({ onCreatePost }: PostsListProps) {
  const { data: posts, error, isLoading, refetch } = useGetPostsQuery()

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Посты</h2>
          <Button onClick={onCreatePost}>
            <Plus className="w-4 h-4 mr-2" />
            Создать пост
          </Button>
        </div>
        <div className="grid gap-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-full mb-1"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Посты</h2>
          <Button onClick={onCreatePost}>
            <Plus className="w-4 h-4 mr-2" />
            Создать пост
          </Button>
        </div>
        <Alert variant="error">
          <div className="flex items-center justify-between">
            <span>Ошибка при загрузке постов</span>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => refetch()}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Повторить
            </Button>
          </div>
        </Alert>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Посты</h2>
        <div className="flex space-x-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => refetch()}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Обновить
          </Button>
          <Button onClick={onCreatePost}>
            <Plus className="w-4 h-4 mr-2" />
            Создать пост
          </Button>
        </div>
      </div>
      
      <div className="grid gap-4">
        {posts?.slice(0, 10).map((post) => (
          <Card key={post.id} className="hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
              {post.title}
            </h3>
            <p className="text-gray-600 mb-3 line-clamp-3">{post.body}</p>
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>ID пользователя: {post.userId}</span>
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                ID: {post.id}
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
