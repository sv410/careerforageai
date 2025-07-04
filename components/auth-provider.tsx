"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

interface User {
  id: string
  email: string
  name: string
  avatar?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, name: string) => Promise<void>
  loginWithGoogle: () => Promise<void>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem("careerforge_user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockUser = {
        id: "1",
        email,
        name: email.split("@")[0],
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      }

      setUser(mockUser)
      localStorage.setItem("careerforge_user", JSON.stringify(mockUser))
    } catch (error) {
      throw new Error("Invalid credentials")
    } finally {
      setLoading(false)
    }
  }

  const signup = async (email: string, password: string, name: string) => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockUser = {
        id: "1",
        email,
        name,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      }

      setUser(mockUser)
      localStorage.setItem("careerforge_user", JSON.stringify(mockUser))
    } catch (error) {
      throw new Error("Signup failed")
    } finally {
      setLoading(false)
    }
  }

  const loginWithGoogle = async () => {
    setLoading(true)
    try {
      // Simulate Google OAuth
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const mockUser = {
        id: "google_1",
        email: "user@gmail.com",
        name: "Google User",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=google",
      }

      setUser(mockUser)
      localStorage.setItem("careerforge_user", JSON.stringify(mockUser))
    } catch (error) {
      throw new Error("Google login failed")
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("careerforge_user")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        loginWithGoogle,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
