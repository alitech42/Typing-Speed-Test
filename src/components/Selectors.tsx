import type { difficultyType } from "../types";
import { DifficultySelector } from "./DifficultySelector";
import { ModeSelector } from "./ModeSelector";

type SelectorsProps = {
    difficulty: difficultyType;
    mode: string;
    handleDifficulty: (difficulty: difficultyType) => void;
    handleMode: (mode: string) => void;
};

export function Selectors({
    difficulty,
    mode,
    handleDifficulty,
    handleMode,
}: SelectorsProps) {
    return (
        <div className="flex flex-row gap-4">
            <DifficultySelector
                difficulty={difficulty}
                handleDifficulty={handleDifficulty}
            />
            <ModeSelector mode={mode} handleMode={handleMode} />
        </div>
    );
}
