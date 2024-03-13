import React, {useState, useEffect} from "react";

interface Bolt {
  id: number;
  x: number;
  fromY: number;
}

interface Bug {
  id: number;
  x: number;
  y: number;
  isActive: boolean;
  speed: number;
}

const BugsNBolts = () => {
  const [playerPosition, setPlayerPosition] = useState({x: 50, y: 50});
  const [bolts, setBolts] = useState<Bolt[]>([]);
  const [bugs, setBugs] = useState<Bug[]>([]);
  const [clearCounter, setClearCounter] = useState(0);
  const [failCounter, setFailCounter] = useState(0);

  useEffect(() => {
    const spawnBug = () => {
      const newBug = {
        id: Date.now(),
        x: window.innerWidth - 100,
        y: Math.random() * (window.innerHeight - 50),
        isActive: true,
        speed: Math.random() * 3 + 1,
      };
      setBugs((prevBugs) => [...prevBugs, newBug]);
    };

    const bugSpawner = setInterval(spawnBug, 2000);
    return () => clearInterval(bugSpawner);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") {
        setPlayerPosition((prev) => ({...prev, y: Math.max(prev.y - 10, 0)}));
      } else if (e.key === "ArrowDown") {
        setPlayerPosition((prev) => ({
          ...prev,
          y: Math.min(prev.y + 10, window.innerHeight - 130),
        }));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleGameClick = () => {
    const newBolt: Bolt = {
      id: Date.now(),
      x: playerPosition.x,
      fromY: playerPosition.y + 60,
    };
    setBolts((prevBolts) => [...prevBolts, newBolt]);
  };

  useEffect(() => {
    const moveBolts = setInterval(() => {
      setBolts(
        (prevBolts) =>
          prevBolts
            .map((bolt) => ({
              ...bolt,
              x: bolt.x + 10, // Move bolt to the right
            }))
            .filter((bolt) => bolt.x < window.innerWidth) // Keep bolts that haven't reached the right end
      );
    }, 5);

    return () => clearInterval(moveBolts);
  }, []);

  useEffect(() => {
    const checkCollisions = () => {
      setBolts((prevBolts) =>
        prevBolts.filter((bolt) => {
          let boltActive = true;
          setBugs((prevBugs) =>
            prevBugs.map((bug) => {
              if (
                boltActive &&
                bolt.x >= bug.x &&
                bolt.x <= bug.x + 60 &&
                bolt.fromY >= bug.y &&
                bolt.fromY <= bug.y + 60 &&
                bug.isActive
              ) {
                boltActive = false; // Bolt hits a bug, deactivate it
                setClearCounter(
                  (prevCount) => prevCount + Math.floor(Math.random() * 20)
                );
                return {...bug, isActive: false};
              }
              return bug;
            })
          );
          return boltActive; // Only keep active (not collided) bolts
        })
      );
    };

    const collisionCheckInterval = setInterval(checkCollisions, 10);
    return () => clearInterval(collisionCheckInterval);
  }, []);

  useEffect(() => {
    const moveBugs = setInterval(() => {
      setBugs((currentBugs) =>
        currentBugs
          .map((bug) => ({...bug, x: bug.x - bug.speed}))
          .filter((bug) => {
            if (bug.x <= 0 && bug.isActive) {
              setFailCounter((prevCount) => prevCount + 1);
              return false;
            }
            return true;
          })
      );
    }, 50);

    return () => clearInterval(moveBugs);
  }, []);

  return (
    <div
      onClick={handleGameClick}
      className='relative w-screen h-screen bg-orange-cognac'
    >
      Erwischt: {clearCounter}
      Verfehlt: {failCounter}
      {/* Player */}
      <img
        alt='konsti'
        src={"/minigamesgraph/konsti.png"}
        style={{
          position: "absolute",
          left: `${playerPosition.x}px`,
          top: `${playerPosition.y}px`,
          width: "75px",
          height: "130px",
          backgroundColor: "blue",
        }}
      />
      {/* Bolts */}
      {bolts.map((bolt) => (
        <img
          alt='blitz'
          src='/minigamesgraph/blitz.png'
          key={bolt.id}
          className='absolute w-5 h-10 -rotate-90'
          style={{
            left: `${bolt.x}px`,
            top: `${bolt.fromY}px`,
          }}
        />
      ))}
      {/* Bugs */}
      {bugs.map((bug) =>
        bug.isActive ? (
          <img
            alt='käfer'
            src='/minigamesgraph/käfer.png'
            key={bug.id}
            style={{
              position: "absolute",
              left: `${bug.x}px`,
              top: `${bug.y}px`,
              width: "60px",
              height: "60px",
            }}
          />
        ) : null
      )}
    </div>
  );
};

export default BugsNBolts;
