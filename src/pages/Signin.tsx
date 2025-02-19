import { Input } from "../components/CreateContentModal";
import { Button } from "../components/ui/Button";

export function Signup(){
     return <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
        <div className="bg-white rounded-xl border min-w-48 p-8">
            <Input placeholder="Username" onChange={()=>{}}/>
            <Input placeholder="Password" onChange={()=>{}}/>
            <div className="flex justify-center pt-4">
                <Button variant="primary" text="Signin" fullWidth= {true} loading = {true}/>
            </div>

        </div>
     </div>
}