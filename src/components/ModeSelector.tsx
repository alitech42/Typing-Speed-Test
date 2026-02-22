import React, { useState } from "react";
import { DropdownMenu } from "./Dropdown";

export function ModeSelector() {
    const [isOpen, setIsOpen] = useState(false);
    const [mode, setMode] = useState("timed");

    function handleClick() {
        setIsOpen((prev) => !prev);
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setMode(e.target.value);
    }

    return (
        <div className="border border-[hsl(240,3%,46%)] text-center w-[50%] rounded-2xl">
            <div className="relative">
                <button onClick={handleClick} className="w-full">
                    Mode
                </button>

                <DropdownMenu
                    name="mode"
                    options={["timed", "passage"]}
                    value={mode}
                    isOpen={isOpen}
                    handleChange={handleChange}
                />
            </div>
        </div>
    );
}
