import React from 'react'
import { AuthContext } from '../context/AuthContext'
import { useContext } from 'react'
import { signOut } from "firebase/auth";
import { auth } from "../firebase"
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom


 // Create a reference to the cities collection
const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate(); // Get the navigate function from react-router-dom

  const logout = () => {
    signOut(auth)
      .then(() => {
         navigate('/register');  
      })
      .catch(error => {
         console.error('Failed to logout:', error);
      });
  };

  return (
    <div className='navbar'>
      <span className="logo">Genz-Chat</span>
      <div className="user">
        <img src={currentUser.photoURL} alt="" />
        <span>{currentUser.displayName}</span>
        <button onClick={logout} >logout</button>
      </div>
    </div>
  )
}

export default Navbar