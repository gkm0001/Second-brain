import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import axios from "axios";

// Define types for content
interface Content {
  id: string;
  title: string;
  link: string;
  type: "twitter" | "youtube" | "linkedin";
}

interface ContentState {
  filterData:()=>void;
  contents: Content[];
  filterContents: Content[];
  filterType: "twitter" | "youtube" | "linkedin" | null;
  loading: boolean;
  error: string | null;

  fetchContents: () => Promise<Content[]>;
  addContent: (title: string, link: string, type: "twitter" | "youtube" | "linkedin") => Promise<boolean>;
  updateContent: (id: string, title: string, link: string, type: "twitter" | "youtube") => Promise<boolean>;
  setFilterType: (type: "twitter" | "youtube" | "linkedin" | null) => void;
  shareBrain: () => Promise<string | null>;
}

const useContentStore = create<ContentState>()(
 
    (set, get) => ({
      contents: [],
      filterContents: [],
      filterType: null,
      loading: false,
      error: null,

      // Set filter type and update filtered contents
      setFilterType: (type) => {
        set({ filterType: type });
        get().filterData();
      },

      // Filter content based on type
      filterData: () => {
        const { contents, filterType } = get();
        set({
          filterContents: filterType
            ? contents.filter((item) => item.type === filterType)
            : contents,
        });
      },

      // Fetch all content
      fetchContents: async () => {
        set({ loading: true, error: null });

        try {
          const token = localStorage.getItem("token");
          if (!token) throw new Error("No authentication token found");

          const response = await axios.get<{ content: Content[] }>(
            `${import.meta.env.VITE_BACKEND_URL}api/v1/content/allcontent`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          set({ contents: response.data.content, loading: false });
          get().filterData(); // Update filtered content after fetching
          return response.data.content;
        } catch (error) {
          console.error("Error fetching content:", error);
          set({ error: "Failed to load content", loading: false });
          return [];
        }
      },

      // Add new content
      addContent: async (title, link, type) => {
        set({ loading: true, error: null });

        try {
          const token = localStorage.getItem("token");
          if (!token) throw new Error("No authentication token found");

            // // Optimistically update state first
            // set({ contents: [...get().contents, newContent] });
            // get().filterData(); // ✅ Update filtered data locally

          await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}api/v1/content/uploadContent`,
            { title, link, type },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          return true;
        } catch (error) {
          console.error("Error adding content:", error);
          set({ error: "Failed to add content", loading: false });
          return false;
        }
      },

      // Update content
      updateContent: async (id, title, link, type) => {
        set({ loading: true, error: null });

        try {
          const token = localStorage.getItem("token");
          if (!token) throw new Error("No authentication token found");

          await axios.put(
            `${import.meta.env.VITE_BACKEND_URL}api/v1/content/update/${id}`,
            { title, link, type },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

           await get().filterData(); // Refresh contents
          return true;
        } catch (error) {
          console.error("Error updating content:", error);
          set({ error: "Failed to update content", loading: false });
          return false;
        }
      },

      // Share brain functionality
      shareBrain: async () => {
        set({ loading: true, error: null });

        try {
          const token = localStorage.getItem("token");
          if (!token) throw new Error("No authentication token found");

          const response = await axios.post<{ hash: string }>(
            `${import.meta.env.VITE_BACKEND_URL}api/v1/brain/share/`,
            { share: true },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          set({ loading: false });
          return `http://localhost:5173/${response.data.hash}`;
        } catch (error) {
          console.error("Error sharing brain:", error);
          set({ error: "Failed to share brain", loading: false });
          return null;
        }
      },
    }),
  
  
);

export default useContentStore;
