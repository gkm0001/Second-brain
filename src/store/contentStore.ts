import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import axios from "axios";

type ContentType = "twitter" | "youtube" | "linkedin" | "image" | "other";

interface Content {
  _id: string;
  title: string;
  link ?: string;
  text ?:string;
  type ?: ContentType;
}

interface ContentState {
  filterData: () => void;
  contents: Content[];
  filterContents: Content[];
  filterType :ContentType | null;
  loading: boolean;
  error: string | null;
  
  fetchContents: () => Promise<Content[]>;
  addContent: (title: string, link ?: string ,text ?: string  ,  type ?: Content["type"]) => Promise<boolean>;
  updateContent: (id: string, title: string, link ?: string ,text ?: string ,  type ?: Content["type"]) => Promise<boolean>;
  deleteContent : (contentId : string) => Promise<boolean>;
  setFilterType: (type: Content["type"] | null) => void;
  shareBrain: () => Promise<string | null>;
}

const useContentStore = create<ContentState>()(
  persist(
    (set, get) => ({
      contents: [],
      filterContents: [],
      filterType: null,
      loading: false,
      error: null,

      setFilterType: (type) => {
        set({ filterType: type });
        get().filterData();
      },

      filterData: () => {
        const { contents, filterType } = get();
        set({
          filterContents: filterType ? contents.filter((item) => item.type === filterType) : contents,
        });
      },

      fetchContents: async () => {
        set({ loading: true, error: null });
       console.log("how much time");
       
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
          get().filterData();
          return response.data.content;
        } catch (error) {
          console.error("Error fetching content:", error);
          set({ error: "Failed to load content", loading: false });
          return [];
        }
      },

      addContent: async (title, link , text , type) => {
        set({ loading: true, error: null });
        console.log("how much time");
        try {
          const token = localStorage.getItem("token");
          if (!token) throw new Error("No authentication token found");

         await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}api/v1/content/uploadContent`,
            { title, link,text,  type },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
           await get().fetchContents(); // Refresh contents
          set({ loading: false });  
          
          return true;
        } catch (error) {
          console.error("Error adding content:", error);
          set({ error: "Failed to add content", loading: false });
          return false;
        }
      },
      deleteContent : async(contentId) => {
         set({loading : true , error : null});

         try {
          const token = localStorage.getItem("token");
          if (!token) throw new Error("No authentication token found");

          await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}api/v1/content/delete`,
             {contentId},
             {
               headers : { Authorization : `Bearer ${token}`},
             }
          )
          await get().fetchContents(); // Refresh contents
          set({ loading: false });  
          return true;
         } catch(error){
          console.error("Error adding content:", error);
          set({ error: "Failed to add content", loading: false });
          return false;
         }
      },

      updateContent: async (id, title, link, text, type) => {
        set({ loading: true, error: null });
        console.log("how much time");
        try {
          const token = localStorage.getItem("token");
          if (!token) throw new Error("No authentication token found");

          await axios.put(
            `${import.meta.env.VITE_BACKEND_URL}api/v1/content/update/${id}`,
            { title, link,text, type },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          await get().filterData();
          return true;
        } catch (error) {
          console.error("Error updating content:", error);
          set({ error: "Failed to update content", loading: false });
          return false;
        }
      },

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
    {
      name: "content-storage", // Key for localStorage
      storage: createJSONStorage(() => localStorage), // Use localStorage
      partialize: (state) => ({
        contents: state.contents,
        filterType: state.filterType,
      }), // Persist only specific fields
    }
  )
);

export default useContentStore;
