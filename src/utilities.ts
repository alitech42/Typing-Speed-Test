import { useState, useEffect } from "react";

export function useTyping(text: string) {
    const [typingIndex, setTypingIndex] = useState(0);
    const [typingSequence, setTypingSequence] = useState(() => {
        const splittedText = text.split("");
        return splittedText.map((char) => ({ char, status: "undefined" }));
    });

    const updateStatus = (index: number, status: string) => {
        setTypingSequence((prev) =>
            prev.map((char, i) =>
                i === index
                    ? {
                          ...char,
                          status,
                      }
                    : char,
            ),
        );
    };

    const increaseIndex = () => setTypingIndex((prev) => prev + 1);

    return { typingIndex, typingSequence, updateStatus, increaseIndex };
}

export function useTimer(initialTime: number) {
    const [time, setTime] = useState(initialTime);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime((prev) => {
                if (prev <= 0) {
                    clearInterval(intervalId);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);

    return { time };
}

export function useWPM(
    time: number,
    typingSequence: { char: string; status: string }[],
) {
    const minutes = (60 - time) / 60;
    const correctTypes = typingSequence.filter(
        ({ status }) => status === "correct",
    ).length;
    const falseTypes = typingSequence.filter(
        ({ status }) => status === "false",
    ).length;
    const accuracy = (correctTypes / (correctTypes + falseTypes)) * 100;
    const grossWPM = (correctTypes + falseTypes) / 5 / minutes;
    const netWPM = grossWPM - falseTypes / minutes;

    return { accuracy, grossWPM, netWPM };
}
