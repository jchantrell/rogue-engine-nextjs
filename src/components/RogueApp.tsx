/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useSession } from "next-auth/react";
import React from "react";
import { useState, useEffect } from "react";
import { popupCenter } from "~/utils/popupWindow";
import LoadScreen from "./LoadScreen";

export const RogueApp = () => {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const onLoad = () => {
    window["rogue-engine"].Runtime.onPlay(() => {
      setLoaded(true);
    });
  };

  const unloadPrevious = () => {
    window["rogue-engine"].Runtime.stop();
  };

  const startGame = () => {
    // if previous instance just remove it
    if (window["rogue-engine"]) {
      const previousScript = document.getElementById("rogue-script");
      previousScript?.remove();
      unloadPrevious();
    }

    // create new instance
    const script = document.createElement("script");
    script.id = "rogue-script";
    script.src = "rogue_DATA/build.js";
    script.async = true;
    script.defer = true;
    script.crossOrigin = "anonymous";
    script.onload = () => {
      setHasLoaded(true);
      onLoad();
    };
    document.body.append(script);
  };

  useEffect(() => {
    if (hasLoaded === true) {
      setIsReady(true);
    }
  }, [hasLoaded]);

  return (
    <>
      {isReady ? (
        <div id="rogue-app"
         className="w-full flex-1 select-none overflow-hidden">
          {loaded ? <></> : <LoadScreen />}
          <canvas id="rogue-canvas"></canvas>
        </div>
      ) : (
        // Can be used to lock the play button behind an active login session
        // <div className="flex flex-1 justify-center">
        //   {session ? (
        //     <button
        //       className="btn-xs btn self-center sm:btn-sm md:btn-md lg:btn-lg"
        //       onClick={startGame}
        //     >
        //       Play!
        //     </button>
        //   ) : (
        //     <div
        //       className="cursor-pointer select-none self-center underline"
        //       onClick={() => popupCenter("/signin", "xtf", window, 900, 1000)}
        //     >
        //       Sign in to play
        //     </div>
        //   )}
        // </div>
        <div className="flex flex-1 justify-center">
          <button
            className="btn-xs btn self-center sm:btn-sm md:btn-md lg:btn-lg"
            onClick={startGame}
          >
            Play!
          </button>
        </div>
      )}
    </>
  );
};
