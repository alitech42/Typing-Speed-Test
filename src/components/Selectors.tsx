import type { difficultyType } from "../types";
import { DifficultySelector } from "./DifficultySelector";
import { ModeSelector } from "./ModeSelector";

export function Selectors({
    difficulty,
    mode,
    handleDifficulty,
    handleMode,
}: {
    difficulty: difficultyType;
    mode:string;
    handleDifficulty: (difficulty: difficultyType) => void;
    handleMode: (mode: string) => void
}) {
    return (
        <div className="flex flex-row gap-4">
            <DifficultySelector
                difficulty={difficulty}
                handleDifficulty={handleDifficulty}
            />
            <ModeSelector mode={mode} handleMode={handleMode}/>
        </div>
    );
}
