import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Signin } from './pages/Signin'
import { Signup } from './pages/Signup'
import ProtectedRoute from './Auth/ProtectedRoute'
import Dashboard from './pages/Dashboard'

function App() {

  return (
      <>
      <BrowserRouter>
            <Routes>
              {/* Public Routes */}
                <Route path='/signup' element={<Signup/>}/>
                <Route path='/login' element={<Signin/>}/>

                {/* Private Routes */}
              <Route element={<ProtectedRoute/>}>
                <Route path='/' element={<Dashboard/>}/>
                <Route path='/share/:shareId' element={<Dashboard/>}/>
              </Route>
            </Routes>
         
        </BrowserRouter>     
      </>
  )
}

export default App
