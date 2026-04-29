import React from "react";
import GridHeader from "./GridHeader";
import { spacingCalc } from "@/lib/client/css";
import GridCell from "./GridCell";
import { GridCoordinate, GridHeaderInfo } from "@/lib/state/grid";
import { getAssetUri } from "@/lib/client/api";
import { ItemProps } from "../item/Item";
import { Item, ItemInfo } from "@/lib/state/item";

interface GridBoardProps {
  rowsCount?: number;
  colsCount?: number;
  cellInfo?: { height: number; width: number };
  onCellClick?: ([row, col]: GridCoordinate) => void;
  fetchItem?: ([row, col]: GridCoordinate) => ItemInfo | undefined;
}

const GridBoard: React.FC<GridBoardProps> = ({
  rowsCount = 12,
  colsCount = 10,
  cellInfo = { height: 10, width: 10 },
  onCellClick,
  fetchItem,
}) => {
  // Generate row labels (A, B, C...) based on rowsCount
  const rows: GridHeaderInfo[] = Array.from({ length: rowsCount }, (_, i) => {
    let s = String.fromCharCode(65 + i);
    let id = i;
    return [id, s];
  });

  // Generate column labels (1, 2, 3...) based on colsCount
  const cols: GridHeaderInfo[] = Array.from({ length: colsCount }, (_, i) => {
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
              const label = row[1] + col[1];
              return (
                <GridCell
                  key={label}
                  label={label}
                  height={cellHeight}
                  width={cellWidth}
                  rowInfo={row}
                  colInfo={col}
                  onClick={onCellClick}
                  fetchItem={fetchItem}
                />
              );
            }),
          )}
        </div>
      </div>
    </div>
  );
};

export default GridBoard;
