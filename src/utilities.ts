import { useState } from "react";

export function useTimer(initialTime: number) {
    const [time, setTime] = useState(initialTime)

    const increment = () => setTime(prev => prev + 1)
    const decreement = () => setTime(prev => prev - 1)

    return {time, increment, decreement}
}

