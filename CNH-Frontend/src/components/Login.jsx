import React, { useState } from 'react'

function Login() {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("")

  const handleEmail = (e)=>{
    setEmail(e.target.value)
  }

  const handlePassword = (e)=>{
    setPassword(e.target.value)
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    console.log(email+password)
  }

  return (
    <div>
      <form> 
				{/* Labels and inputs for form data */}  
				<label className="label">Email</label> 
				<input 
					onChange={handleEmail} 
					className="input"
					value={email} 
					type="email"
				/> 

				<label className="label">Password</label> 
				<input 
					onChange={handlePassword} 
					className="input"
					value={password} 
					type="password"
				/> 

				<button onClick={handleSubmit} className="btn" type="submit"> 
					Submit 
				</button> 
			</form> 
    </div>
  )
}

export default Login