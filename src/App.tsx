import { useEffect } from "react";
import "./App.css";
import { Header } from "./components/Header";
import { Selectors } from "./components/Selectors";
import { Stats } from "./components/Stats";
import { TypingDisplay } from "./components/TypingDisplay";
import data from "./data.json";
import { useTimer, useTyping, useWPM } from "./utilities";
import { Results } from "./components/Results";

function App() {
    const text = data.easy[Math.floor(Math.random() * data.easy.length)].text;
    const {
        typingIndex,
        typingSequence,
        startingIndex,
        updateStatus,
        increaseIndex,
        getNewSequence,
        resetSequence
    } = useTyping(text);
    const { time, isDone, resetTimer } = useTimer(60);
    const { accuracy, netWPM, correctTypes, falseTypes, best, updateBest } = useWPM(
        time,
        typingSequence,
    );

    useEffect(() => {
        if (isDone) {
            if(best < netWPM) {
                updateBest(netWPM)
            }
            return
        };
        const handleKeyDown = (e: KeyboardEvent) => {
            if (isDone) return;
            const currentType = typingSequence[typingIndex];
            if (e.key.length > 1)
                return;

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
            <Header best={best}/>
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
                    resetters={[resetTimer, () => resetSequence(data.easy[Math.floor(Math.random() * data.easy.length)].text)]}
                />
            )}
        </div>
    );
}

export default App;
