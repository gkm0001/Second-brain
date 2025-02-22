import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Dashboard from './pages/Dashboard'
import { Signin } from './pages/Signin'
import { Signup } from './pages/Signup'

function App() {
 

  return (
      <>
        {/* <Dashboard/> */}
        {/* <Signup/> */}
        <BrowserRouter>
           <Routes>
              <Route path='/signup' element={<Signup/>}/>
              <Route path='/signin' element={<Signin/>}/>
              <Route path='/dashboard' element={<Dashboard/>}/>
              <Route path='/share/:shareId' element={<Dashboard/>}/>
           </Routes>
        </BrowserRouter>
      </>
  )
}

export default App
