import Link from "next/link";
import Session from "../lib/session"

export default function LoadMap() {
  // Start page content here

let s1 : SessionInfo = { id : "1", name : "Session1"}
let s2 : SessionInfo = {id: "2", name:   "Session2"}
let s3 : SessionInfo = {id: "3", name:   "Session3"}
let s4 : SessionInfo = {id: "4", name:   "Session4"}
  const SessionList : SessionInfo[] = []
  SessionList.push(s1)
  SessionList.push(s2)
  SessionList.push(s3)
  SessionList.push(s4)

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
          <h1 className="text-4xl font-bold mb-4">Previous Sessions</h1>
          <div className="flex flex-col space-y-4">

            {SessionList.map(SessionInfo => {return <button key ={SessionInfo.name} className="flex flex-col items-center bg-black hover:bg-blue-700 text-white font-bold py-1 px-3 mb-2 rounded">{SessionInfo.name}</button>})}
            <Link href="/.." className="flex flex-col items-center bg-red-800 hover:bg-blue-700 text-white font-bold py-1 px-3 mb-2 rounded">
              Back
            </Link>
          </div>
   
        </div>
      </div>
    </main>
  );
}


export type SessionInfo = {
  id: string
  name: string
}
