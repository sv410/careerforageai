"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Eye, EyeOff, Mail, Lock, User, Chrome, ArrowLeft } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

export default function AuthPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [loginData, setLoginData] = useState({ email: "", password: "" })
  const [signupData, setSignupData] = useState({ name: "", email: "", password: "" })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const { login, signup, loginWithGoogle } = useAuth()
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      await login(loginData.email, loginData.password)
      router.push("/dashboard")
    } catch (err) {
      setError("Invalid email or password")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      await signup(signupData.email, signupData.password, signupData.name)
      router.push("/dashboard")
    } catch (err) {
      setError("Signup failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    setError("")

    try {
      await loginWithGoogle()
      router.push("/dashboard")
    } catch (err) {
      setError("Google login failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#7F7FD5] via-[#86A8E7] to-[#91EAE4] dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900 flex items-center justify-center p-4">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl" />
        <div className="absolute top-40 right-20 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
        <div className="absolute bottom-40 left-1/4 w-24 h-24 bg-white/10 rounded-full blur-xl" />
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-white/5 rounded-full blur-xl" />
      </div>

      {/* Header */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-white hover:text-white/80 transition-colors">
          <ArrowLeft className="w-5 h-5" />
          <span className="font-semibold">Back to Home</span>
        </Link>
        <ThemeToggle />
      </div>

      {/* Auth Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-white/20 shadow-2xl">
          <CardHeader className="text-center pb-2">
            <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                CareerForge AI
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400 mt-2">
                Your AI-powered career companion
              </CardDescription>
            </motion.div>
          </CardHeader>

          <CardContent className="pt-2">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              {/* Login Tab */}
              <TabsContent value="login" className="space-y-4">
                <motion.form
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleLogin}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="Enter your email"
                        className="pl-10"
                        value={loginData.email}
                        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="pl-10 pr-10"
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </Button>
                    </div>
                  </div>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm text-center"
                    >
                      {error}
                    </motion.div>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-2.5"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </motion.form>
              </TabsContent>

              {/* Signup Tab */}
              <TabsContent value="signup" className="space-y-4">
                <motion.form
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleSignup}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="signup-name"
                        type="text"
                        placeholder="Enter your full name"
                        className="pl-10"
                        value={signupData.name}
                        onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="Enter your email"
                        className="pl-10"
                        value={signupData.email}
                        onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="signup-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        className="pl-10 pr-10"
                        value={signupData.password}
                        onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </Button>
                    </div>
                  </div>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm text-center"
                    >
                      {error}
                    </motion.div>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-2.5"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating account..." : "Create Account"}
                  </Button>
                </motion.form>
              </TabsContent>
            </Tabs>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300 dark:border-gray-600" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-gray-900 px-2 text-gray-500">Or continue with</span>
              </div>
            </div>

            {/* Google Login */}
            <Button
              type="button"
              variant="outline"
              className="w-full border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 bg-transparent"
              onClick={handleGoogleLogin}
              disabled={isLoading}
            >
              <Chrome className="mr-2 h-4 w-4" />
              {isLoading ? "Connecting..." : "Continue with Google"}
            </Button>

            {/* Terms */}
            <p className="text-xs text-center text-gray-500 mt-6">
              By continuing, you agree to our{" "}
              <a href="#" className="underline hover:text-gray-700">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="underline hover:text-gray-700">
                Privacy Policy
              </a>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
