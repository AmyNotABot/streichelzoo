import React, {ReactNode} from "react";

type OldTvProps = {
  children: ReactNode;
};

const OldTv: React.FC<OldTvProps> = ({children}) => {
  return (
    <div className='flex justify-center items-center rounded-lg relative ml-40 mt-20'>
      <div className='bg-black w-full rounded-lg overflow-hidden'>
        {children}
      </div>
      <div className='absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gray-600 h-4 w-16 rounded-full'></div>
      {/* This div can represent the speaker grill or lower panel of the old TV */}
      {/* You could add more divs to represent dials and antennae */}
    </div>
  );
};

export default OldTv;
