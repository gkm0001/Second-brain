import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

import axios from "axios"
import { Link, useNavigate } from "react-router-dom"

export  function SignUp() {
  const usernameRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const navigate = useNavigate();

  async function handleSignUp() {
    setLoading(true)
    try {
      const username = usernameRef.current?.value
      const password = passwordRef.current?.value

      console.log("Signup attempt", { username, password })

      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}` + "api/v1/user/signup", {
        email: username,
        password,
      })

      const jwt = response.data.token
      localStorage.setItem("token", jwt)
      navigate("/signin")
    } catch (error) {
      console.error("Signup failed:", error)
      alert("Signup failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-black to-zinc-900 p-4">
      <Card className="w-full max-w-md border border-zinc-800 bg-zinc-900/80 backdrop-blur-sm text-white shadow-xl">
        <CardHeader className="space-y-3">
          <div className="mx-auto h-12 w-12 rounded-full bg-white flex items-center justify-center">
            <span className="text-black text-xl font-bold">A</span>
          </div>
          <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
          <CardDescription className="text-zinc-400 text-center">
            Enter your details to create your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Input
              ref={usernameRef}
              type="email"
              placeholder="Email"
              className="border-zinc-700 bg-zinc-800 text-white placeholder:text-zinc-500 focus-visible:ring-zinc-500"
            />
          </div>
          <div className="space-y-2">
            <Input
              ref={passwordRef}
              type="password"
              placeholder="Password"
              className="border-zinc-700 bg-zinc-800 text-white placeholder:text-zinc-500 focus-visible:ring-zinc-500"
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-3">
          <Button
            onClick={handleSignUp}
            className="w-full bg-white text-black hover:bg-zinc-200 transition-all duration-200 font-medium"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating account...
              </>
            ) : (
              "Sign Up"
            )}
          </Button>
          <div className="text-center text-sm text-zinc-400">
            Already have an account?{" "}
            <Link to="/signin" className="text-white underline underline-offset-4 hover:text-zinc-300">
              Sign In
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

