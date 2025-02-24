import { useRef, useState } from "react";

import { Button } from "../components/Button/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Input } from "../components/Input/Input";

export function Signin(){
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [ loading , setloading] = useState<boolean>(false)
    const navigate = useNavigate();

    async function handleClick(){
        setloading(true)
        try{
            const username = usernameRef.current?.value;
            const password = passwordRef.current?.value;
            const response = await axios.post(import.meta.env.VITE_BACKEND_URL + "api/v1/user/login",{
               email :  username , 
                password
            })
            const jwt = response.data.token;
            localStorage.setItem("token",jwt);
            navigate('/dashboard')
        }catch (error) {
            console.error("Signup failed:", error);
            alert("Signup failed. Please try again.");
          } finally {
              setloading(false);
          }
       
    }

     return <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
        <div className="bg-white rounded-xl border min-w-48 p-8">
            <Input placeholder="Username"  ref={usernameRef}/>
            <Input placeholder="Password" ref={passwordRef}/>
            <div className="flex justify-center pt-4">
                <Button variant="primary" text="Signin" fullWidth= {true} loading = {loading} onClick={handleClick}  size = "md"/>
            </div>
        </div>
     </div>
}