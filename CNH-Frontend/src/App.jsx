import { useState } from 'react'
import './App.css'
import {
  DisplayCounter,
  UpdateCounter,
  Login,
  Signup
 } from './components'
import {BrowserRouter, Routes, Route, NavLink} from "react-router-dom"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Chopra Nursing Home</h1>
      
      <BrowserRouter>
      <nav>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
      </nav>
        <Routes>
          <Route path="/" element={<DisplayCounter/>}></Route>
          <Route path="/update-counters" element={<UpdateCounter/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/signup" element={<Signup/>}></Route>
        </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
