"use client";

import { useState, useRef, useEffect, ChangeEvent} from "react";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";

export default function Countdown (){
    const [duration, setDuration] = useState<number | string>("");
    const [timeLeft, setTimeleft] = useState<number>(0);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [isPauesed, setIsPaused] = useState<boolean>(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const handleSetDuration = (): void => {
        if(typeof duration === "number" && duration >0){
            setTimeleft(duration);
            setIsActive(false);
            setIsPaused(false);
            if(timerRef.current){
                clearInterval(timerRef.current);
            }
        }
    };

    const handleStart = (): void => {
        if(timeLeft > 0){
            setIsActive(true);
            setIsPaused(false);
        }
    };

    const handlePause = (): void => {
        if(isActive){
            setIsPaused(true);
            setIsActive(false);
            if(timerRef.current){
                clearInterval(timerRef.current)
            }
        }
    };

    const handleReset = (): void => {
        setIsActive(false);
        setIsPaused(false);
        setTimeleft(typeof duration === "number"? duration : 0);
        if(timerRef.current){
            clearInterval(timerRef.current);
        }
    };

    useEffect(() => {
        if(isActive && !isPauesed){
            timerRef.current = setInterval(() => {
             setTimeleft((prevTime) => {
                if(prevTime <= 1){
                    clearInterval(timerRef.current!)
                    return 0;
                }
                return prevTime -1;
             });
            }, 1000);
        }
        return () => {
            if(timerRef.current){
                clearInterval(timerRef.current)
            }
        };
    }, [isActive, isPauesed]);

    const formatTime = (time : number): string => {
        const minutes = Math.floor(time/60);
        const seconds = time % 60;
        return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
    };

    const handleDurationChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setDuration(Number(e.target.value) || "");
    };
    return (
        // container div for centering the content
        <div className=" flex flex-col items-center justify-center h-screen bg-yellow-200 dark:bg-gray-900"> 
            {/* Timer Box Container */}
            <div className="rounded-2xl bg-gray-400 dark:bg-gray-800 shadow-lg p-8 w-full max-w-md">
                {/* Title of the countdown timer */}
                <h1 className="text-4xl placeholder-green-700 font-bold mb-4 black dark:text-gray-200 text-center">
                    Countdown Timer
                </h1>
                {/* Input and set button container */}
                <div className="flex items-center mb-6">
                    <input 
                      type="number" 
                      id="duration"
                      placeholder="Enter duration in seconds"
                      value={duration}
                      onChange={handleDurationChange}
                      className=" flex-1 mr-4 rounded-2xl border-gray-300 placeholder:text-xl text-xl type: font-2xl p-5 mt-4 dark:border-gray "
                />
                <Button
                  onClick={handleSetDuration}
                  variant="outline"
                  className="rounded-2xl mr-[-17px] font-bold hover:bg-gray-200 text-white dark:teat-gray-200 mt-4 bg-black"
                  >
                    Set
                  </Button>
            </div>     
            <hr className="mt-[50px] bg-black h-1"/>
            {/* Display the formatted time left */}
            <div className="text-7xl font-bold text-black dark:text-gray-200 p-5 items-center justify-center m-20 ml-[75px] mt-11 mb-13">
                {formatTime(timeLeft)}
            </div>
            <hr className="mb-[50px] bg-black h-1" />
            {/* Button to start, pause, and reset the timer */}
            <div className="flex justify-center gap-4">
                <Button
                  onClick={handleStart}
                  variant="outline"
                  className="rounded-xl font-bold hover:bg-gray-200 text-white bg-black dark:text-gray-200"
                  >
                    {isPauesed ? "Resume" : "Start"}
                  </Button>
                  <Button
                  onClick={handlePause}
                  variant="outline"
                  className="rounded-xl font-bold hover:bg-gray-200 text-white bg-black dark:text-gray-200"
                  >
                    Pause
                  </Button>
                  <Button
                  onClick={handleReset}
                  variant="outline"
                  className="rounded-xl font-bold hover:bg-gray-200 text-white bg-black dark:text-gray-200"
                  >
                    Reset
                  </Button>
                </div>
            </div>
        </div>
    );
}
