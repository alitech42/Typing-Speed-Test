import { ResultCard } from "./ResultCard";

type ResultsProps = {
    wpm: number;
    accuracy: number;
    correctTypes: number;
    falseTypes: number;
    resetters: (() => void)[];
};

export function Results({
    wpm,
    accuracy,
    correctTypes,
    falseTypes,
    resetters,
}: ResultsProps) {
    const handleReset = () => resetters.forEach((resetter) => resetter());

    return (
        <div className="flex flex-col items-center justify-center gap-3 p-2">
            <img src="src/assets/images/icon-completed.svg" />
            <h1 className="font-bold text-3xl text-center">Test Complete!</h1>
            <p className="text-center text-[hsl(240,3%,46%)]">
                Solid run. Keep pushing to beat your high score
            </p>
            <div className="flex flex-col gap-5 w-full sm:flex-row sm:w-[50%] stretch">
                <ResultCard
                    label="WPM"
                    value={wpm.toFixed(0)}
                    color="hsl(0,0%,100%)"
                />
                <ResultCard
                    label="Accuracy"
                    value={accuracy.toFixed(2) + "%"}
                    color="hsl(354,63%,57%)"
                />
                <ResultCard
                    label="Characters"
                    value={correctTypes + "/" + falseTypes}
                    color="hsl(140,63%,57%)"
                />
            </div>
            <button
                className="bg-[hsl(0,0%,100%)] text-[hsl(0,0%,7%)] p-3 rounded-2xl font-bold mt-5"
                onClick={handleReset}
            >
                Go Again
            </button>
        </div>
    );
}
