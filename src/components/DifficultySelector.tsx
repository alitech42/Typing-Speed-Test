import React, { useState } from "react";

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
        <div className="border border-[hsl(240,3%,46%)] text-center w-[50%] rounded-2xl">
            <div className="relative">
                <button onClick={handleClick} className="w-full">
                    Difficulty
                </button>
                <div
                    className={`${isOpen ? "flex" : "hidden"} flex flex-col absolute border mt-2 rounded-2xl border-white w-full`}
                >
                    <div className="">
                        <label className="flex justify-center">
                            <input
                                type="radio"
                                id="easy"
                                value={"easy"}
                                name="difficulty"
                                checked={difficulty === "easy"}
                                onChange={(e) => handleChange(e)}
                            />
                            Easy
                        </label>
                    </div>
                    <div>
                        <label className="flex justify-center">
                            <input
                                type="radio"
                                id="medium"
                                value={"medium"}
                                name="difficulty"
                                checked={difficulty === "medium"}
                                onChange={(e) => handleChange(e)}
                            />
                            Medium
                        </label>
                    </div>
                    <div>
                        <label className="flex justify-center">
                            <input
                                type="radio"
                                id="hard"
                                value={"hard"}
                                name="difficulty"
                                checked={difficulty === "hard"}
                                onChange={(e) => handleChange(e)}
                            />
                            Hard
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}
