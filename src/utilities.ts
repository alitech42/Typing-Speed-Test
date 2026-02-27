import { useState } from "react";

export function useTimer(initialTime: number) {
    const [time, setTime] = useState(initialTime)

    const decreement = () => setTime(prev => prev - 1)

    return {time, decreement}
}

