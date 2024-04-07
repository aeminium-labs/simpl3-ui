export function Loading({ message }: { message: string }) {
    return (
        <div className="s3-w-[350px] s3-flex s3-items-center s3-justify-center s3-p-8 s3-pb-0 s3-flex-col s3-gap-4 s3-mx-auto">
            <div className="s3-flex s3-h-14 s3-w-14 s3-items-center s3-justify-center s3-rounded-full s3-bg-gradient-to-tr s3-from-neutral-300 s3-o-neutral-500 s3-animate-spin">
                <div className="s3-h-9 s3-w-9 s3-rounded-full s3-bg-background"></div>
            </div>
            <p className="s3-text-center s3-text-xs s3-font-semibold">
                {message}
            </p>
        </div>
    );
}
