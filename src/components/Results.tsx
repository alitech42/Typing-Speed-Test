import { ResultCard } from "./ResultCard";

export function Results() {
    return (
        <div className="flex flex-col items-center justify-center gap-3 p-2">
            <img src="src/assets/images/icon-completed.svg" />
            <h1 className="font-bold text-3xl text-center">Test Complete!</h1>
            <p className="text-center text-[hsl(240,3%,46%)]">Solid run. Keep pushing to beat your high score</p>
            <ResultCard label="WPM" value={85} color="hsl(0,0%,100%)"/>
            <ResultCard label="Accuracy" value={90 + '%'} color="hsl(354,63%,57%)"/>
            <ResultCard label="Characters" value={30 + '/' + 3} color="hsl(140,63%,57%)"/>
        </div>
    );
}
