// src/store/contentStore.ts
import { create } from 'zustand'
import axios from 'axios'

// Define types for content
interface Content {
  id: string
  title: string
  link: string
  type: "twitter" | "youtube"
}

interface ContentState {
  contents: Content[]
  loading: boolean
  error: string | null

  fetchContents: () => Promise<Content[]>
  addContent: (title: string, link: string, type: "twitter" | "youtube") => Promise<boolean>
  shareBrain: () => Promise<string | null>
}

const useContentStore = create<ContentState>((set, get) => ({
  contents: [],
  loading: false,
  error: null,

  // Fetch all content
  fetchContents: async () => {
    set({ loading: true, error: null })

    try {
      const token = localStorage.getItem("token")
      const response = await axios.get<{ content: Content[] }>(
        `${import.meta.env.VITE_BACKEND_URL}api/v1/content/allcontent`,
        {
          headers: { Authorization: token || "" },
        }
      )

      set({ contents: response.data.content, loading: false })
      return response.data.content
    } catch (error) {
      console.error("Error fetching content:", error)
      set({ error: "Failed to load content", loading: false })
      return []
    }
  },

  // Add new content
  addContent: async (title, link, type) => {
    set({ loading: true, error: null })

    try {
      const token = localStorage.getItem("token")
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}api/v1/content/uploadContent`,
        { title, link, type },
        {
          headers: { Authorization: token || "" },
        }
      )

      await get().fetchContents() // Refresh contents
      return true
    } catch (error) {
      console.error("Error adding content:", error)
      set({ error: "Failed to add content", loading: false })
      return false
    }
  },

  // Share brain functionality
  shareBrain: async () => {
    set({ loading: true, error: null })

    try {
      const token = localStorage.getItem("token")
      const response = await axios.post<{ hash: string }>(
        `${import.meta.env.VITE_BACKEND_URL}api/v1/brain/share/`,
        { share: true },
        {
          headers: { Authorization: token || "" },
        }
      )

      set({ loading: false })
      return `http://localhost:5173/${response.data.hash}`
    } catch (error) {
      console.error("Error sharing brain:", error)
      set({ error: "Failed to share brain", loading: false })
      return null
    }
  }
}))

export default useContentStore
