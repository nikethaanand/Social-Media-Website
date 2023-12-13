import { useState } from 'react'
import './App.css'
import SignIn from './Login/signIn';
import './styles.css';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      
      
      <div className="card">
      <h1>Sign in</h1>
      <SignIn/>  
     
     </div>
     
    </>
  )
}

export default App
