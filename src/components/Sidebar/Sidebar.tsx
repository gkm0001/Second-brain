import { memo } from "react";

import { SidebarItems } from "../SidebarItem/SidebarItems";
import { useNavigate } from "react-router-dom";

import useContentStore from "../../store/contentStore";
import { BrainIcon, FacebookIcon, HomeIcon, Linkedin, Logout, PencilIcon, Twitter } from "../../icons/Icon";



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
               {/* <SidebarItems text="Text" icon={<PencilIcon/>} onClick={()=>setFilterType("text")}/> */}
            </div>
         </div>

         {/* Bottom Section: Logout Button */}
         <div className="mb-3">
            <SidebarItems text="Logout" icon={<Logout/>} onClick={logout} />
         </div>
      </div>
   );
});
