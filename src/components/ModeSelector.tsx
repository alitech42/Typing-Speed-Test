import React, { useEffect, useState } from "react";
import { DropdownMenu } from "./DropdownMenu";

type ModeSelectorProps = {
    mode: string;
    handleMode: (value: string) => void;
};

export function ModeSelector({ mode, handleMode }: ModeSelectorProps) {
    const [isOpen, setIsOpen] = useState(false);

    function handleClick() {
        setIsOpen((prev) => !prev);
    }
    useEffect(() => {
        setIsOpen(false)
    }, [mode])

    return (
        <div className="border border-[hsl(240,3%,46%)] text-center w-[50%] rounded-2xl">
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
                    Mode
                </button>

                <DropdownMenu
                    name="mode"
                    options={["timed", "passage"]}
                    value={mode}
                    isOpen={isOpen}
                    handleChange={handleMode}
                />
            </div>
        </div>
    );
}
