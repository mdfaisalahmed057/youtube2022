import React from 'react'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [err, seterr] = useState(false)
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    const email = e.target[0].value;
    const password = e.target[1].value;
    try {
        await signInWithEmailAndPassword(auth, email, password)
      navigate('/')
    } catch (err) {
      seterr(true)
      console.log(err)
    }
  }
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Genz-Chat</span>
        <span className="title">Login</span>
        <form onSubmit={handleSubmit} >
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <button>Sign in</button>
        </form>
        <p>
          You do have an account? <Link to="/register">Register</Link>
        </p>
        {err && <span>wrong username or password</span>}
      </div>
    </div>

  )
}

export default Login;


