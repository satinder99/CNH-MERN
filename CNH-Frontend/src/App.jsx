import { useState } from 'react'
import './App.css'
import DisplayCounter from './components/DisplayCounter.jsx'
import UpdateCounter from './components/UpdateCounter.jsx'
import {BrowserRouter, Routes, Route} from "react-router-dom"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Chopra Nursing Home</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DisplayCounter/>}></Route>
          <Route path="/update-counters" element={<UpdateCounter/>}></Route>
        </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
