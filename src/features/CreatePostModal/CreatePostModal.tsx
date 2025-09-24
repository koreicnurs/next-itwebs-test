'use client'

import { useState } from 'react'
import { Modal } from '../../shared/ui/Modal/Modal'
import { Button } from '../../shared/ui/Button/Button'
import { Input } from '../../shared/ui/Input/Input'
import { Alert } from '../../shared/ui/Alert/Alert'
import { LoadingSpinner } from '../../shared/ui/LoadingSpinner/LoadingSpinner'
import { useCreatePostMutation } from '../../shared/api/postsApi'

interface CreatePostModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CreatePostModal({ isOpen, onClose }: CreatePostModalProps) {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [createPost, { isLoading }] = useCreatePostMutation()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess(false)
    
    if (!title.trim() || !body.trim()) {
      setError('Пожалуйста, заполните все обязательные поля')
      return
    }

    try {
      await createPost({
        title: title.trim(),
        body: body.trim(),
        userId: 1,
      }).unwrap()

      setSuccess(true)
      
      setTimeout(() => {
        setTitle('')
        setBody('')
        setFile(null)
        setSuccess(false)
        onClose()
      }, 2000)
    } catch (error) {
      console.error('Ошибка при создании поста:', error)
      setError('Произошла ошибка при создании поста. Попробуйте еще раз.')
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Создать новый пост">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <Alert variant="error">{error}</Alert>}
        {success && <Alert variant="success">Пост успешно создан!</Alert>}
        
        <Input
          label="Заголовок"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Введите заголовок поста"
          required
          disabled={isLoading || success}
        />
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Содержание
          </label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Введите содержание поста"
            className="flex min-h-[100px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            required
            disabled={isLoading || success}
          />
        </div>

        <Input
          label="Файл (опционально)"
          type="file"
          onChange={handleFileChange}
          accept="image/*,.pdf,.doc,.docx"
          disabled={isLoading || success}
        />

        {file && (
          <div className="text-sm text-gray-600 bg-gray-50 p-2 rounded-md">
            <strong>Выбранный файл:</strong> {file.name} ({(file.size / 1024).toFixed(1)} KB)
          </div>
        )}

        <div className="flex justify-end space-x-3 pt-4">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            disabled={isLoading}
          >
            Отмена
          </Button>
          <Button
            type="submit"
            disabled={isLoading || !title.trim() || !body.trim() || success}
          >
            {isLoading ? (
              <>
                <LoadingSpinner size="sm" className="mr-2" />
                Создание...
              </>
            ) : success ? (
              'Создан!'
            ) : (
              'Создать пост'
            )}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
