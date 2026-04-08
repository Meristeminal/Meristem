export default function Home() {
  // Sart page content here
  return (
    <main className="flex flex-col items-center " style={{ backgroundColor: "#8A7863" }}>


      <div className="flex flex-col items-center justify-center space-y-8 h-screen" style={{ backgroundColor: "#AD987D" }}>
        <h1 className="text-4xl font-bold mb-4">Meristem</h1>

      <div className="flex flex-col space-y-4">
        <button className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"> New Map</button>
        <button className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"> Load Map</button>
      </div>
      </div>

    </main>
  );
}
