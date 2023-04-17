import { doc,onSnapshot } from "firebase/firestore"
import React ,{useContext,useEffect,useState} from "react"
import { AuthContext } from '../context/AuthContext'
import {ChatContext} from "../context/ChatContext";

import { db } from '../firebase'

function Chats() {
const [chats,setChats]=useState([])
const{currentUser}=useContext(AuthContext)
const {dispatch} = useContext(ChatContext)

useEffect(()=>{
const getChats=()=>{
const unsub=onSnapshot(doc(db,"userChats",currentUser.uid),(doc)=>{
  setChats(doc.data())
})
return()=>{
  unsub()
};
};
currentUser.uid && getChats();
},[currentUser.uid ])

const handleselect=(u)=>{
  dispatch({type:"CHANGE_USER",payload:u})
}
  return (
  <div className="chats">
    {Object.entries(chats)?.sort((a,b)=>b[1].date-a[1].date).map((chat)=>(

        <div className="userChat" key={chat[0]}
        onClick={()=>handleselect(chat[1].userInfo)}>

        <img src={chat[1].userInfo.photoURL}alt="" />

        <div className="userChatInfo">
          <span>{chat[1].userInfo.displayName}</span>
          <p>{chat[1].lastMessagge?.text}</p>
          
        </div>
      </div>
    ))}
    </div>

)
}

export default Chats




// Try Changing map(() => {}) to map(() => ())

// {} - Creates a code block that expects an explicit return statement.
// With () - implicit return takes place.