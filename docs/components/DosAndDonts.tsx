interface DosAndDontsProps {
    dos: string[];
    donts: string[];
}

export function DosAndDonts({
    dos,
    donts,
}: DosAndDontsProps): React.ReactElement {
    return (
        <div className="my-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-lg border-2 border-green-200 bg-green-50/50 p-4">
                <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-green-800">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-600 text-white text-xs">
                        ✓
                    </span>
                    Do
                </h4>
                <ul className="space-y-2">
                    {dos.map((item, i) => (
                        <li key={i} className="text-sm text-green-900">
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="rounded-lg border-2 border-red-200 bg-red-50/50 p-4">
                <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-red-800">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-white text-xs">
                        ✕
                    </span>
                    Don&apos;t
                </h4>
                <ul className="space-y-2">
                    {donts.map((item, i) => (
                        <li key={i} className="text-sm text-red-900">
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
