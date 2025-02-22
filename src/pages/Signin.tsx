import { useRef } from "react";
import { Input } from "../components/CreateContentModal";
import { Button } from "../components/ui/Button";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signin(){
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    async function signup(){
         const username = usernameRef.current?.value;
         const password = passwordRef.current?.value;

         const response = await axios.post(BACKEND_URL + "/api/v1/signin",{
             username , 
             password
         })
         const jwt = response.data.token;
         localStorage.setItem("token",jwt);
         navigate('/dashboard')
    }

     return <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
        <div className="bg-white rounded-xl border min-w-48 p-8">
            <Input placeholder="Username"  refe={usernameRef}/>
            <Input placeholder="Password" refe={passwordRef}/>
            <div className="flex justify-center pt-4">
                <Button variant="primary" text="Signin" fullWidth= {true} loading = {true} onClick={signup}/>
            </div>

        </div>
     </div>
}