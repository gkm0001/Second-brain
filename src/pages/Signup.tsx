import { useRef } from "react";
import { Input } from "../components/CreateContentModal";
import { Button } from "../components/ui/Button";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signup(){

    const userNameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate= useNavigate();

    const handleClick = async() => {
         const username = userNameRef.current?.value;
         const password = passwordRef.current?.value;

        // const response =  await axios.post(BACKEND_URL + "api/v1/signup",{  
        //          username,
        //          password  
        //  })

        //  const jwt =response.data.token;
        //  localStorage.setItem("token",jwt);
        //  navigate('/signin')
    }
     return <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
        <div className="bg-white rounded-xl border min-w-48 p-8">
            <Input placeholder="Username"  refe = {userNameRef}/>
            <Input placeholder="Password" refe={passwordRef}/>
            <div className="flex justify-center pt-4">
                <Button onClick={handleClick}  variant="primary" text="Signup" fullWidth= {true} loading = {true}/>
            </div>

        </div>
     </div>
}