type TypingDisplayProps = {
    typingSequence: { char: string; status: string }[];
    typingIndex: number;
};

export function TypingDisplay({
    typingSequence,
    typingIndex,
}: TypingDisplayProps) {
    return (
        <div>
            {typingSequence.map(({ char, status }, index) => (
                <span
                    className={`${status === "correct" ? "text-green-500" : status === "false" ? "text-red-600 border-b-3 border-red-600" : "text-[hsl(240,1%,59%)]"} ${typingIndex === index && "bg-[hsl(0,0%,15%)]"} text-4xl`}
                >
                    {char}
                </span>
            ))}
        </div>
    );
}
