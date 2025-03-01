import { useRef, useState } from "react";
import { Button } from "../components/Button/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Input } from "../components/Input/Input";

export function Signup() {
  const [loading, setLoading] = useState(false);
  
  const userNameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleClick = async () => {
    setLoading(true);
    try {
      const username = userNameRef.current?.value;
      const password = passwordRef.current?.value;

      console.log("Signup attempt", { username, password });
      console.log(import.meta.env.VITE_BACKEND_URL);
      
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "api/v1/user/signup",
        { email: username, password }
      );

      const jwt = response.data.token;
      localStorage.setItem("token", jwt);
      navigate("/login");
    } catch (error) {
      console.error("Signup failed:", error);
      alert("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
      <div className="bg-white rounded-xl border min-w-48 p-8">
        <Input placeholder="Username" refe={userNameRef} />
        <Input placeholder="Password"  refe={passwordRef} />
        <div className="flex flex-col gap-3 justify-center pt-4">
          <Button onClick={handleClick} variant="primary" text="Signup" fullWidth={true} loading={loading} size="md" />
          <Button onClick={() => navigate("/login")} variant="secondary" text="Login" fullWidth={true} size="md" />
        </div>
      </div>
    </div>
  );
}
