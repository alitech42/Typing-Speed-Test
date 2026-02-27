type StatsProps = {
    wpm: number
    accuracy: number
    time: number
}

export function Stats({wpm, accuracy, time}: StatsProps) {
    return (
        <div className="flex flex-row justify-around">
            <div className="text-[hsl(240,1%,59%)]">
                <h2 className="text-[hsl(240,1%,59%)]">WPM: {wpm.toFixed(2)}</h2>
            </div>
            <div>
                <h2 className="text-[hsl(240,1%,59%)]">Accuracy: {accuracy.toFixed(2)}</h2>
            </div>
            <div>
                <h2 className="text-[hsl(240,1%,59%)]">Time: {time}</h2>
            </div>
        </div>
    );
}
