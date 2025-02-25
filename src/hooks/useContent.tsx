import { useEffect, useState } from "react";
import axios from "axios";

 export function useContent(){
     const [contents , setContents] = useState([]);

     async function refersh(){
         await axios.get(`${import.meta.env.VITE_BACKEND_URL}api/v1/content/allcontent`, {
               headers : {
                    "Authorization":localStorage.getItem("token")
               }
              }).then((res)=>{
                    setContents(res.data.content)
                })
     }

     useEffect(()=>{
        refersh()
        let interval = setInterval(()=>{
           refersh()
        },10*1000)
       

        return() => {
           clearInterval(interval)
        }
     },[])
     return { contents,refersh}
}