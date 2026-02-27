import { useEffect } from "react";
import "./App.css";
import { Header } from "./components/Header";
import { Selectors } from "./components/Selectors";
import { Stats } from "./components/Stats";
import { TypingDisplay } from "./components/TypingDisplay";
import data from "./data.json";
import { useTimer, useTyping, useWPM } from "./utilities";

function App() {
    const text = data.easy[Math.floor(Math.random() * data.easy.length)].text;
    const { typingIndex, typingSequence, updateStatus, increaseIndex } =
        useTyping(text);
    const { time } = useTimer(60);
    const { accuracy, netWPM } = useWPM(time, typingSequence);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const currentType = typingSequence[typingIndex];
            if (e.key === "Shift" || e.key === "Control" || e.key === "Delete")
                return;

            updateStatus(
                typingIndex,
                e.key === currentType.char ? "correct" : "false",
            );

            increaseIndex();
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [typingIndex, typingSequence]);

    return (
        <div className="flex flex-col gap-5">
            <Header />
            <Stats wpm={netWPM} accuracy={accuracy} time={time} />
            <Selectors />
            <TypingDisplay
                typingSequence={typingSequence}
                typingIndex={typingIndex}
            />
        </div>
    );
}

export default App;
