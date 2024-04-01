import { CheckmarkIcon } from "@/components/icons";

export function LoggedIn({ message }: { message: string }) {
    return (
        <div className="w-[350px] flex items-center justify-center p-8 pb-0 flex-col gap-4 mx-auto">
            <CheckmarkIcon className="h-16 w-16" />
            <p className="text-center text-xs">{message}</p>
        </div>
    );
}
