import { useRef, useState } from "react";
import { Button } from "../components/Button/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Input } from "../components/Input/Input";


export function Signin() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();


  async function handleClick() {
    setLoading(true);
    try {
      const username = usernameRef.current?.value ;
      const password = passwordRef.current?.value ;
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "api/v1/user/login",
        {
          email: username,
          password,
        }
      );
      const jwt = response.data.token;
      localStorage.setItem("token", jwt);
      navigate("/");
    } catch (error) {
      console.error("Signin failed:", error);
      alert("Signin failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
      <div className="bg-white rounded-xl border min-w-48 p-8">
        <Input placeholder="Username" refe={usernameRef} />
        <Input placeholder="Password" refe={passwordRef} />
        <div className="flex flex-col gap-3 justify-center pt-4">
          <Button
            variant="primary"
            text="Signin"
            fullWidth={true}
            loading={loading}
            onClick={handleClick}
            size="md"
          />
          <Button
            variant="secondary"
            text="Signup"
            fullWidth={true}
            onClick={() => navigate("/signup")}
            size="md"
          />
        </div>
      </div>
    </div>
  );
}
