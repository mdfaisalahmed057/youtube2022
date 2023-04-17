import React from 'react';
import Img from "../img/img.png";
import Attach from "../img/attach.png";
import { useState,useContext } from 'react';
import {AuthContext} from "../context/AuthContext";
import {ChatContext} from "../context/ChatContext";
import { arrayUnion,doc,
serverTimestamp,
Timestamp,
updateDoc } from 'firebase/firestore';
import {db,storage} from "../firebase"
import {v4 as uuid} from "uuid";
import { getDownloadURL,ref,uploadBytesRe, uploadBytesResumable
 } from 'firebase/storage';


function Input() {

const [text, setText] = useState("");
const [img, setImg] = useState(null);
const {currentUser} = useContext(AuthContext)
const {data} = useContext(ChatContext)

// if chat contain img then send only chat else send chat with text

const handlesend=async ()=>{
  if(img){
    const storageref=ref(storage, uuid())
    const uploadTask=uploadBytesResumable(storageref,img)

    uploadTask.on(
      (error)=>{

      },
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL)=>{
          await updateDoc(doc(db,"chats",data.chatId),{
            messages:arrayUnion({
              id:uuid(),
              text,
              senderId:currentUser.uid,
              date:Timestamp.now(),
              img:downloadURL,
            })
          })
        })
      }
    )
  }else{
    await updateDoc(doc(db,"chats",data.chatId),{
      messages:arrayUnion({
        id:uuid(),
        text,
        senderId:currentUser.uid,
        date:Timestamp.now(),
        })
    })
  }
 
  await updateDoc(doc(db,"userChats",currentUser.uid),{
    [data.chatId+".lastMessagge"]:{
      text,
    },
    [data.chatId+".date"]:serverTimestamp()
  })

  await updateDoc(doc(db,"userChats",data.user.uid),{
    [data.chatId+".lastMessagge"]:{
      text,
    },
    [data.chatId+".date"]:serverTimestamp()
  })

  setText("")
  setImg(null);
} 
  return (
    <div className="input">
      <input
        type="text"
        onChange={(e)=>setText(e.target.value)}
        placeholder="Type something..."
        value={text}
       />
      <div className="send">
        <img src={Attach} alt="" />
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e)=>setImg(e.target.files[0])}
         />
        <label htmlFor="file">
          <img src={Img} alt="" />
        </label>
        <button onClick={handlesend} >Send</button>
      </div>
    </div>
  )
}

export default Input
