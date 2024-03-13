// TVContent.tsx
import React from "react";
import Knopf from "./Knopf";
import {useState} from "react";
type TVContentProps = {
  channel: number;
};

const TVContent: React.FC<TVContentProps> = ({channel}) => {
  const [path, setPath] = useState("/icons-images-etc/whiteNoise.gif");

  return (
    <div>
      <Knopf path='/icons-images-etc/itchy.gif' setPath={setPath} />
      <Knopf path='/icons-images-etc/buntNoise.gif' setPath={setPath} />
      <Knopf path='/icons-images-etc/whiteNoise.gif' setPath={setPath} />
      <Knopf path='/icons-images-etc/nyanCat.gif' setPath={setPath} /> );
    </div>
  );
};

export default TVContent;
