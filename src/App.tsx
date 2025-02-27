import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Dashboard from './pages/Dashboard'
import { Signin } from './pages/Signin'
import { Signup } from './pages/Signup'
import ProtectedRoute from './Auth/ProtectedRoute'
import { RecoilRoot } from 'recoil'

function App() {
 

  return (
      <>
       <RecoilRoot>
      <BrowserRouter>
          
            <Routes>
              {/* Public Routes */}
                <Route path='/signup' element={<Signup/>}/>
                <Route path='/login' element={<Signin/>}/>

                {/* Private Routes */}
              <Route element={<ProtectedRoute/>}>
                <Route path='/' element={<Dashboard/>}/>
                {/* <Route path='/share/:shareId' element={<Dashboard/>}/> */}
              </Route>
            </Routes>
         
        </BrowserRouter> 
        </RecoilRoot>  
      
    
      </>
  )
}

export default App
