import { useState } from "react";
import { DropdownMenu } from "./Dropdown";
import type { difficultyType } from "../types";

export function DifficultySelector({
    difficulty,
    handleChange,
}: {
    difficulty: difficultyType;
    handleChange: (difficulty: difficultyType) => void;
}) {
    const [isOpen, setIsOpen] = useState(false);

    function handleClick() {
        setIsOpen((prev) => !prev);
    }

    return (
        <div className="border border-[hsl(240,3%,46%)] text-center w-[50%] rounded-lg">
            <div className="relative">
                <button onClick={handleClick} className="w-full">
                    Difficulty
                </button>

                <DropdownMenu
                    name="difficulty"
                    options={["easy", "medium", "hard"]}
                    value={difficulty}
                    isOpen={isOpen}
                    handleChange={handleChange}
                />
            </div>
        </div>
    );
}
