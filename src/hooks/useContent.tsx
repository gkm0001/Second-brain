import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../config";
import axios from "axios";

 export function useContent(){
     const [contents , setContents] = useState([]);

     function refersh(){
          axios.get(`${BACKEND_URL}/api/v1/content`, {
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