export interface Post {
  id: number
  title: string
  body: string
  userId: number
}

export interface CreatePostRequest {
  title: string
  body: string
  userId: number
}

export interface User {
  id: number
  name: string
  email: string
  phone: string
  website: string
  company: {
    name: string
  }
  address: {
    street: string
    suite: string
    city: string
    zipcode: string
  }
}

