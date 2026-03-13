import type { difficultyType } from "../types";
import { DifficultySelector } from "./DifficultySelector";
import { ModeSelector } from "./ModeSelector";

export function Selectors({
    difficulty,
    handleChange,
}: {
    difficulty: difficultyType;
    handleChange: (difficulty: difficultyType) => void;
}) {
    return (
        <div className="flex flex-row gap-4">
            <DifficultySelector
                difficulty={difficulty}
                handleChange={handleChange}
            />
            <ModeSelector />
        </div>
    );
}
