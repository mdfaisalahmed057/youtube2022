 import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";
import {useContext, useRef,useEffect } from 'react';
 import { useState } from "react";
 import { query, onSnapshot,collection } from "firebase/firestore";
 import {db} from "../firebase"

const Message=({message})=> {
const {currentUser} = useContext(AuthContext)
const {data} = useContext(ChatContext)
const [date,setdate]=useState([])

// fetching the chats collection

 



const ref=useRef()
useEffect(() => {
ref.current?.scrollIntoView({behaviour:"smooth"})
}, [message])
  return (
    <div ref={ref} className={`message ${message.senderId===currentUser.uid && "owner"}`}>
    <div className="messageInfo">
      <img
        src={
          message.senderId===currentUser.uid?currentUser.photoURL:data.user.photoURL
        }
        alt=""
      />
    <span>abich </span>
        
    </div>
    <div className="messageContent">
      <p> {message.text}</p>
{   message.img  &&   <img src={message.img} alt=""/>}</div>
  </div>
  )
}

export default Message
