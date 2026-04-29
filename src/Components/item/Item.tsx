import Image from "next/image";

export interface ItemProps {
  icon: URL;
  id: string;
  name: string;
  height: number;
  width: number;
}

const Item: React.FC<ItemProps> = ({ icon, name, id: _, height, width }) => {
  return (
    <div className={`flex items-center justify-center text-white font-bold`}>
      <Image src={icon.toString()} alt={name} height={height} width={width} />
    </div>
  );
};

export default Item;
