import { ComponentProps } from "react"

type TableHeaderProps = ComponentProps<'th'>

export function TableHeader({ children, ...rest }: TableHeaderProps) {
    return (
        <th {...rest} className="py-3 px-4 text-sm font-semibold text-left">
            {children}
        </th>
    )
}