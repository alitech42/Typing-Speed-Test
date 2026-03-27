import { useState, useEffect } from "react";
import { DropdownMenu } from "./DropdownMenu";
import type { difficultyType } from "../types";

type DifficultySelectorProps = {
    difficulty: difficultyType;
    handleDifficulty: (value: difficultyType) => void;
};

export function DifficultySelector({
    difficulty,
    handleDifficulty,
}: DifficultySelectorProps) {
    const [isOpen, setIsOpen] = useState(false);

    function handleClick() {
        setIsOpen((prev) => !prev);
    }
    useEffect(() => {
        setIsOpen(false);
    }, [difficulty]);

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
                    handleChange={handleDifficulty}
                />
            </div>
        </div>
    );
}
