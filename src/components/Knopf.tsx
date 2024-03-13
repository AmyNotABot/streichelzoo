// Knopf.tsx
import React from "react";

type KnopfProps = {
  path: string;
  setPath: (newPath: string) => void;
};

const Knopf: React.FC<KnopfProps> = ({path, setPath}) => {
  const handleClick = () => {
    setPath(path);
  };

  return (
    <div
      className='hover:cursor-pointer w-10 h-10 aspect-square border-blue-zomp'
      onClick={handleClick}
    ></div>
  );
};

export default Knopf;
