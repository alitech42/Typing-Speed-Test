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
    const {time} = useTimer(60);
    const { accuracy, netWPM } = useWPM(time, typingSequence);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const currentType = typingSequence[typingIndex];
            if (e.key === "Shift" || e.key === "Control" || e.key === "Delete")
                return;

            setTypingSequence((prev) =>
                prev.map((char, index) =>
                    index === typingIndex
                        ? {
                              ...char,
                              status:
                                  e.key === currentType.char
                                      ? "correct"
                                      : "false",
                          }
                        : char,
                ),
            );

            setTypingIndex((prev) => prev + 1);
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    });


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
