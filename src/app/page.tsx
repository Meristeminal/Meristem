"use client";
import Link from "next/link";
import { LoadToolbar } from "../lib/storage";
export default function Home() {
  // Sart page content here
  return (
    <main
      className="flex flex-col items-center h-screen w-screen"
      style={{ backgroundColor: "#8A7863" }}
    >
      <div className="flex items-center justify-center h-full w-full">
        <div
          className="flex flex-col items-center justify-center space-y-8 w-4/12 h-4/12 rounded-2xl"
          style={{ backgroundColor: "#AD987D" }}
        >
          <h1 className="text-4xl font-bold mb-4">Meristem</h1>
          <div className="flex flex-col space-y-4">
            <input id = "userID" placeholder=" username:" className="hover: bg-blue=700" style = {{backgroundColor: "#8A7863", color: "white"}}></input>
            <div>
              <button onClick = {() => saveUserID("nameSession/")} className="flex flex-col items-center bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-3">
              New Session  
              </button>
             
              <button onClick = {() => saveUserID("loadSession/")} className="flex flex-col items-center bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-3">
              Load Session
              </button>
              
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}


function saveUserID(destination : string){
  let userBox = document.getElementById("userID") as HTMLInputElement
  if(userBox.value == ""){
  }
  else{
      window.location.href = destination
  }
  let userID = userBox.value

  if(localStorage){
    localStorage.setItem("userID" , userID)
    console.log("We just set user ID to : " + userID)
  }
  
}