import { DifficultySelector } from "./DifficultySelector";
import { ModeSelector } from "./ModeSelector";

export function Selectors() {
    return (
        <div className="flex flex-row gap-4">
            <DifficultySelector />
            <ModeSelector />
        </div>
    );
}
