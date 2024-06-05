import { useState } from 'react'
import './App.css'
import DisplayCounter from './components/DisplayCounter.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Chopra Nursing Home</h1>
      <DisplayCounter/>
    </>
  )
}

export default App
