import Link from "next/link";
import nprogress from "nprogress";
import "nprogress/nprogress.css";
import React from "react";

interface Props {
    href: string;
    className?: string;
    text?: string;
}

export const LoadingLink: React.FC<Props> = ({
    href,
    className,
    text,
    children,
}) => {
    return (
        <Link href={href}>
            <a
                onClick={() => {
                    if (href !== location.pathname) {
                        nprogress.start();
                    }
                }}
                className={className ?? ""}
            >
                {text ?? null}
                {children}
            </a>
        </Link>
    );
};
