import { type MouseEventHandler } from "react"
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./ui/Button";

interface modalProps {
     open ?: boolean;
     onClose ?: MouseEventHandler;
}

export function CreateContentModal({open , onClose} : modalProps){
    
    return <div>
         {open && <div className="w-full h-screen bg-slate-200 fixed top-0 left-0 opacity-60 flex justify-center">
            <div className="flex items-center justify-center ">
              <span className="bg-white opacity-100 p-4 rounded">
                   <div className="flex justify-end cursor-pointer" onClick={onClose} >
                         <CrossIcon size="md"/>
                   </div> 
                   <div>
                       <Input placeholder="Title" onChange={()=>{}}/>
                       <Input placeholder="Link" onChange={()=>{}}/>
                    </div>  
                    <div className="flex justify-center">
                       <Button variant = "primary" text="Submit" size="md"  />       
                    </div>

              </span>
            </div>
             
        </div>
        }
    </div>
}


export function Input({onChange,placeholder} : {onChange : () => void , placeholder : string}) {
     return <div>
        <input placeholder={placeholder} type={"text"} className="px-4 py-2 border rounded m-3" onChange={onChange}></input>
     </div>
}