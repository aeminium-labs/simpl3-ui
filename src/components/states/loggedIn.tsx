import { CheckmarkIcon } from "@/components/icons";

export function LoggedIn({ message }: { message: string }) {
    return (
        <div className="s3-w-[350px] s3-flex s3-items-center s3-justify-center s3-p-8 s3-pb-0 s3-flex-col s3-gap-4 s3-mx-auto">
            <CheckmarkIcon className="s3-h-16 s3-w-16" />
            <p className="s3-text-center s3-text-xs">{message}</p>
        </div>
    );
}
