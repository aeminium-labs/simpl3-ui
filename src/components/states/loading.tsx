export function Loading({ message }: { message: string }) {
    return (
        <div className="w-[350px] flex items-center justify-center p-8 pb-0 flex-col gap-4 mx-auto">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-neutral-300 to-neutral-500 animate-spin">
                <div className="h-9 w-9 rounded-full bg-background"></div>
            </div>
            <p className="text-center text-xs font-semibold">{message}</p>
        </div>
    );
}
