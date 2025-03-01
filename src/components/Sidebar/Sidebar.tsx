import { memo } from "react";
import { BrainIcon } from "../../icons/Brain";
import { FacebookIcon } from "../../icons/Facebook";
import { Twitter } from "../../icons/Twitter";
import { SidebarItems } from "../SidebarItem/SidebarItems";
import { useNavigate } from "react-router-dom";

export const Sidebar = memo(() => {
   const navigate = useNavigate();
 
   const logout = () => {
      localStorage.removeItem("token")
      window.dispatchEvent(new Event("storage")); // Notify all tabs
      navigate("/")    
   }

    return <div className="h-screen bg-white border-r w-72 fixed left-0 pl-6">
         <div className="flex text-2xl pt-4 items-center">
            <div className="pr-4 text-purple-700">
            <BrainIcon/>  
            </div>
                      
            Brainly
            
         </div>
          <div className="pt-4 pl-4">
            <SidebarItems text="Twitter" icon={<Twitter/>}/>
            <SidebarItems text = "Facebook" icon={<FacebookIcon/>}/>
          </div>
          <div className="">
            <SidebarItems text="Logout" icon={<Twitter/>} onClick = {logout}/>
          </div>

    </div>
});