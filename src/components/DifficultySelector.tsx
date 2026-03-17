import { useState } from "react";
import { DropdownMenu } from "./Dropdown";
import type { difficultyType } from "../types";

export function DifficultySelector({
    difficulty,
    handleDifficulty,
}: {
    difficulty: difficultyType;
    handleDifficulty: (difficulty: difficultyType) => void;
}) {
    const [isOpen, setIsOpen] = useState(false);

    function handleClick() {
        setIsOpen((prev) => !prev);
    }

    return (
        <div className="border border-[hsl(240,3%,46%)] text-center w-[50%] rounded-lg">
            <div className="relative">
                <button
                    onClick={handleClick}
                    onKeyDown={(e) => {
                        if (e.code === "Space") {
                            e.preventDefault();
                        }
                    }}
                    className="w-full"
                >
                    Difficulty
                </button>

                <DropdownMenu
                    name="difficulty"
                    options={["easy", "medium", "hard"]}
                    value={difficulty}
                    isOpen={isOpen}
                    handleDifficulty={handleDifficulty}
                />
            </div>
        </div>
    );
}
