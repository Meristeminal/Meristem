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
        height: `calc(var(--spacing) * ${height})`,
        width: `calc(var(--spacing) * ${width})`,
      }}
      className={`flex items-center justify-center text-white font-bold`}
    >
      {label}
    </div>
  );
};

export default GridHeader;
