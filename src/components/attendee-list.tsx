import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal, Search } from "lucide-react";
import { IconButton } from "./icon-button";
import { Table } from "./table/table";
import { TableHeader } from "./table/table-header";
import { TableCell } from "./table/table-cell";
import { TableRow } from "./table/table-row";
import { ChangeEvent, useEffect, useState } from "react";
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

type AttendeeProps = {
    id: string
    name: string
    email: string
    createdAt: string
    checkedInAt: string | null
}

export function AttendeeList() {

    const [search, setSearch] = useState(() => {
        const url = new URL(window.location.toString())

        if (url.searchParams.get("search")) {
            return url.searchParams.get("search") ?? ""
        }

        return ""
    })

    const [page, setPage] = useState(() => {
        const url = new URL(window.location.toString())

        if (url.searchParams.get('pageIndex')) {
            return Number(url.searchParams.get('pageIndex'))
        }

        return 1
    })
    const [attendees, setAttendees] = useState([] as AttendeeProps[])
    const [totalAttendees, setTotalAttendees] = useState(0)

    const totalPages = Math.ceil(totalAttendees / 10)

    useEffect(() => {
        const url = new URL(`${import.meta.env.VITE_API_URL}/events/ad34a061-2e35-4b99-a5aa-a8e778f04d73/attendees`)
        url.searchParams.set("pageIndex", (page - 1).toString())
        if (search)
            url.searchParams.set("query", search)
        fetch(url)
            .then(response => response.json())
            .then((data) => {
                setAttendees(data.attendees)
                setTotalAttendees(data.totalAttendees)
            })
    }, [page, search])

    function setCurrentPage(page: number) {
        const url = new URL(window.location.toString())

        url.searchParams.set('pageIndex', String(page))

        window.history.pushState({}, "", url)
        setPage(page)
    }

    function setCurrentSearch(search: string) {
        const url = new URL(window.location.toString())

        url.searchParams.set('search', search)

        window.history.pushState({}, "", url)

        setSearch(search)
    }

    function goToFirstPage() {
        setCurrentPage(1)
    }

    function goToPreviousPage() {
        setCurrentPage(page - 1)
    }

    function goToNextPage() {
        setCurrentPage(page + 1)
    }

    function goToLastPage() {
        setCurrentPage(totalPages)
    }

    function handleChangeSearch(event: ChangeEvent<HTMLInputElement>) {
        setCurrentSearch(event.target.value)
        setCurrentPage(1)
    }

    return (
        <section className="flex flex-col gap-5">
            <div className="flex gap-3 items-center">
                <h1 className="text-2xl font-bold">Participantes</h1>
                <label className="px-3 w-72 py-1.5 border border-white/10 rounded-lg bg-transparent flex items-center gap-3">
                    <Search className="size-4 text-emerald-300" />
                    <input
                        type="text"
                        className="bg-transparent flex-1 outline-none border-0 p-0 text-sm"
                        placeholder="Buscar participante..."
                        value={search}
                        onChange={handleChangeSearch}
                    />
                </label>
            </div>
            <Table>
                <thead>
                    <tr className="border-b border-white/10">
                        <TableHeader style={{ width: 4 }}>
                            <input type="checkbox" className="size-4 bg-black/20 rounded border border-white/10 checked:accent-orange-400" />
                        </TableHeader>
                        <TableHeader>Código</TableHeader>
                        <TableHeader>Participante</TableHeader>
                        <TableHeader>Data de inscrição</TableHeader>
                        <TableHeader>Data do check-in</TableHeader>
                        <TableHeader style={{ width: 64 }}></TableHeader>
                    </tr>
                </thead>
                <tbody>
                    {attendees.map((attendee, index) => {
                        return (
                            <TableRow key={index}>
                                <TableCell>
                                    <input type="checkbox" className="size-4 bg-black/20 rounded border bord1er-white/10 checked:accent-orange-400" />
                                </TableCell>
                                <TableCell>{attendee.id}</TableCell>
                                <TableCell>
                                    <div className="flex flex-col gap-1">
                                        <span className="font-semibold text-white">{attendee.name}</span>
                                        <span>{attendee.email}</span>
                                    </div>
                                </TableCell>
                                <TableCell>{formatDistanceToNow(attendee.createdAt, { locale: ptBR, addSuffix: true })}</TableCell>
                                <TableCell>
                                    {!attendee.checkedInAt && <span className="text-zinc-400">Não fez check-in</span>}
                                    {attendee.checkedInAt && formatDistanceToNow(attendee.checkedInAt, { locale: ptBR, addSuffix: true })}
                                </TableCell>
                                <TableCell>
                                    <IconButton transparent>
                                        <MoreHorizontal className="size-4" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </tbody>
                <tfoot>
                    <tr>
                        <TableCell colSpan={3}>Mostrando {attendees.length} de {totalAttendees} itens</TableCell>
                        <TableCell className="text-right" colSpan={3}>
                            <div className="inline-flex items-center gap-8">
                                <span>Página {page} de {totalPages}</span>
                                <div className="flex gap-1.5">
                                    <IconButton disabled={page === 1} onClick={goToFirstPage}>
                                        <ChevronsLeft className="size-4" />
                                    </IconButton>
                                    <IconButton disabled={page === 1} onClick={goToPreviousPage}>
                                        <ChevronLeft className="size-4" />
                                    </IconButton>
                                    <IconButton disabled={page === totalPages} onClick={goToNextPage}>
                                        <ChevronRight className="size-4" />
                                    </IconButton>
                                    <IconButton disabled={page === totalPages} onClick={goToLastPage}>
                                        <ChevronsRight className="size-4" />
                                    </IconButton>
                                </div>
                            </div>
                        </TableCell>
                    </tr>
                </tfoot>
            </Table>
        </section >
    )
}