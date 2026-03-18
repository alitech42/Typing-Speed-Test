import type React from "react";
import type { difficultyType } from "../types";

type DropdownMenuProps<T extends string> = {
    name: string;
    options: T[];
    value: T;
    isOpen: boolean;
    handleChange: (value: T) => void;
};

export function DropdownMenu<T extends string>({
    name,
    options,
    value,
    isOpen,
    handleChange,
}: DropdownMenuProps<T>) {
    return (
        <div
            className={`${isOpen ? "flex" : "hidden"} flex flex-col absolute mt-2 rounded-lg bg-[hsl(0,0%,15%)] w-full`}
        >
            {options.map((option) => (
                <div key={option}>
                    <label className="flex justify-center">
                        <input
                            type="radio"
                            id={option}
                            value={option}
                            name={name}
                            checked={value === option}
                            onChange={() => handleChange(option)}
                        />
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                    </label>
                </div>
            ))}
        </div>
    );
}
