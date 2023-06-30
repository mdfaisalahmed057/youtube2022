import mysql2 from "mysql2"

export const db = mysql2.createConnection({
  host:"localhost",
  user:"root",
  password:"Faisal@123",
  database:"blog"
})
if(!db){
  console.log("error")
}else{
console.log("success")
}