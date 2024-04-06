import { ComponentProps } from "react"

type TableRowProps = ComponentProps<'tr'>

export function TableRow({ children, className, ...rest }: TableRowProps) {
    return (
        <tr {...rest} className="border-b border-white/10 hover:bg-white/5 hover:cursor-pointer">
            {children}
        </tr>
    )
}