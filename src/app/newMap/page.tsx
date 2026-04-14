// import grid from components
import GridBoard from '../../Components/GridBoard';

export default function NewMap() {
  // New Map page content here

    // from A to L
    const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J","K","L"];
    // to ten
    const cols = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];


  return (
    <main className="flex flex-col items-center h-screen w-screen bg-[#8A7863]">
      <GridBoard />
    </main>
  );
}