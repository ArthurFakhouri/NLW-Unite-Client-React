import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type IconButtonProps = ComponentProps<'button'> & {
    transparent?: boolean
}

export function IconButton({ children, transparent = false, ...rest }: IconButtonProps) {

    const styles = transparent ?
        "bg-black/20"
        : "bg-white/10"

    return (
        <button className={twMerge(
            "border border-white/10 rounded-md p-1.5 disabled:opacity-70 disabled:cursor-not-allowed",
            styles
        )} {...rest}>
            {children}
        </button >
    )
}