"use client";

import React from "react";
import GridHeader from "./GridHeader";
import { spacingCalc } from "@/lib/css";

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
  rowsCount?: number;
  colsCount?: number;
  cellInfo?: { height: number; width: number };
  onCellClick?: ([row, col]: [number, number]) => void;
}

type HeaderInfo = [number, string];

const GridBoard: React.FC<GridBoardProps> = ({
  rowsCount = 12,
  colsCount = 10,
  cellInfo = { height: 10, width: 10 },
  onCellClick,
}) => {
  // Generate row labels (A, B, C...) based on rowsCount
  const rows: HeaderInfo[] = Array.from({ length: rowsCount }, (_, i) => {
    let s = String.fromCharCode(65 + i);
    let id = i;
    return [id, s];
  });

  // Generate column labels (1, 2, 3...) based on colsCount
  const cols: HeaderInfo[] = Array.from({ length: colsCount }, (_, i) => {
    let id = i;
    let s = (i + 1).toString();
    return [id, s];
  });

  const cellHeight = Math.round(cellInfo.height);
  const cellWidth = Math.round(cellInfo.width);

  return (
    <div className="flex flex-col items-center p-8 select-none">
      {/* Column Headers */}
      <div className="flex ml-8">
        {cols.map((col) => (
          <GridHeader
            key={col[1]}
            label={col[1]}
            height={cellHeight}
            width={cellWidth}
          />
        ))}
      </div>

      <div className="flex">
        {/* Row Headers */}
        <div className="flex flex-col">
          {rows.map((row) => (
            <GridHeader
              key={row[1]}
              label={row[1]}
              height={cellHeight}
              width={cellWidth}
            />
          ))}
        </div>

        {/* Dynamic Grid */}
        <div
          className="grid border-2 bg-gray-300"
          style={{
            gridTemplateColumns: `repeat(${colsCount}, min-content)`,
          }}
        >
          {rows.map((row) =>
            cols.map((col) => {
              const coord = row[1] + col[1];
              return (
                <div
                  key={coord}
                  style={{
                    // Tailwind does not support dynamic class generation
                    height: spacingCalc(cellHeight),
                    width: spacingCalc(cellWidth),
                  }}
                  className={`border border-black hover:bg-gray-400 cursor-pointer transition-colors`}
                  onClick={() =>
                    onCellClick ? onCellClick?.([row[0], col[0]]) : void 0}
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
