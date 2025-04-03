import { useState } from "react"
import { Send, Share2, Menu, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Sidebar } from "@/components/Sidebar/Sidebar"
import { SidebarMobile } from "@/components/Sidebar/SidebaMobile"
import { CreateContentModal } from "../components/Modal/CreateContentModal"
import Cards from "./Cards"
import useContentStore from "../store/contentStore"
import axios from "axios"

interface Message {
  role: "user" | "bot"
  text: string
}

function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false)
  const { filterType } = useContentStore()
  const [chatMessages, setChatMessages] = useState<Message[]>([])
  const [inputText, setInputText] = useState("")
  const isDesktop = useMediaQuery("(min-width: 768px)")

  // const handleShare = async () => {
  //   const url = await shareBrain()
  //   if (url) {
  //     console.log("Share URL:", url)
  //   }
  // }

  const sendMessage = async () => {
    if (!inputText.trim()) return

    try {
      const token = localStorage.getItem("token")
      if (!token) throw new Error("No authentication token found")

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}api/v1/content/search`,
        { text: inputText },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      setChatMessages([
        ...chatMessages,
        { role: "user", text: inputText },
        { role: "bot", text: response.data.message }
      ])
      setInputText("")
    } catch (error) {
      console.error("Error sending message:", error)
    }
  }

  return (
    <div className="flex min-h-screen bg-white">
      {isDesktop ? (
        <div className="hidden md:block">
          <Sidebar />
        </div>
      ) : (
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden absolute top-4 left-4 z-10">
              <Menu className="h-5 w-5 text-black" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-72">
            <SidebarMobile />
          </SheetContent>
        </Sheet>
      )}

      <main className="flex-1 p-4 md:p-8 md:ml-64">
        <CreateContentModal open={modalOpen} onClose={() => setModalOpen(false)} />

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-black">Brainly</h1>
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2 border-black text-black hover:bg-zinc-100">
              <Share2 className="h-4 w-4" /> Share Brain
            </Button>
            <Button className="gap-2 bg-black hover:bg-zinc-800 text-white" onClick={() => setModalOpen(true)}>
              <Plus className="h-4 w-4" /> Add Content
            </Button>
          </div>
        </div>

        {filterType == null && (
          <form onSubmit={(e) => { e.preventDefault(); sendMessage(); }} className="mb-6 md:mb-8">
            <div className="relative">
              <Input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type your question..."
                className="pr-12 py-5 md:py-6 text-base rounded-full shadow-sm border-zinc-200 bg-white focus-visible:ring-black"
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-black hover:bg-zinc-800 rounded-full w-9 h-9"
              >
                <Send className="h-4 w-4"/>
              </Button>
            </div>
          </form>
        )}

        <div className="space-y-3 md:space-y-4">
          {chatMessages.map((msg, index) => (
            <Card key={index} className="p-3 shadow-sm rounded-xl border border-zinc-100">
              <div className={`p-3 max-w-md rounded-lg shadow-md ${msg.role === "user" ? "bg-black text-white self-end" : "bg-gray-200"}`}>
                <strong>{msg.role === "user" ? "You" : "ChatGPT"}:</strong> {msg.text}
              </div>
            </Card>
          ))}
        </div>

        <div className="">
          <Cards />
        </div>
      </main>
    </div>
  )
}

export default Dashboard
