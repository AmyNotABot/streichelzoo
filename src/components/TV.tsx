import React from "react";
import OldTv from "./OldTv";
import Knopf from "./Knopf";
import {useState} from "react";
import ChannelChanger from "./ChannelChanger";

const TV = () => {
  const [path, setPath] = useState("/icons-images-etc/whiteNoise.gif");
  const [channel, setChannel] = useState(0);
  const maxValue = 2;

  const channelButtons = [
    {
      channel: 0,
      buttons: [
        {path: "icons-images-etc/itchy.gif"},
        {path: "icons-images-etc/mr-bean-bean.gif"},
        {path: "icons-images-etc/whiteNoise.gif"},
        {path: "icons-images-etc/nyanCat.gif"},
      ],
    },
    {
      channel: 1,
      buttons: [
        {path: "icons-images-etc/lsdcat.gif"},
        {path: "icons-images-etc/drake.gif"},
        {path: "icons-images-etc/buntNoise.gif"},
        {path: "icons-images-etc/Maus.gif"},
      ],
    },
    {
      channel: 2,
      buttons: [
        {path: "icons-images-etc/weenie.gif"},
        {path: "icons-images-etc/static.gif"},
        {path: "icons-images-etc/puppe.gif"},
        {path: "icons-images-etc/peter.gif"},
      ],
    },
  ];

  const channelHandler = (channelProp: string) => {
    const increment = channelProp === "+";
    const decrement = channelProp === "-";
    if (increment) {
      setChannel(channel === maxValue ? 0 : channel + 1);
    } else if (decrement) {
      setChannel(channel === 0 ? maxValue : channel - 1);
    }
  };

  return (
    <div className='bg-beige-buttercream'>
      <div className='absolute top-48 mt-10 z-20 bottom-0 left-[930px] right-0'>
        <ChannelChanger channel={"+"} channelHandler={channelHandler} />
        <ChannelChanger channel={"-"} channelHandler={channelHandler} />
      </div>

      <div>
        {channelButtons.map((item) => {
          if (channel === item.channel) {
            return (
              <div className='absolute top-80 mt-10 z-20 bottom-0 left-[930px] right-0'>
                {item.buttons.map((button, index) => (
                  <Knopf key={index} path={button.path} setPath={setPath} />
                ))}
              </div>
            );
          }
          return null;
        })}
      </div>

      <div className='flex justify-center items-center h-screen'>
        <img
          className='p-5 h-screen absolute z-10 object-cover left-64 top-0 bottom-0 right-0'
          src='/icons-images-etc/roterFernseher.png'
          alt='ein roter Fernseher'
        />

        <div className='absolute top-36 left-36 right-0 bottom-0'>
          <OldTv>
            <img
              src={path}
              alt='hier steht eigentlich ein fernseher'
              className='w-[550px] h-[410px] object-cover'
            ></img>
          </OldTv>
        </div>
      </div>
    </div>
  );
};

export default TV;
