import { memo } from "react";
import { BrainIcon } from "../../icons/Brain";
import { FacebookIcon } from "../../icons/Facebook";
import { Twitter } from "../../icons/Twitter";
import { SidebarItems } from "../SidebarItem/SidebarItems";
import { useNavigate } from "react-router-dom";
import { Logout } from "../../icons/Logout";
import useContentStore from "../../store/contentStore";
import { HomeIcon } from "../../icons/Home";
import { Linkedin } from "../../icons/Linkedin";


export const Sidebar = memo(() => {
   const navigate = useNavigate();
   const { setFilterType } = useContentStore();
   
   const logout = () => {
      localStorage.removeItem("token");
      window.dispatchEvent(new Event("storage")); // Notify all tabs
      navigate("/");    
   };

   return (
      <div className="h-screen bg-white border-r w-72 fixed left-0 pl-6 flex flex-col justify-between">
         {/* Top Section: Sidebar Header and Navigation Items */}
         <div>
            <div className="flex text-2xl pt-4 items-center">
               <div className="pr-4 text-purple-700">
                  <BrainIcon />  
               </div>
               Brainly
            </div>

            <div className="pt-4 pl-4">
               <SidebarItems text="Home" icon={<HomeIcon/>} onClick={()=>setFilterType(null)}/>
               <SidebarItems text="Twitter" icon={<Twitter />} onClick={()=>setFilterType("twitter")}/>
               <SidebarItems text="Youtube" icon={<FacebookIcon />} onClick={()=> setFilterType("youtube")}/>
               <SidebarItems text = "Linkedin" icon={<Linkedin/>} onClick={()=>setFilterType("linkedin")}/>
            </div>
         </div>

         {/* Bottom Section: Logout Button */}
         <div className="mb-3">
            <SidebarItems text="Logout" icon={<Logout/>} onClick={logout} />
         </div>
      </div>
   );
});
