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
                    className={`${status === "correct" ? "text-[hsl(140,63%,57%)]" : status === "false" ? "text-[hsl(354,63%,57%)] border-b-3 border-[hsl(354,63%,57%)]" : "text-[hsl(240,1%,59%)]"} ${typingIndex === index && "bg-[hsl(0,0%,15%)]"} text-4xl`}
                >
                    {char}
                </span>
            ))}
        </div>
    );
}
