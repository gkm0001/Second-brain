import { BrainIcon } from "../../icons/Brain";
import { FacebookIcon } from "../../icons/Facebook";
import { Twitter } from "../../icons/Twitter";
import { SidebarItems } from "./SidebarItems";

export function Sidebar(){
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

    </div>
}