import { useEffect, useState } from "react";
import "./App.css";
import { Header } from "./components/Header";
import { Selectors } from "./components/Selectors";
import { Stats } from "./components/Stats";
import { TypingDisplay } from "./components/TypingDisplay";
import { getRandomText, useTimer, useTyping, useWPM } from "./utilities";
import { Results } from "./components/Results";
import type { difficultyType, ScoreType } from "./types";

function App() {
    const [selectedDifficulty, setSelectedDifficulty] =
        useState<difficultyType>("easy");
    const [selectedMode, setSelectedMode] = useState("timed");
    const text = getRandomText(selectedDifficulty);
    const {
        typingIndex,
        typingSequence,
        startingIndex,
        isPassageFinished,
        updateStatus,
        increaseIndex,
        getNewSequence,
        resetSequence,
    } = useTyping(text);
    const { time, isDone, resetTimer } = useTimer(60, selectedMode);
    const {
        accuracy,
        netWPM,
        scoreUI,
        correctTypes,
        falseTypes,
        best,
        updateBest,
    } = useWPM(time, selectedMode, typingSequence);
    const [isFirstRun, setIsFirstRun] = useState(true);
    const isFinished = selectedMode === "timed" ? isDone : isPassageFinished;
    const scoreStatus: ScoreType = isFirstRun
        ? "firstScore"
        : netWPM >= best
          ? "newHighScore"
          : "belowHighScore";

    function handleDifficulty(difficulty: difficultyType) {
        setSelectedDifficulty(difficulty);
    }

    function handleMode(mode: string) {
        setSelectedMode(mode);
    }

    useEffect(() => {
        resetSequence(getRandomText(selectedDifficulty));
        resetTimer();
    }, [selectedDifficulty, selectedMode]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (isDone) return;
            const currentType = typingSequence[typingIndex];
            if (e.key.length > 1) return;

            updateStatus(
                typingIndex,
                e.key === currentType.char ? "correct" : "false",
            );

            increaseIndex();
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [typingIndex, typingSequence, isDone]);

    useEffect(() => {
        if (isDone) {
            if (!best || best < netWPM) {
                updateBest(netWPM);
            }
            return;
        }
    }, [isDone]);

    useEffect(() => {
        if (isFinished) return;
        if (isPassageFinished) {
            const text = getRandomText(selectedDifficulty);
            getNewSequence(text);
        }
    }, [typingIndex, typingSequence.length]);

    useEffect(() => console.log(startingIndex), [startingIndex]);

    return (
        <div className="flex flex-col gap-5">
            <Header best={best} />
            {!isFinished ? (
                <>
                    <Stats wpm={netWPM} accuracy={accuracy} time={time} />
                    <Selectors
                        difficulty={selectedDifficulty}
                        handleDifficulty={(value: difficultyType) =>
                            handleDifficulty(value)
                        }
                        mode={selectedMode}
                        handleMode={(value: string) => handleMode(value)}
                    />
                    <TypingDisplay
                        typingSequence={typingSequence.slice(startingIndex)}
                        typingIndex={typingIndex - startingIndex}
                    />
                </>
            ) : (
                <Results
                    wpm={netWPM}
                    accuracy={accuracy}
                    correctTypes={correctTypes}
                    falseTypes={falseTypes}
                    resetters={[
                        resetTimer,
                        () => resetSequence(getRandomText(selectedDifficulty)),
                        () => setIsFirstRun(false),
                    ]}
                    scoreStatus={scoreStatus}
                    scoreUI={scoreUI}
                />
            )}
        </div>
    );
}

export default App;
