import { Loader2 } from "lucide-react";

export function Loading({ message }: { message: string }) {
    return (
        <div className="w-[350px] flex items-center justify-center p-8 pb-0 flex-col gap-4 mx-auto">
            <Loader2 className="h-16 w-16 animate-spin" />
            <p className="text-center text-xs">{message}</p>
        </div>
    );
}
