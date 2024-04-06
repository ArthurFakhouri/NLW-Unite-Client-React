import { ComponentProps } from "react"

type NavLinkProps = ComponentProps<'a'>

export function NavLink({
    children,
    href,
    ...rest
}: NavLinkProps) {
    return (
        <a {...rest} href={href} className='font-medium text-sm'>{children}</a>
    )
}