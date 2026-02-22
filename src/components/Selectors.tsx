import { DifficultySelector } from "./DifficultySelector";
import { ModelSelector } from "./ModeSelector";

export function Selectors() {
    return (
        <div className="flex flex-row gap-4">
            <DifficultySelector />
            <ModelSelector />
        </div>
    );
}
