
import { Home, Twitter, Youtube, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom";
import useContentStore from "@/store/contentStore";

export  function Sidebar() {
    const navigate = useNavigate();
    const { setFilterType } = useContentStore();

    const logout = () => {
        localStorage.removeItem("token");
        window.dispatchEvent(new Event("storage")); // Notify all tabs
        navigate("/");    
     };

  return (
    <div className="w-64 border-r border-zinc-100 bg-white flex flex-col h-full fixed left-0 top-0">
      <div className="p-4 border-b border-zinc-100">
        <a href="/" className="flex items-center gap-2 text-xl font-bold text-black">
          <div className="bg-black text-white p-1.5 rounded-full">
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
        <button onClick={()=>setFilterType(null)} className="flex items-center gap-3 px-3 py-2 text-zinc-800 rounded-lg hover:bg-zinc-50">
          <Home className="h-5 w-5" />
          <span>Home</span>
        </button>

        <button onClick={()=>setFilterType("twitter")} className="flex items-center gap-3 px-3 py-2 text-zinc-800 rounded-lg hover:bg-zinc-50">
          <Twitter className="h-5 w-5" />
          <span>Twitter</span>
        </button>

        <button  onClick={()=>setFilterType("youtube")} className="flex items-center gap-3 px-3 py-2 text-zinc-800 rounded-lg hover:bg-zinc-50">
          <Youtube className="h-5 w-5" />
          <span>Youtube</span>
        </button>

        <button onClick={()=>setFilterType("linkedin")} className="flex items-center gap-3 px-3 py-2 text-zinc-800 rounded-lg hover:bg-zinc-50">
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
          <span>Linkedin</span>
        </button>
      </nav>

      <div className="p-4 border-t border-zinc-100">
        <Button variant="ghost" className="w-full justify-start text-zinc-800 hover:bg-zinc-50 cursor-pointer" onClick={logout}>
          <LogOut className="h-5 w-5 mr-3 cursor-pointer"/>
          Logout
        </Button>
      </div>
    </div>
  )
}

