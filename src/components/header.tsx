import logo from '../assets/logo.svg'
import { NavLink } from './nav-link'

export function Header() {
    return (
        <header className='flex items-center gap-5 py-2'>
            <img src={logo} alt={"orange background with closed HTML tag"} />

            <nav className='flex items-center gap-5'>
                <NavLink href=''>Eventos</NavLink>
                <NavLink href=''>Participantes</NavLink>
            </nav>
        </header>
    )
}