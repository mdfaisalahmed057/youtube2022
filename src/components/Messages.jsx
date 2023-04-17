import React from 'react'
import Message from "./Message";
 import { useContext,useEffect,useState } from 'react'
import { onSnapshot } from 'firebase/firestore'
import {db} from "../firebase"
import { doc } from 'firebase/firestore'
import { ChatContext } from '../context/ChatContext'

function Messages() {
const {data} = useContext(ChatContext)
const [message, setMessage] = useState([[]])

useEffect(() => {
const unSub=onSnapshot(doc(db,"chats",data.chatId),(doc)=>{
  doc.exists() && setMessage(doc.data().messages)
})

  return()=>{
    unSub()
  }
}, [data.chatId])
  return ( 
    <div className='messages'>
      {message.map(m=>(
      <Message message={m}  key={m.id}/>

      ))}
    </div>
  )
}

export default Messages
