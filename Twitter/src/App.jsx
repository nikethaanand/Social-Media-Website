import { useState } from 'react'
import './App.css'
import signIn from "./signIn";
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      
      
      <div className="card">
      <h1>Sign in</h1>
      <signIn/>  
     
     </div>
     
    </>
  )
}

export default App
