import React, {useState, useRef, useEffect} from "react";

const HeidiWifey = () => {
  const [playerPosition, setPlayerPosition] = useState({x: 50, y: 50});
  const [hiderPosition, setHiderPosition] = useState({x: 100, y: 100});
  const [isHidden, setIsHidden] = useState(false);
  const [visibleTimer, setVisibleTimer] = useState(0);
  const [hiddenTimer, setHiddenTimer] = useState(0);
  const targetPosition = useRef({
    x: Math.random() * (600 - 50),
    y: Math.random() * (400 - 50),
  });

  useEffect(() => {
    const moveHider = () => {
      setHiderPosition((prevPosition) => {
        const speed = 0.01;
        const dx = targetPosition.current.x - prevPosition.x;
        const dy = targetPosition.current.y - prevPosition.y;
        return {
          x: prevPosition.x + dx * speed,
          y: prevPosition.y + dy * speed,
        };
      });

      if (
        Math.abs(targetPosition.current.x - hiderPosition.x) < 10 &&
        Math.abs(targetPosition.current.y - hiderPosition.y) < 10
      ) {
        targetPosition.current = {
          x: Math.random() * (600 - 50),
          y: Math.random() * (400 - 50),
        };
      }
    };

    const movementInterval = setInterval(moveHider, 50);
    return () => clearInterval(movementInterval);
  });

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      switch (event.key) {
        case "ArrowUp":
          setPlayerPosition((prev) => ({...prev, y: Math.max(prev.y - 15, 0)}));
          break;
        case "ArrowDown":
          setPlayerPosition((prev) => ({
            ...prev,
            y: Math.min(prev.y + 10, 350),
          }));
          break;
        case "ArrowLeft":
          setPlayerPosition((prev) => ({...prev, x: Math.max(prev.x - 15, 0)}));
          break;
        case "ArrowRight":
          setPlayerPosition((prev) => ({
            ...prev,
            x: Math.min(prev.x + 10, 550),
          }));
          break;
        default:
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const checkOverlap = () => {
      const playerRect = {
        left: playerPosition.x,
        top: playerPosition.y,
        right: playerPosition.x + 50,
        bottom: playerPosition.y + 50,
      };

      const hiderRect = {
        left: hiderPosition.x,
        top: hiderPosition.y,
        right: hiderPosition.x + 50,
        bottom: hiderPosition.y + 50,
      };

      const isOverlapping = !(
        playerRect.right < hiderRect.left ||
        playerRect.left > hiderRect.right ||
        playerRect.bottom < hiderRect.top ||
        playerRect.top > hiderRect.bottom
      );

      setIsHidden(isOverlapping);
    };

    const intervalId = setInterval(checkOverlap, 50); // Check for overlap every 100ms

    return () => clearInterval(intervalId);
  }, [hiderPosition, playerPosition]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (isHidden) {
        setHiddenTimer((prev) => prev + 1);
      } else {
        setVisibleTimer((prev) => prev + 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isHidden]);

  return (
    <div>
      <div className='relative w-screen h-[500px] bg-orange-cognac border border-brown-caput-mortuum'>
        {/* Player */}
        <div
          className='z-10'
          style={{
            position: "absolute",
            left: `${playerPosition.x}px`,
            top: `${playerPosition.y}px`,
            width: "50px",
            height: "50px",
            backgroundColor: "blue",
          }}
        ></div>
        {/* Hider */}
        <div
          style={{
            position: "absolute",
            left: `${hiderPosition.x}px`,
            top: `${hiderPosition.y}px`,
            width: "50px",
            height: "50px",
            backgroundColor: "red",
          }}
        ></div>
      </div>
      <p>Visible Time: {visibleTimer} seconds</p>
      <p>Hidden Time: {hiddenTimer} seconds</p>
    </div>
  );
};

export default HeidiWifey;
