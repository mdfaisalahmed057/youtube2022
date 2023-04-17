import React from 'react'
import { useState } from 'react'
import { useContext } from 'react';
import {   collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc} from "firebase/firestore";
import { db } from "../firebase"
import {AuthContext} from "../context/AuthContext"

function Search() {
  const [err, seterr] = useState(false)
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState("")

  const {currentUser}=useContext(AuthContext)

  const handlesearch = async () => {
    const q = query(collection(db, "users"), where("displayName", "==", username));
 
    try {
      const querySnapshot = await getDocs(q);
       querySnapshot.forEach((doc) => {
        setUser(doc.data());
       });
    } catch (Err) {
       seterr(true)
    }
  }
 
 
  const handlekay = (e) => {
    e.code === "Enter" && handlesearch()
  }

// checking and creating the group (chats in firestore)  exists ,if not create
const handleselect=async()=>{

  const combineid=
  currentUser.uid>user.uid 
  ? currentUser.uid+user.id
  : user.uid + currentUser.uid;

  try{
    const res=await getDoc(doc(db,"chats",combineid));

    if(!res.exists()){
      // create a chat in a chat collection
      await setDoc(doc(db,"chats",combineid),{messages:[]});
      // create user chat
      await updateDoc(doc(db,"userChats",currentUser.uid),{
        [combineid+".userInfo"]:{
          uid:user.uid, 
          displayName:user.displayName,
          photoURL:user.photoURL
        },
     [combineid+".date"]:serverTimestamp(),
      });
      await updateDoc(doc(db,"userChats",user.uid),{
        [combineid+".userInfo"]:{
          uid:currentUser.uid,
        displayName:currentUser.displayName,
        photoURL:currentUser.photoURL      
        },
        [combineid+".date"]:serverTimestamp(),
      })
    }
  }catch(err){
    console.log(err)
  }
  setUser(null)
  setUsername("")
} 
  return (
    <div className='search'>
      <div className='searchForm'>
        <input input="text" placeholder='Find user' 
        onChange={e => setUsername(e.target.value)} 
        onKeyDown={handlekay} 
        value={username}/>
      </div>
       {err && <span>user not found</span>}
       {user &&( <div className='userChat' onClick={handleselect}>
       <img src={user.photoURL} alt="img" />
        <div className='userChatInfo'>
          <span>{user.displayName}</span>

        </div>
      </div>  
      )}

    </div>
  )
}

export default Search
