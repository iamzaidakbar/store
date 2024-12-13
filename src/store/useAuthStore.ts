import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User } from '@prisma/client'

interface AuthState {
  user: User | null
  isLoading: boolean
  setUser: (user: User | null) => void
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  register: (email: string, password: string, name: string) => Promise<void>
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      setUser: (user) => set({ user }),
      login: async (email, password) => {
        set({ isLoading: true })
        try {
          const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
          })
          const data = await response.json()
          if (!response.ok) throw new Error(data.error)
          set({ user: data.user })
        } finally {
          set({ isLoading: false })
        }
      },
      logout: async () => {
        await fetch('/api/auth/logout', { method: 'POST' })
        set({ user: null })
      },
      register: async (email, password, name) => {
        set({ isLoading: true })
        try {
          const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, name }),
          })
          const data = await response.json()
          if (!response.ok) throw new Error(data.error)
          set({ user: data.user })
        } finally {
          set({ isLoading: false })
        }
      },
    }),
    { name: 'auth-storage' }
  )
) 