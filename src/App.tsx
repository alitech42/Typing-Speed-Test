import { useEffect, useState } from "react";
import "./App.css";
import { Header } from "./components/Header";
import { Selectors } from "./components/Selectors";
import { Stats } from "./components/Stats";
import { TypingDisplay } from "./components/TypingDisplay";
import data from "./data.json";
import { useTimer, useWPM } from "./utilities";

function App() {
    const [typingIndex, setTypingIndex] = useState(0);
    const [typingSequence, setTypingSequence] = useState(() => {
        const text =
            data.easy[Math.floor(Math.random() * data.easy.length)].text;
        const splittedText = text.split("");
        return splittedText.map((char) => ({ char, status: "undefined" }));
    });
    const {time, decreement} = useTimer(60);
    const {accuracy, grossWPM, netWPM} = useWPM(time, typingSequence)
    useEffect(() => console.log(typingSequence), [typingSequence]);

    useEffect(() => {
        const intervalId = setInterval(() => {
                if (time <= 0) {
                    clearInterval(intervalId);
                    return 0;
                };
                decreement()
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => console.log(time), [time]);
    useEffect(() => console.log(`The wpm is ${netWPM}`), [time]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const currentType = typingSequence[typingIndex];
            if (e.key === "Shift" || e.key === "Control" || e.key === "Delete")
                return;

            if (e.key === currentType.char) {
                setTypingSequence((prev) =>
                    prev.map((char, index) =>
                        index === typingIndex
                            ? { ...char, status: "correct" }
                            : char,
                    ),
                );
                console.log("xdddd");
            } else {
                setTypingSequence((prev) =>
                    prev.map((char, index) =>
                        index === typingIndex
                            ? { ...char, status: "false" }
                            : char,
                    ),
                );
                console.log("LOL");
            }

            setTypingIndex((prev) => prev + 1);
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    });

    useEffect(() => console.log(typingIndex), [typingIndex]);

    return (
        <div className="flex flex-col gap-5">
            <Header />
            <Stats wpm={grossWPM} accuracy={accuracy} time={time} />
            <Selectors />
            <TypingDisplay
                typingSequence={typingSequence}
                typingIndex={typingIndex}
            />
        </div>
    );
}

export default App;
