import React, { useState } from "react";
import { DropdownMenu } from "./Dropdown";

export function DifficultySelector() {
    const [isOpen, setIsOpen] = useState(false);
    const [difficulty, setDifficulty] = useState("easy");

    function handleClick() {
        setIsOpen((prev) => !prev);
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setDifficulty(e.target.value);
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
