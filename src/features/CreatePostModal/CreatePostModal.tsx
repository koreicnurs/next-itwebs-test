'use client'

import { useState } from 'react'
import { Modal } from '../../shared/ui/Modal/Modal'
import { Button } from '../../shared/ui/Button/Button'
import { Input } from '../../shared/ui/Input/Input'
import { Alert } from '../../shared/ui/Alert/Alert'
import { LoadingSpinner } from '../../shared/ui/LoadingSpinner/LoadingSpinner'
import { useCreatePostMutation } from '../../shared/api/postsApi'
import { CheckCircle } from 'lucide-react'

interface CreatePostModalProps {
  isOpen: boolean
  onClose: () => void
  onPostCreated?: () => void
}

export function CreatePostModal({ isOpen, onClose, onPostCreated }: CreatePostModalProps) {
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
      const result = await createPost({
        title: title.trim(),
        body: body.trim(),
        userId: 1,
      }).unwrap()

      setSuccess(true)
      
      // Вызываем callback для обновления списка постов
      if (onPostCreated) {
        onPostCreated()
      }
      
      setTimeout(() => {
        setTitle('')
        setBody('')
        setFile(null)
        setSuccess(false)
        onClose()
      }, 2000)
    } catch (error: any) {
      console.error('Ошибка при создании поста:', error)
      
      let errorMessage = 'Произошла ошибка при создании поста. Попробуйте еще раз.'
      
      if (error?.data?.message) {
        errorMessage = error.data.message
      } else if (error?.message) {
        errorMessage = error.message
      } else if (error?.status) {
        errorMessage = `Ошибка сервера: ${error.status}`
      }
      
      setError(errorMessage)
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
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {error && (
          <div style={{
            padding: '1rem',
            backgroundColor: '#fef2f2',
            border: '1px solid #fecaca',
            borderRadius: '0.75rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}>
            <div style={{
              width: '8px',
              height: '8px',
              backgroundColor: '#ef4444',
              borderRadius: '50%'
            }}></div>
            <span style={{ color: '#dc2626', fontWeight: '500' }}>{error}</span>
          </div>
        )}
        
        {success && (
          <div style={{
            padding: '1rem',
            backgroundColor: '#f0fdf4',
            border: '1px solid #bbf7d0',
            borderRadius: '0.75rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}>
            <div style={{
              width: '8px',
              height: '8px',
              backgroundColor: '#22c55e',
              borderRadius: '50%'
            }}></div>
            <span style={{ color: '#16a34a', fontWeight: '500' }}>Пост успешно создан!</span>
          </div>
        )}
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{
            fontSize: '0.875rem',
            fontWeight: '600',
            color: '#374151',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <div style={{
              width: '6px',
              height: '6px',
              backgroundColor: '#3b82f6',
              borderRadius: '50%'
            }}></div>
            Заголовок поста
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Введите заголовок поста..."
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              borderRadius: '0.75rem',
              border: '1px solid #d1d5db',
              backgroundColor: 'white',
              color: '#111827',
              fontSize: '0.875rem',
              outline: 'none',
              transition: 'all 0.2s ease'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#3b82f6'
              e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)'
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#d1d5db'
              e.target.style.boxShadow = 'none'
            }}
            required
            disabled={isLoading || success}
          />
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{
            fontSize: '0.875rem',
            fontWeight: '600',
            color: '#374151',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <div style={{
              width: '6px',
              height: '6px',
              backgroundColor: '#8b5cf6',
              borderRadius: '50%'
            }}></div>
            Содержание поста
          </label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Введите содержание поста..."
            style={{
              width: '100%',
              minHeight: '120px',
              padding: '0.75rem 1rem',
              borderRadius: '0.75rem',
              border: '1px solid #d1d5db',
              backgroundColor: 'white',
              color: '#111827',
              fontSize: '0.875rem',
              outline: 'none',
              resize: 'none',
              fontFamily: 'inherit',
              transition: 'all 0.2s ease'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#8b5cf6'
              e.target.style.boxShadow = '0 0 0 3px rgba(139, 92, 246, 0.1)'
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#d1d5db'
              e.target.style.boxShadow = 'none'
            }}
            required
            disabled={isLoading || success}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{
            fontSize: '0.875rem',
            fontWeight: '600',
            color: '#374151',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <div style={{
              width: '6px',
              height: '6px',
              backgroundColor: '#10b981',
              borderRadius: '50%'
            }}></div>
            Файл (опционально)
          </label>
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*,.pdf,.doc,.docx"
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              borderRadius: '0.75rem',
              border: '1px solid #d1d5db',
              backgroundColor: 'white',
              color: '#111827',
              fontSize: '0.875rem',
              outline: 'none',
              transition: 'all 0.2s ease'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#10b981'
              e.target.style.boxShadow = '0 0 0 3px rgba(16, 185, 129, 0.1)'
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#d1d5db'
              e.target.style.boxShadow = 'none'
            }}
            disabled={isLoading || success}
          />
        </div>

        {file && (
          <div style={{
            padding: '1rem',
            backgroundColor: '#f0f9ff',
            border: '1px solid #bae6fd',
            borderRadius: '0.75rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}>
            <div style={{
              width: '8px',
              height: '8px',
              backgroundColor: '#0ea5e9',
              borderRadius: '50%'
            }}></div>
            <div>
              <p style={{
                fontSize: '0.875rem',
                fontWeight: '500',
                color: '#0c4a6e',
                margin: 0
              }}>
                <strong>Выбранный файл:</strong> {file.name}
              </p>
              <p style={{
                fontSize: '0.75rem',
                color: '#0369a1',
                margin: 0
              }}>
                Размер: {(file.size / 1024).toFixed(1)} KB
              </p>
            </div>
          </div>
        )}

        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '1rem',
          paddingTop: '1.5rem',
          borderTop: '1px solid #e5e7eb'
        }}>
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: '0.75rem',
              border: '1px solid #d1d5db',
              backgroundColor: 'white',
              color: '#374151',
              fontSize: '0.875rem',
              fontWeight: '500',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              opacity: isLoading ? 0.5 : 1,
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => {
              if (!isLoading) {
                e.currentTarget.style.backgroundColor = '#f9fafb'
                e.currentTarget.style.borderColor = '#9ca3af'
              }
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'white'
              e.currentTarget.style.borderColor = '#d1d5db'
            }}
          >
            Отмена
          </button>
          <button
            type="submit"
            disabled={isLoading || !title.trim() || !body.trim() || success}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: '0.75rem',
              border: 'none',
              background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
              color: 'white',
              fontSize: '0.875rem',
              fontWeight: '500',
              cursor: (isLoading || !title.trim() || !body.trim() || success) ? 'not-allowed' : 'pointer',
              opacity: (isLoading || !title.trim() || !body.trim() || success) ? 0.5 : 1,
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
            onMouseOver={(e) => {
              if (!isLoading && title.trim() && body.trim() && !success) {
                e.currentTarget.style.background = 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)'
                e.currentTarget.style.transform = 'scale(1.02)'
              }
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)'
              e.currentTarget.style.transform = 'scale(1)'
            }}
          >
            {isLoading ? (
              <>
                <LoadingSpinner size="sm" className="mr-2" />
                Создание...
              </>
            ) : success ? (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                Создан!
              </>
            ) : (
              'Создать пост'
            )}
          </button>
        </div>
      </form>
    </Modal>
  )
}
