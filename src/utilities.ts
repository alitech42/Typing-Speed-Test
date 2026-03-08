import { useState, useEffect } from "react";

export function useTyping(text: string) {
    const [typingIndex, setTypingIndex] = useState(0);
    const [typingSequence, setTypingSequence] = useState(() => {
        const splittedText = text.split("");
        return splittedText.map((char) => ({ char, status: "undefined" }));
    });
    const [startingIndex, setStartingIndex] = useState(0);

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

    const getNewSequence = (text: string) => {
        setTypingSequence((prev) => {
            const splittedText = text.split("");
            setStartingIndex(() => prev.length);
            return [
                ...prev,
                ...splittedText.map((char) => ({ char, status: "undefined" })),
            ];
        });
    };

    const resetSequence = (text: string) => {
        setTypingSequence(() => {
            const splittedText = text.split("");
            return splittedText.map((char) => ({ char, status: "undefined" }));
        });
        setTypingIndex(0);
        setStartingIndex(0);
    };

    const increaseIndex = () => setTypingIndex((prev) => prev + 1);

    return {
        typingIndex,
        startingIndex,
        typingSequence,
        updateStatus,
        increaseIndex,
        getNewSequence,
        resetSequence,
    };
}

export function useTimer(initialTime: number) {
    const [time, setTime] = useState(initialTime);
    const isDone = time === 0;

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);

    const resetTimer = () => setTime(initialTime);

    return { time, isDone, resetTimer };
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
    const [best, setBest] = useState(0);

    const updateBest = (newBest: number) => setBest(newBest);

    return {
        accuracy,
        grossWPM,
        netWPM,
        correctTypes,
        falseTypes,
        best,
        updateBest,
    };
}
