import axios from "axios";
import { useState } from "react";
import BASE_URL from "./api";

function Register(){
  const [form,setForm]=useState({});

  const submit=async()=>{
    await axios.post(`${BASE_URL}/api/register`,form);
    alert("Registered");
    window.location="/login";
  };

  return(
    <div className="container">
      <h2>Register</h2>

      <input placeholder="Name" onChange={e=>setForm({...form,name:e.target.value})}/>
      <input placeholder="Email" onChange={e=>setForm({...form,email:e.target.value})}/>
      <input type="password" placeholder="Password" onChange={e=>setForm({...form,password:e.target.value})}/>

      <button onClick={submit}>Register</button>
    </div>
  );
}

export default Register;
