"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { X, Upload, FileText, CheckCircle, AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"

interface FileUploadProps {
  onClose: () => void
}

export function FileUpload({ onClose }: FileUploadProps) {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<"idle" | "success" | "error">("idle")
  const router = useRouter()

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      setUploadedFile(file)
      handleUpload(file)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
    },
    maxFiles: 1,
  })

  const handleUpload = async (file: File) => {
    setIsUploading(true)
    setUploadStatus("idle")

    // Simulate upload process
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setUploadStatus("success")

      // Redirect to dashboard after successful upload
      setTimeout(() => {
        router.push("/dashboard")
        onClose()
      }, 1500)
    } catch (error) {
      setUploadStatus("error")
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-md"
        >
          <Card className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Upload Resume</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {!uploadedFile ? (
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                    isDragActive
                      ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
                      : "border-gray-300 dark:border-gray-600 hover:border-purple-400"
                  }`}
                >
                  <input {...getInputProps()} />
                  <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-lg font-medium mb-2">
                    {isDragActive ? "Drop your resume here" : "Upload your resume"}
                  </p>
                  <p className="text-sm text-gray-500 mb-4">Drag and drop or click to select</p>
                  <p className="text-xs text-gray-400">Supports PDF, DOC, and DOCX files</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <FileText className="w-8 h-8 text-purple-600" />
                    <div className="flex-1">
                      <p className="font-medium">{uploadedFile.name}</p>
                      <p className="text-sm text-gray-500">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                    {uploadStatus === "success" && <CheckCircle className="w-6 h-6 text-green-500" />}
                    {uploadStatus === "error" && <AlertCircle className="w-6 h-6 text-red-500" />}
                  </div>

                  {isUploading && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Analyzing resume...</span>
                        <span>Processing</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <motion.div
                          className="bg-purple-600 h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 2 }}
                        />
                      </div>
                    </div>
                  )}

                  {uploadStatus === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center space-y-2"
                    >
                      <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
                      <p className="text-green-600 font-medium">Upload successful!</p>
                      <p className="text-sm text-gray-500">Redirecting to dashboard...</p>
                    </motion.div>
                  )}

                  {uploadStatus === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center space-y-2"
                    >
                      <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
                      <p className="text-red-600 font-medium">Upload failed</p>
                      <Button
                        onClick={() => {
                          setUploadedFile(null)
                          setUploadStatus("idle")
                        }}
                        variant="outline"
                        size="sm"
                      >
                        Try Again
                      </Button>
                    </motion.div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
