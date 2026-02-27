import { useState } from "react";

export function useTimer(initialTime: number) {
    const [time, setTime] = useState(initialTime)

    const decreement = () => setTime(prev => prev - 1)

    return {time, decreement}
}

export function useWPM(time: number, typingSequence: {char: string, status: string}[]) {
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

    return {accuracy, grossWPM, netWPM}
}