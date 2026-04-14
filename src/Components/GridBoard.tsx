"use client";
import React from 'react';

const GridBoard: React.FC = () => {
  // Define labels for rows (A-L) and columns (1-10)
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];
  const cols = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className="flex flex-col items-center p-8 min-h-screen">
      {/* Column Headers */}
      <div className="flex ml-8">
        {cols.map((col) => (
          <div key={col} className="w-10 h-8 flex items-center justify-center text-white font-semibold">
            {col}
          </div>
        ))}
      </div>

      <div className="flex">
        {/* Row Headers */}
        <div className="flex flex-col">
          {rows.map((row) => (
            <div key={row} className="h-10 w-8 flex items-center justify-center text-white font-semibold">
              {row}
            </div>
          ))}
        </div>

        {/* The Grid Container */}
        <div className="grid grid-cols-10 border-2 bg-gray-300">
          {rows.map((row) =>
            cols.map((col) => (
              <div
                key={`${row}-${col}`}
                className="w-10 h-10 border border-black hover:bg-gray-400 cursor-pointer transition-colors"
                onClick={() => console.log(`Clicked cell: ${row}${col}`)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default GridBoard;