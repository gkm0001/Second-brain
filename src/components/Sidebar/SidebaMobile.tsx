import { Home, Twitter, Youtube, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom";
import useContentStore from "@/store/contentStore";

export  function SidebarMobile() {
  const navigate = useNavigate();
  const { setFilterType } = useContentStore();

  const logout = () => {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("storage")); // Notify all tabs
    navigate("/");    
 };

  return (
    <div className="flex flex-col h-full bg-black text-white">
      <div className="p-4 border-b border-zinc-800">
        <a href="/" className="flex items-center gap-2 text-xl font-bold">
          <div className="bg-white text-black p-1.5 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
            </svg>
          </div>
          Brainly
        </a>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        <button  className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-zinc-800" onClick={()=>setFilterType(null)}>
          <Home className="h-5 w-5" />
          <span className="font-medium">Home</span>
        </button>

        <button  className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-zinc-800" onClick={()=>setFilterType("twitter")}>
          <Twitter className="h-5 w-5" />
          <span className="font-medium">Twitter</span>
        </button>

        <button className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-zinc-800" onClick={()=>setFilterType("youtube")}>
          <Youtube className="h-5 w-5" />
          <span className="font-medium">Youtube</span>
        </button>

        <button className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-zinc-800" onClick={()=>setFilterType("linkedin")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
          >
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
            <rect x="2" y="9" width="4" height="12"></rect>
            <circle cx="4" cy="4" r="2"></circle>
          </svg>
          <span className="font-medium">Linkedin</span>
        </button>
      </nav>

      <div className="p-4 border-t border-zinc-800">
        <Button variant="ghost" className="w-full justify-start text-white hover:bg-zinc-800 cursor-pointer" onClick={logout}>
          <LogOut className="h-5 w-5 mr-3 cursor-pointer" />
          Logout
        </Button>
      </div>
    </div>
  )
}

