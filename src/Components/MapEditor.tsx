"use client";

import { useState } from "react";

type GameTitle = {
     id: number;
     title: string;
};

export default function MapEditor() {
     const [gameTitles, setGameTitles] = useState<GameTitle[]>([]);
     const [titleInput, setTitleInput] = useState("");

     const addGameTitle = () => {
          if (!titleInput.trim()) return;

     setGameTitles([
          ...gameTitles,
          {
               id: Date.now(),
               title: titleInput.trim(),
          },
     ]);

     setTitleInput("");
     };

     return (
          <main className="h-screen w-screen overflow-hidden bg-gray-100 text-black">
          <div className="grid h-full w-full grid-cols-[260px_1fr]">
          {/* Left Side Panel */}
          <aside className="flex h-full flex-col border-r bg-white p-4 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold">Game Titles</h2>

          <div className="mb-4 flex gap-2">
          <input
          value={titleInput}
          onChange={(e) => setTitleInput(e.target.value)}
          placeholder="Add title"
          className="min-w-0 flex-1 rounded-md border bg-white px-3 py-2 text-sm text-black placeholder-gray-500"
          />

          <button
          onClick={addGameTitle}
          className="rounded-md bg-black px-3 py-2 text-sm text-white"
          >
          
          Add
          </button>
          </div>

          <div className="flex-1 space-y-2 overflow-y-auto">
          {gameTitles.map((game) => (
               <div
               key={game.id}
               className="rounded-md border bg-gray-50 px-3 py-2 text-sm"
               >
               {game.title}
               </div>
          ))}
          </div>

          {/* Placing Toolbar Down */}
          <div className="mt-4 border-t pt-4">
          <h3 className="mb-3 text-sm font-semibold">Toolbar</h3>
          <div className="flex flex-col gap-2">
          <button className="rounded-md border px-3 py-2 text-sm text-black bg-white hover:bg-gray-100">
          Select
          </button>
          <button className="rounded-md border px-3 py-2 text-sm text-black bg-white hover:bg-gray-100">
          Draw
          </button>
          <button className="rounded-md border px-3 py-2 text-sm text-black bg-white hover:bg-gray-100">
          Erase
          </button>
          <button className="rounded-md border px-3 py-2 text-sm text-black bg-white hover:bg-gray-100">
          Save
          </button>
          </div>
          </div>
          </aside>

          {/* MAIN GRID AREA */}
          <section className="h-full w-full overflow-hidden p-4">
          <div
          className="
          grid h-full w-full
          auto-rows-fr
          grid-cols-[repeat(auto-fit,minmax(40px,1fr))]
          gap-1"
          >
          {Array.from({ length: 240 }).map((_, index) => (
          <div
          key={index}
          className="aspect-square rounded-sm border bg-white hover:bg-gray-200"
          />
          ))}
          </div>
          </section>
          </div>
     </main>
     );
}