import { spacingCalc } from "@/lib/css";

export interface GridHeaderProps {
  height: number;
  width: number;
  label: string;
}

const GridHeader: React.FC<GridHeaderProps> = ({ height, width, label }) => {
  return (
    <div
      style={{
        // Tailwind does not support dynamic class generation
        height: spacingCalc(height),
        width: spacingCalc(width),
      }}
      className={`flex items-center justify-center text-white font-bold`}
    >
      {label}
    </div>
  );
};

export default GridHeader;
