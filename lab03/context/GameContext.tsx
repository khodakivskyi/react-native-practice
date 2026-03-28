import React, { createContext, useContext, useMemo, useState } from 'react';

type TaskKey =
    | 'tap10'
    | 'doubleTap5'
    | 'longPress3s'
    | 'dragObject'
    | 'flingRight'
    | 'flingLeft'
    | 'pinchResize'
    | 'score100'
    | 'customTask';

type TasksState = Record<TaskKey, boolean>;

type GameContextType = {
    score: number;
    taps: number;
    doubleTaps: number;
    longPressDone: boolean;
    dragged: boolean;
    flingRightDone: boolean;
    flingLeftDone: boolean;
    pinchDone: boolean;
    customTaskDone: boolean;
    isDarkMode: boolean;

    addScore: (value: number) => void;
    onTap: () => void;
    onDoubleTap: () => void;
    onLongPress: () => void;
    onDrag: () => void;
    onFlingRight: () => void;
    onFlingLeft: () => void;
    onPinch: () => void;
    completeCustomTask: () => void;
    toggleTheme: () => void;

    tasks: TasksState;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
    const [score, setScore] = useState(0);
    const [taps, setTaps] = useState(0);
    const [doubleTaps, setDoubleTaps] = useState(0);
    const [longPressDone, setLongPressDone] = useState(false);
    const [dragged, setDragged] = useState(false);
    const [flingRightDone, setFlingRightDone] = useState(false);
    const [flingLeftDone, setFlingLeftDone] = useState(false);
    const [pinchDone, setPinchDone] = useState(false);
    const [customTaskDone, setCustomTaskDone] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

    const addScore = (value: number) => setScore((prev) => prev + value);

    const onTap = () => {
        setTaps((prev) => prev + 1);
        addScore(1);
    };

    const onDoubleTap = () => {
        setDoubleTaps((prev) => prev + 1);
        addScore(2);
    };

    const onLongPress = () => {
        setLongPressDone(true);
        addScore(10);
    };

    const onDrag = () => {
        setDragged(true);
        addScore(3);
    };

    const onFlingRight = () => {
        setFlingRightDone(true);
        addScore(Math.floor(Math.random() * 10) + 1);
    };

    const onFlingLeft = () => {
        setFlingLeftDone(true);
        addScore(Math.floor(Math.random() * 10) + 1);
    };

    const onPinch = () => {
        setPinchDone(true);
        addScore(5);
    };

    const completeCustomTask = () => {
        setCustomTaskDone(true);
        addScore(7);
    };

    const toggleTheme = () => setIsDarkMode((prev) => !prev);

    const tasks = useMemo(
        () => ({
            tap10: taps >= 10,
            doubleTap5: doubleTaps >= 5,
            longPress3s: longPressDone,
            dragObject: dragged,
            flingRight: flingRightDone,
            flingLeft: flingLeftDone,
            pinchResize: pinchDone,
            score100: score >= 100,
            customTask: customTaskDone,
        }),
        [taps, doubleTaps, longPressDone, dragged, flingRightDone, flingLeftDone, pinchDone, score, customTaskDone]
    );

    return (
        <GameContext.Provider
            value={{
                score,
                taps,
                doubleTaps,
                longPressDone,
                dragged,
                flingRightDone,
                flingLeftDone,
                pinchDone,
                customTaskDone,
                isDarkMode,

                addScore,
                onTap,
                onDoubleTap,
                onLongPress,
                onDrag,
                onFlingRight,
                onFlingLeft,
                onPinch,
                completeCustomTask,
                toggleTheme,

                tasks,
            }}>
            {children}
        </GameContext.Provider>
    );
};

export const useGame = () => {
    const ctx = useContext(GameContext);
    if (!ctx) throw new Error('useGame must be used inside GameProvider');
    return ctx;
};