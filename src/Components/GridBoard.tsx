"use client";

import React from 'react';

/*
  GridBoard Component
  - if you import like this <GridBoard /> it will create a 12x10 grid with default cell size of 40px (w-10 h-10)
  - you can customize rows, cols, cell size and click behavior via props:
    <GridBoard 
      rowsCount={15} 
      colsCount={12} 
      cellSize="w-12 h-12" 
      onCellClick={(coord) => console.log("Clicked cell:", coord)} 
    />
  
  This makes it moduler and reusable for different grid sizes and interactions across the app. 

*/

interface GridBoardProps {
  rowsCount?: number;     // e.g., 12
  colsCount?: number;     // e.g., 10
  cellSize?: string;      // Tailwind class like 'w-10 h-10'
  onCellClick?: (coord: string) => void; // Callback when a cell is clicked, receives coordinate like "A1", "B3", etc.
}

const GridBoard: React.FC<GridBoardProps> = ({
  rowsCount = 12,
  colsCount = 10,
  cellSize = "w-10 h-10",
  onCellClick
}) => {
  // Generate row labels (A, B, C...) based on rowsCount
  const rows = Array.from({ length: rowsCount }, (_, i) => 
    String.fromCharCode(65 + i)
  );
  
  // Generate column labels (1, 2, 3...) based on colsCount
  const cols = Array.from({ length: colsCount }, (_, i) => i + 1);

  return (
    <div className="flex flex-col items-center p-8 select-none">
      
      {/* Column Headers */}
      <div className="flex ml-8">
        {cols.map((col) => (
          <div 
            key={col} 
            className={`${cellSize.split(' ')[0]} h-8 flex items-center justify-center text-white font-bold`}
          >
            {col}
          </div>
        ))}
      </div>

      <div className="flex">
        {/* Row Headers */}
        <div className="flex flex-col">
          {rows.map((row) => (
            <div 
              key={row} 
              className={`${cellSize.split(' ')[1]} w-8 flex items-center justify-center text-white font-bold`}
            >
              {row}
            </div>
          ))}
        </div>

        {/* Dynamic Grid */}
        <div 
          className="grid border-2 bg-gray-300"
          style={{ 
            gridTemplateColumns: `repeat(${colsCount}, min-content)` 
          }}
        >
          {rows.map((row) =>
            cols.map((col) => {
              const coord = `${row}${col}`;
              return (
                <div
                  key={coord}
                  className={`${cellSize} border border-black hover:bg-gray-400 cursor-pointer transition-colors`}
                  onClick={() => onCellClick?.(coord)}
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default GridBoard;