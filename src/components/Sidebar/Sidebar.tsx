import { memo } from "react";
import { BrainIcon } from "../../icons/Brain";
import { FacebookIcon } from "../../icons/Facebook";
import { Twitter } from "../../icons/Twitter";
import { SidebarItems } from "../SidebarItem/SidebarItems";
import { useNavigate } from "react-router-dom";

/**
 * Sidebar Component
 * 
 * This component renders a fixed sidebar that includes a logo, navigation links,
 * and a logout button. It uses React.memo for performance optimization.
 *
 * @component
 * @returns {JSX.Element} The Sidebar component
 */
export const Sidebar = memo(() => {
   const navigate = useNavigate();
 
   /**
    * Logs out the user by removing the authentication token from local storage,
    * dispatching a storage event to notify all open tabs, and navigating to the home page.
    */
   const logout = () => {
      localStorage.removeItem("token");
      window.dispatchEvent(new Event("storage")); // Notify all tabs
      navigate("/");    
   };

   return (
      <div className="h-screen bg-white border-r w-72 fixed left-0 pl-6">
         {/* Sidebar Header with Logo and Title */}
         <div className="flex text-2xl pt-4 items-center">
            <div className="pr-4 text-purple-700">
               <BrainIcon/>  
            </div>
            Brainly
         </div>
         
         {/* Sidebar Navigation Items */}
         <div className="pt-4 pl-4">
            <SidebarItems text="Twitter" icon={<Twitter/>}/>
            <SidebarItems text="Facebook" icon={<FacebookIcon/>}/>
         </div>
         
         {/* Logout Button */}
         <div>
            <SidebarItems text="Logout" icon={<Twitter/>} onClick={logout}/>
         </div>
      </div>
   );
});