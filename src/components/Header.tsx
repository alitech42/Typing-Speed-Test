export function Header() {
    return (
        <header className="flex justify-between p-2">
            <div>
                <img
                    src="src/assets/images/logo-large.svg"
                    alt=""
                    className="hidden sm:block"
                />
                <img
                    src="src/assets/images/logo-small.svg"
                    alt=""
                    className="sm:hidden"
                />
            </div>
            <div>
                <p className="text-[hsl(240,3%,46%)] flex flex-row gap-2">
                    <img
                        src="src/assets/images/icon-personal-best.svg"
                        alt=""
                    />
                    Best:
                </p>
            </div>
        </header>
    );
}
