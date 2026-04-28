import Link from "next/link";
import Session from "../lib/session"

export default function LoadMap() {
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
            <Link href="/.." className="flex flex-col items-center bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Back
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
