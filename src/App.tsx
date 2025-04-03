import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import ProtectedRoute from './Auth/ProtectedRoute'
import Dashboard from './pages/Dashboard'
import { SignUp } from './pages/Signup'
import { SignIn } from './pages/Signin'

function App() {

  return (
      <>
      <BrowserRouter>
            <Routes>
              {/* Public Routes */}
                <Route path='/signup' element={<SignUp/>}/>
                <Route path='/login' element={<SignIn/>}/>

                {/* Private Routes */}
              <Route element={<ProtectedRoute/>}>
                <Route path='/' element={<Dashboard/>}/>
              </Route>
            </Routes>
         
        </BrowserRouter>     
      </>
  )
}

export default App
