import { useEffect, useState } from "react";
import "./App.css";
import { Header } from "./components/Header";
import { Selectors } from "./components/Selectors";
import { Stats } from "./components/Stats";
import { TypingDisplay } from "./components/TypingDisplay";
import data from "./data.json";
import { useTimer, useTyping, useWPM } from "./utilities";
import { Results } from "./components/Results";
import type { ScoreType } from "./types";

function App() {
    const text = data.easy[Math.floor(Math.random() * data.easy.length)].text;
    const {
        typingIndex,
        typingSequence,
        startingIndex,
        updateStatus,
        increaseIndex,
        getNewSequence,
        resetSequence,
    } = useTyping(text);
    const { time, isDone, resetTimer } = useTimer(10);
    const {
        accuracy,
        netWPM,
        scoreUI,
        correctTypes,
        falseTypes,
        best,
        updateBest,
    } = useWPM(time, typingSequence);
    const [isFirstRun, setIsFirstRun] = useState(true);

    const scoreStatus: ScoreType = isFirstRun
        ? "firstScore"
        : netWPM >= best
          ? "newHighScore"
          : "belowHighScore";

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
        if (isDone) return;
        if (typingIndex === typingSequence.length) {
            const text =
                data.easy[Math.floor(Math.random() * data.easy.length)].text;
            getNewSequence(text);
        }
    }, [typingIndex, typingSequence.length]);

    useEffect(() => console.log(startingIndex), [startingIndex]);

    return (
        <div className="flex flex-col gap-5">
            <Header best={best} />
            {!isDone ? (
                <>
                    <Stats wpm={netWPM} accuracy={accuracy} time={time} />
                    <Selectors />
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
                        () =>
                            resetSequence(
                                data.easy[
                                    Math.floor(Math.random() * data.easy.length)
                                ].text,
                            ),
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
