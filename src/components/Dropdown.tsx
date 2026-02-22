type DropdownMenuProps = {
    name: string;
    options: string[];
    value: string;
    isOpen: boolean;
    handleChange: React.ChangeEventHandler<HTMLInputElement>;
};

export function DropdownMenu({
    name,
    options,
    value,
    isOpen,
    handleChange,
}: DropdownMenuProps) {
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
                            onChange={(e) => handleChange(e)}
                        />
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                    </label>
                </div>
            ))}
        </div>
    );
}
