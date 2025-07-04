"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Brain,
  TrendingUp,
  Target,
  FileText,
  Star,
  ArrowRight,
  RefreshCw,
  Lightbulb,
  Award,
  Briefcase,
  LogOut,
  Settings,
} from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"
import { ProtectedRoute } from "@/components/protected-route"
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

export default function Dashboard() {
  const { user, logout } = useAuth()
  const [resumeScore] = useState(85)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const careerSuggestions = [
    {
      title: "Senior Data Scientist",
      match: 92,
      description: "Perfect fit based on your ML and Python expertise",
      skills: ["Python", "TensorFlow", "Data Analysis", "NLP"],
      growth: "+15%",
    },
    {
      title: "AI/ML Engineer",
      match: 88,
      description: "Strong alignment with your deep learning background",
      skills: ["Deep Learning", "TensorFlow", "Python", "Research"],
      growth: "+22%",
    },
    {
      title: "Full Stack Developer",
      match: 82,
      description: "Great match for your web development skills",
      skills: ["React", "Python", "SQL", "Web Development"],
      growth: "+12%",
    },
  ]

  const skillGaps = [
    { skill: "AWS/Cloud Platforms", importance: "High", progress: 20 },
    { skill: "Docker/Kubernetes", importance: "Medium", progress: 35 },
    { skill: "Advanced Statistics", importance: "High", progress: 60 },
    { skill: "MLOps", importance: "Medium", progress: 25 },
  ]

  const recentActivity = [
    { action: "Resume analyzed", time: "2 hours ago", icon: FileText },
    { action: "Career suggestions updated", time: "1 day ago", icon: TrendingUp },
    { action: "Skill assessment completed", time: "3 days ago", icon: Target },
    { action: "Profile optimized", time: "1 week ago", icon: Star },
  ]

  const handleReanalyze = () => {
    setIsAnalyzing(true)
    setTimeout(() => setIsAnalyzing(false), 3000)
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-[#7F7FD5] via-[#86A8E7] to-[#91EAE4] dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900">
        {/* Navigation */}
        <nav className="bg-white/10 dark:bg-black/10 backdrop-blur-md border-b border-white/20">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-white">
              CareerForge AI
            </Link>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Button
                onClick={handleReanalyze}
                disabled={isAnalyzing}
                className="bg-white/20 border-white/30 text-white hover:bg-white/30"
              >
                {isAnalyzing ? (
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <RefreshCw className="w-4 h-4 mr-2" />
                )}
                Re-analyze
              </Button>
              {user && (
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
              )}
            </div>
          </div>
        </nav>

        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Welcome back, {user?.name}!</h1>
            <p className="text-white/80 text-lg">Your personalized AI-powered career insights</p>
          </motion.div>

          {/* Main Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-white/80">Resume Score</CardTitle>
                  <Brain className="h-4 w-4 text-white/60" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white mb-2">{resumeScore}/100</div>
                  <Progress value={resumeScore} className="mb-2" />
                  <p className="text-xs text-white/60">
                    <span className="text-green-400">+5 points</span> from last analysis
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-white/80">Career Matches</CardTitle>
                  <TrendingUp className="h-4 w-4 text-white/60" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white mb-2">3</div>
                  <p className="text-xs text-white/60">Top career suggestions available</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-white/80">Skill Gaps</CardTitle>
                  <Target className="h-4 w-4 text-white/60" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white mb-2">4</div>
                  <p className="text-xs text-white/60">Skills to focus on improving</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Career Suggestions */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Briefcase className="w-5 h-5" />
                    AI Career Suggestions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {careerSuggestions.map((career, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-300"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-white">{career.title}</h3>
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                          {career.match}% match
                        </Badge>
                      </div>
                      <p className="text-white/70 text-sm mb-3">{career.description}</p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {career.skills.map((skill, skillIndex) => (
                          <Badge key={skillIndex} variant="outline" className="text-white/60 border-white/30">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-white/60">
                          Growth: <span className="text-green-400">{career.growth}</span>
                        </span>
                        <Button size="sm" variant="ghost" className="text-white/80 hover:text-white">
                          Learn More <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Skill Gap Analysis */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Skill Gap Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {skillGaps.map((skill, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-white font-medium">{skill.skill}</span>
                        <Badge
                          variant={skill.importance === "High" ? "destructive" : "secondary"}
                          className={
                            skill.importance === "High"
                              ? "bg-red-500/20 text-red-400 border-red-500/30"
                              : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                          }
                        >
                          {skill.importance}
                        </Badge>
                      </div>
                      <Progress value={skill.progress} className="h-2" />
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white/60">{skill.progress}% proficiency</span>
                        <Button size="sm" variant="ghost" className="text-white/80 hover:text-white p-0 h-auto">
                          <Lightbulb className="w-4 h-4 mr-1" />
                          Get Resources
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-8"
          >
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      className="flex items-center gap-3 p-3 bg-white/5 rounded-lg"
                    >
                      <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                        <activity.icon className="w-4 h-4 text-white/60" />
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium">{activity.action}</p>
                        <p className="text-white/60 text-sm">{activity.time}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
