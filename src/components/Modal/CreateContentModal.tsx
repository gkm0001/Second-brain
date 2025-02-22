import { useRef, useState, type MouseEventHandler } from "react"
import { CrossIcon } from "../../icons/CrossIcon";
import { Button } from "../Button/Button";
import axios from "axios";
import { BACKEND_URL } from "../../../config";

interface modalProps {
     open ?: boolean;
     onClose ?: MouseEventHandler;
}

enum ContentType {
    Youtube = "youtube",
    Twitter = "twitter"
}
export function CreateContentModal({open , onClose} : modalProps){
   const titleRef = useRef<HTMLInputElement>(null);
   const linkRef = useRef<HTMLInputElement>(null);
   const [type , setType]  = useState(ContentType.Youtube)


   const addContent = async() => {
       const title = titleRef.current?.value;
       const link = linkRef.current?.value;
          const [type , setType] = useState(ContentType.Youtube);

          await axios.post(`${BACKEND_URL}/api/v1/content`,{
             link,
             title,
             type
          },{
             headers : {
                "Authorization":localStorage.getItem("token")
             }
          })
          onClose;
   }
    
    return <div>
         {open && 
           <div>          
             <div className="w-full h-screen bg-slate-200 fixed top-0 left-0 opacity-60 flex justify-center">     
             </div>
             <div className="w-full h-screen  fixed top-0 left-0 flex justify-center">
             <div className="flex items-center justify-center">
              <span className="bg-white opacity-100 p-4 rounded fixed">
                   <div className="flex justify-end cursor-pointer" onClick={onClose} >
                         <CrossIcon size="md"/>
                   </div> 
                   <div>
                       <Input placeholder="Title" refe = {titleRef}/>
                       <Input placeholder="Link" refe={linkRef}/>
                    </div>  
                    <div>
                     <h1>Type</h1>
                     <div className="flex">
                     <Button text = "Youtube"
                     variant={type === ContentType.Youtube ? "primary": "secondary"}
                     onClick={()=>{setType(ContentType.Youtube)}} 
                     size = "md"
                     >
                     </Button>
                     <Button text = "Twitter"
                     variant={type === ContentType.Twitter ? "primary": "secondary"}
                     onClick={()=>{setType(ContentType.Twitter)}}
                     size = "md" 
                     >
                     </Button>
                     </div>
                    </div>
                    <div className="flex justify-center">
                       <Button variant = "primary" text="Submit" size="md" onClick={addContent} />       
                    </div>

              </span>
            </div>
             
             </div>
        </div>
          
        }

    </div>
}



export function Input({placeholder,refe} : {refe? : any, placeholder : string}) {
     return <div>
        <input placeholder={placeholder} type={"text"} className="px-4 py-2 border rounded m-3"  ref = {refe}></input>
     </div>
}