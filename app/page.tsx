"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Upload, Brain, TrendingUp, Target, Zap, LogOut, Settings, User } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { FileUpload } from "@/components/file-upload"
import { useAuth } from "@/components/auth-provider"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const AnimatedText = ({ text, className }: { text: string; className?: string }) => {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, 100)
      return () => clearTimeout(timeout)
    }
  }, [currentIndex, text])

  return (
    <span className={className}>
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
        className="inline-block w-0.5 h-8 bg-current ml-1"
      />
    </span>
  )
}

export default function HomePage() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const [showUpload, setShowUpload] = useState(false)
  const { user, logout } = useAuth()

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "Advanced machine learning algorithms analyze your resume and career trajectory",
    },
    {
      icon: TrendingUp,
      title: "Career Predictions",
      description: "Get personalized career path recommendations based on your skills and experience",
    },
    {
      icon: Target,
      title: "Skill Gap Analysis",
      description: "Identify missing skills and get actionable recommendations for career growth",
    },
  ]

  const stats = [
    { number: "50K+", label: "Resumes Analyzed" },
    { number: "95%", label: "Accuracy Rate" },
    { number: "1000+", label: "Career Paths" },
    { number: "24/7", label: "AI Support" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#7F7FD5] via-[#86A8E7] to-[#91EAE4] dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/10 dark:bg-black/10 backdrop-blur-md border-b border-white/20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold text-white"
          >
            CareerForge AI
          </motion.div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                      <AvatarFallback className="bg-white/20 text-white">
                        {user.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link href="/dashboard">
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      Dashboard
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/auth">
                <Button variant="outline" className="bg-white/20 border-white/30 text-white hover:bg-white/30">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-20">
        <motion.div style={{ y }} className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-20 h-20 bg-white/20 rounded-full blur-xl" />
          <div className="absolute top-40 right-20 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute bottom-40 left-1/4 w-24 h-24 bg-white/15 rounded-full blur-xl" />
        </motion.div>

        <div className="text-center max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <Badge className="mb-4 bg-white/20 text-white border-white/30 hover:bg-white/30">
              <Zap className="w-4 h-4 mr-2" />
              Powered by Advanced AI
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-['Poppins']">CareerForge AI</h1>
            <div className="text-2xl md:text-4xl font-semibold text-white/90 mb-8 h-16 flex items-center justify-center">
              <AnimatedText text="Predict. Grow. Succeed." />
            </div>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
              Transform your career with AI-powered insights. Upload your resume and discover your perfect career path
              with personalized recommendations.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              size="lg"
              onClick={() => setShowUpload(true)}
              className="bg-white text-purple-600 hover:bg-white/90 px-8 py-6 text-lg font-semibold rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <Upload className="w-5 h-5 mr-2" />
              Upload Resume
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Link href="/dashboard">
              <Button
                variant="outline"
                size="lg"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-purple-600 px-8 py-6 text-lg font-semibold rounded-full transition-all duration-300"
              >
                View Dashboard
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-white/80 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Why Choose CareerForge AI?</h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Our cutting-edge AI technology provides unparalleled insights into your career potential
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="group"
              >
                <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-300 h-full">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-white/30 transition-colors duration-300">
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                    <p className="text-white/80 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Transform Your Career?</h2>
            <p className="text-xl text-white/80 mb-8">
              Join thousands of professionals who have discovered their perfect career path with CareerForge AI
            </p>
            <Button
              size="lg"
              onClick={() => setShowUpload(true)}
              className="bg-white text-purple-600 hover:bg-white/90 px-12 py-6 text-xl font-semibold rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              Get Started Now
              <ArrowRight className="w-6 h-6 ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* File Upload Modal */}
      {showUpload && <FileUpload onClose={() => setShowUpload(false)} />}
    </div>
  )
}
