/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useSession } from "next-auth/react";
import React from "react";
import { useState, useEffect } from "react";
import { popupCenter } from "~/utils/popupWindow";
import LoadScreen from "./LoadScreen";

export const RogueApp = () => {
  const [fps, setFps] = useState(0);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const { data: session, status } = useSession();
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
    script.src = "WarriorsArena_DATA/build.js";
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

  let startTime = Date.now();
  let frame = 0;

  function tick() {
    if (typeof window !== "undefined") {
      const time = Date.now();
      frame++;
      if (time - startTime > 1000) {
        const val = (frame / ((time - startTime) / 1000)).toFixed(1);
        setFps(parseInt(val));
        startTime = time;
        frame = 0;
      }
      window.requestAnimationFrame(tick);
    }
  }

  useEffect(() => {
    tick();
  });
  return (
    <>
      {isReady ? (
        <>
          <div
            className="relative w-full flex-1 select-none overflow-hidden"
            id="rogue-app"
          >
            {loaded ? <></> : <LoadScreen />}
            <div
              id="rogue-ui"
              className="absolute h-full w-full overflow-hidden"
            >
              <div className="absolute p-1">{fps}</div>
              <div className="health-bars mt-2 w-full pt-4">
                <div
                  className="health-bar float-left ml-2 mt-1 h-8 w-1/4 rounded-lg bg-[#aaaaaa55]"
                  id="health-bar-1"
                >
                  <div className="h-full w-full rounded-lg bg-gray-200"></div>
                </div>
                <div
                  className="health-bar float-right mr-2 mt-1 h-8 w-1/4 rounded-lg bg-[#aaaaaa55]"
                  id="health-bar-2"
                >
                  <div className="h-full w-full rounded-lg bg-gray-200"></div>
                </div>
              </div>
            </div>
            <canvas id="rogue-canvas"></canvas>
          </div>
        </>
      ) : (
        <div className="flex flex-1 justify-center">
          {session ? (
            <button
              className="btn-xs btn self-center sm:btn-sm md:btn-md lg:btn-lg"
              onClick={startGame}
            >
              Play!
            </button>
          ) : (
            <div
              className="cursor-pointer select-none self-center underline"
              onClick={() => popupCenter("/signin", "xtf", window, 900, 1000)}
            >
              Sign in to play
            </div>
          )}
        </div>
      )}
    </>
  );
};
