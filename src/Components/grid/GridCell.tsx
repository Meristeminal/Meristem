import { spacingCalc } from "@/lib/client/css";
import { GridHeaderInfo, GridCoordinate } from "@/lib/state/grid";
import Item, { ItemProps } from "../item/Item";
import { useEffect, useState } from "react";
import { ItemInfo } from "@/lib/state/item";

export interface GridCellProps {
  height: number;
  width: number;
  rowInfo: GridHeaderInfo;
  colInfo: GridHeaderInfo;
  label: string;
  onClick?: ([row, col]: GridCoordinate) => void;
  fetchItem?: ([row, col]: GridCoordinate) => ItemInfo | undefined;
}

const GridCell: React.FC<GridCellProps> = ({
  height,
  width,
  label,
  onClick,
  rowInfo: [row, _r],
  colInfo: [col, _c],
  fetchItem,
}) => {
  const pos: GridCoordinate = [row, col];

  // TODO: Check if this needs a state update

  const [item, setItem] = useState(fetchItem?.(pos));

  useEffect(() => {
    setItem(fetchItem?.(pos));
  }, [item, setItem]);

  return (
    <div
      style={{
        // Tailwind does not support dynamic class generation
        // TODO: LUT?
        height: spacingCalc(height),
        width: spacingCalc(width),
      }}
      className={`border border-black hover:bg-gray-400 cursor-pointer transition-colors`}
      onClick={onClick ? () => onClick(pos) : void 0}
    >
      {item ? (
        <Item
          icon={item.icon}
          name={item.name}
          id={item.id}
          width={width - 1}
          height={height - 1}
        />
      ) : (
        void 0
      )}
    </div>
  );
};

export default GridCell;
