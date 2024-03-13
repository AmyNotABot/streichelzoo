import React, {useState, useEffect} from "react";

const ClockGame = () => {
  const [successCount, setSuccessCount] = useState(0);
  const [missedCount, setMissedCount] = useState(0);
  const [clockAngle, setClockAngle] = useState(0);
  const [isTimeToAnswer, setIsTimeToAnswer] = useState(false);
  const failaudio = new Audio("/minigamessound/fail.mp3");
  const winaudio = new Audio("/minigamessound/success.mp3");

  useEffect(() => {
    const tickInterval = setInterval(() => {
      setClockAngle((prevAngle) => (prevAngle + 6) % 360);
    }, 200);

    return () => clearInterval(tickInterval);
  }, []);

  useEffect(() => {
    if (clockAngle === 330) {
      setIsTimeToAnswer(true);
      setTimeout(() => {
        if (isTimeToAnswer) {
          setIsTimeToAnswer(false);
          setMissedCount((prev) => prev + 1);
        }
      }, 200);
    } else {
      setIsTimeToAnswer(false);
    }
  }, [clockAngle, isTimeToAnswer]);

  const handleClockClick = () => {
    if (isTimeToAnswer) {
      setSuccessCount((prev) => prev + 1);
      setIsTimeToAnswer(false);
      winaudio.play();
    } else {
      failaudio.play();
      setMissedCount(missedCount + 1);
    }
  };

  return (
    <div>
      <div className='relative flex flex-col items-center justify-center p-4'>
        <img
          id='clock'
          src='/minigamesgraph/uhrzeiger.png'
          alt='clock'
          onClick={handleClockClick}
          style={{transform: `rotate(${clockAngle}deg)`}}
          className={
            "absolute top-10 bg-off-white border border-off-black rounded-full left-1/2 transform -translate-x-1/2 cursor-pointer"
          }
        />
      </div>
      <div id='scoreBoard' className=' text-brown-caput-mortuum'>
        <p className=''>
          Success: <span>{successCount}</span>
        </p>
        <p className=''>
          Missed: <span>{missedCount}</span>
        </p>
      </div>
    </div>
  );
};

export default ClockGame;
