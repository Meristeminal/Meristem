import Link from "next/link";
import {Session} from "../../lib/session"
export default function NameSession() {
let s1 : SessionInfo = { id : "1", name : "Session1"}
let s2 : SessionInfo = {id: "2", name:   "Session2"}
let s3 : SessionInfo = {id: "3", name:   "Session3"}
let s4 : SessionInfo = {id: "4", name:   "Session4"}
  const SessionList : SessionInfo = [s1, s2, s3, s4]
  

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
            <input id = "sessionID" placeholder=" Session name:" style = {{backgroundColor: "#8A7863", color: "white"}}></input>
            <Link href="session/" className="flex flex-col items-center bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Start Game
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







// Trying to make a new session with a specific ID
// export function SaveID{
//   x : Session ={}
//    {     public name: string,
//       public dice: DiceState,
//       public grid: GridState,
//       public items: SessionCatolog,
//       public toolbarTabSelected: ToolBarTab,}
// }

