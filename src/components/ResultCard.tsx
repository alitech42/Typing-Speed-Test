type ResultCardProps = {
    label: string;
    value: string | number;
    color: string
};

export function ResultCard({ label, value, color }: ResultCardProps) {
    return (
        <div className="flex flex-col w-full border border-[hsl(0,0%,15%)] rounded-2xl p-3">
            <p className="text-[hsl(240,3%,46%)]">{label}:</p>
            <p className={`text-[${color}]`}>{value}</p>
        </div>
    );
}
