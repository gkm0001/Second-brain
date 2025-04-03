import type React from "react"
import { useRef, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  X,
  Loader2,
  Youtube,
  Twitter,
  Linkedin,
  ImageIcon,
  FileText,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import useContentStore from "@/store/contentStore"

interface ModalProps {
  open?: boolean
  onClose?: () => void
}

enum ContentType {
  Youtube = "youtube",
  Twitter = "twitter",
  Linkedin = "linkedin",
  Image = "image",
  Other = "other",
}

interface ContentTypeOption {
  value: ContentType
  label: string
  icon: React.ReactNode
}

export function CreateContentModal({ open, onClose }: ModalProps) {
  const titleRef = useRef<HTMLInputElement>(null)
  const linkRef = useRef<HTMLInputElement>(null)
  const textRef = useRef<HTMLTextAreaElement>(null)
  const [type, setType] = useState<ContentType>(ContentType.Other)
 
  const { addContent, loading } = useContentStore()

  // Focus the title input when modal opens
  useEffect(() => {
    if (open && titleRef.current) {
      setTimeout(() => {
        titleRef.current?.focus()
      }, 100)
    }
  }, [open])

  // Simulate an API call to add content

  const handleSubmit = async () => {
    const title = titleRef.current?.value
    const link = linkRef.current?.value || ""
    const text = textRef.current?.value || ""

    if (!title) {
      alert("Title is required")
      return
    }

    const success = await addContent(title, link, text, type)

    if (success) {
      alert("Content uploaded successfully!")
      // Clear inputs
      if (titleRef.current) titleRef.current.value = ""
      if (linkRef.current) linkRef.current.value = ""
      if (textRef.current) textRef.current.value = ""
      // Close modal
      if (onClose) onClose()
    }
  }

  // Options for content types
  const contentTypes: ContentTypeOption[] = [
    { value: ContentType.Youtube, label: "YouTube", icon: <Youtube size={16} /> },
    { value: ContentType.Twitter, label: "Twitter", icon: <Twitter size={16} /> },
    { value: ContentType.Linkedin, label: "LinkedIn", icon: <Linkedin size={16} /> },
    { value: ContentType.Image, label: "Image", icon: <ImageIcon size={16} /> },
    { value: ContentType.Other, label: "Other", icon: <FileText size={16} /> },
  ]

  if (!open) return null

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Content */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-xl shadow-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-800">
                <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
                  Create Content
                </h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="h-8 w-8 rounded-full text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                >
                  <X size={18} />
                  <span className="sr-only">Close</span>
                </Button>
              </div>

              {/* Modal Body */}
              <div className="p-4 space-y-4">
                {/* Title Input */}
                <div className="space-y-2">
                  <label
                    htmlFor="title"
                    className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
                  >
                    Title <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="title"
                    ref={titleRef}
                    placeholder="Enter title"
                    className="border-zinc-300 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                  />
                </div>

                {/* Link Input */}
                <div className="space-y-2">
                  <label
                    htmlFor="link"
                    className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
                  >
                    Link (optional)
                  </label>
                  <Input
                    id="link"
                    ref={linkRef}
                    placeholder="https://"
                    className="border-zinc-300 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                  />
                </div>

                {/* Textarea */}
                <div className="space-y-2">
                  <label
                    htmlFor="text"
                    className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
                  >
                    Text (optional)
                  </label>
                  <Textarea
                    id="text"
                    ref={textRef}
                    placeholder="Enter description or content"
                    className="min-h-[100px] border-zinc-300 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white resize-none"
                  />
                </div>

                {/* Content Type Buttons */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Content Type
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {contentTypes.map((contentType) => (
                      <Button
                        key={contentType.value}
                        type="button"
                        variant={
                          type === contentType.value ? "default" : "outline"
                        }
                        className={cn(
                          "h-10 px-3 justify-start gap-2 transition-all duration-200",
                          type === contentType.value
                            ? "bg-black text-white hover:bg-zinc-800"
                            : "hover:bg-zinc-100 dark:hover:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300"
                        )}
                        onClick={() => setType(contentType.value)}
                      >
                        {contentType.icon}
                        <span className="text-sm">{contentType.label}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 flex justify-end">
                <Button
                  variant="default"
                  className="bg-black text-white hover:bg-zinc-800 transition-all duration-200"
                  disabled={loading}
                  onClick={handleSubmit}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit"
                  )}
                </Button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
