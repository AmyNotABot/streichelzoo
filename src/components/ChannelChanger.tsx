// ChannelChanger.tsx
import React from "react";

type ChannelChangerProps = {
  channel: string;
  channelHandler: (channel: string) => void;
};

const ChannelChanger: React.FC<ChannelChangerProps> = ({
  channel,
  channelHandler,
}) => {
  const handleClick = () => {
    channelHandler(channel);
  };

  return (
    <div
      className='hover:cursor-pointer w-10 h-10 aspect-square border-blue-zomp'
      onClick={handleClick}
    ></div>
  );
};

export default ChannelChanger;
