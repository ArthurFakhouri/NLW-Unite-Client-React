import logo from '../assets/logo.svg'

export function Header() {
    return (
        <header className='flex items-center gap-5 py-2'>
            <img src={logo} alt={"orange background with closed HTML tag"} />

            <nav className='flex items-center gap-5'>
                <a href='' className='font-medium text-sm text-zinc-300'>Eventos</a>
                <a href='' className='font-medium text-sm'>Participantes</a>
            </nav>
        </header>
    )
}