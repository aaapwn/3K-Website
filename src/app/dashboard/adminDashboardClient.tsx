'use client'

import { useState, useMemo } from "react"
import Link from "next/link"
import { Button } from "@heroui/react"
import { Chip } from "@heroui/react"
import { Card, CardBody, CardHeader } from "@heroui/react"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@heroui/react"
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@heroui/react';
import { ArrowLeft, CalendarIcon } from "lucide-react"
import { format, parseISO } from "date-fns"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

export default function AdminDashboardClient({ data }: { data: { matches: Record<string, { id: number; time: string; sport: string; homeTeam: string; awayTeam: string; venue: string; }[]>; players: Record<number, { homeTeam: { id: number; name: string; registered: boolean; }[]; awayTeam: { id: number; name: string; registered: boolean; }[]; }> } }) {

    const [selectedDate, setSelectedDate] = useState<string>("2024-06-15")

    const handleDateChange = (date: string) => {
        console.log("Selected date changed to:", date)
        setSelectedDate(date)
    }

    const availableDates = useMemo(() => {
        return Object.keys(data.matches).sort()
    }, [])

    const matches = data.matches[selectedDate] || []

    return (
        <div className="min-h-screen bg-white flex">
            {/* Sidebar */}
            <aside className="w-64 bg-[#E35205] text-white p-6">
                <Link href="/" className="flex items-center mb-6">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Home
                </Link>
                <h2 className="text-xl font-bold mb-4">Select Date</h2>
                <ul className="space-y-2">
                    {availableDates.map((date) => (
                        <li key={date}>
                            <Button
                                variant="solid"
                                className={selectedDate === date ? "w-full justify-center text-xl bg-secondw" : "w-full justify-center text-xl bg-firsto text-secondw"}
                                onPress={() => handleDateChange(date)}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {format(parseISO(date), "MMMM d, yyyy")}
                            </Button>
                        </li>
                    ))}
                </ul>
            </aside>

            {/* Main content */}
            <main className="flex-1 p-6">
                <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

                <h2 className="text-2xl font-bold mb-4">Matches for {format(parseISO(selectedDate), "MMMM d, yyyy")}</h2>
                {matches.length > 0 ? (
                    <Table>
                        <TableHeader>
                            <TableColumn>Time</TableColumn>
                            <TableColumn>Sport</TableColumn>
                            <TableColumn>Home Team</TableColumn>
                            <TableColumn>Away Team</TableColumn>
                            <TableColumn>Venue</TableColumn>
                            <TableColumn className="text-right">Action</TableColumn>
                        </TableHeader>
                        <TableBody>
                            {matches.map((match) => (
                                <TableRow key={match.id}>
                                    <TableCell>{match.time}</TableCell>
                                    <TableCell>
                                        <Chip variant="bordered" className="bg-[#FFC72C]/10 text-[#E35205] border-[#E35205]">
                                            {match.sport}
                                        </Chip>
                                    </TableCell>
                                    <TableCell>{match.homeTeam}</TableCell>
                                    <TableCell>{match.awayTeam}</TableCell>
                                    <TableCell>{match.venue}</TableCell>
                                    <TableCell className="text-right">
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button variant="bordered" size="sm">
                                                    View Details
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent className="max-w-3xl">
                                                <DialogHeader>
                                                    <DialogTitle>Match Details</DialogTitle>
                                                    <DialogDescription>
                                                        {match.homeTeam} vs {match.awayTeam} - {format(parseISO(selectedDate), "PPP")} at{" "}
                                                        {match.time}
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <Card>
                                                        <CardHeader>
                                                            {match.homeTeam}
                                                        </CardHeader>
                                                        <CardBody>
                                                            <Table>
                                                                <TableHeader>
                                                                    <TableColumn>Player</TableColumn>
                                                                    <TableColumn>Status</TableColumn>
                                                                </TableHeader>
                                                                <TableBody>
                                                                    {data.players[match.id]?.homeTeam.map((player) => (
                                                                        <TableRow key={player.id}>
                                                                            <TableCell>{player.name}</TableCell>
                                                                            <TableCell>
                                                                                {player.registered ? (
                                                                                    <Chip className="bg-green-500">Registered</Chip>
                                                                                ) : (
                                                                                    <Chip variant="bordered" className="text-red-500">
                                                                                        Not Registered
                                                                                    </Chip>
                                                                                )}
                                                                            </TableCell>
                                                                        </TableRow>
                                                                    ))}
                                                                </TableBody>
                                                            </Table>
                                                        </CardBody>
                                                    </Card>
                                                    <Card>
                                                        <CardHeader>
                                                            {match.awayTeam}
                                                        </CardHeader>
                                                        <CardBody>
                                                            <Table>
                                                                <TableHeader>
                                                                    <TableColumn>Player</TableColumn>
                                                                    <TableColumn>Status</TableColumn>
                                                                </TableHeader>
                                                                <TableBody>
                                                                    {data.players[match.id]?.awayTeam.map((player) => (
                                                                        <TableRow key={player.id}>
                                                                            <TableCell>{player.name}</TableCell>
                                                                            <TableCell>
                                                                                {player.registered ? (
                                                                                    <Chip className="bg-green-500">Registered</Chip>
                                                                                ) : (
                                                                                    <Chip variant="bordered" className="text-red-500">
                                                                                        Not Registered
                                                                                    </Chip>
                                                                                )}
                                                                            </TableCell>
                                                                        </TableRow>
                                                                    ))}
                                                                </TableBody>
                                                            </Table>
                                                        </CardBody>
                                                    </Card>
                                                </div>
                                            </DialogContent>
                                        </Dialog>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    <Card>
                        <CardBody className="flex items-center justify-center h-32">
                            <p className="text-muted-foreground">No matches scheduled for this date.</p>
                        </CardBody>
                    </Card>
                )}
            </main>
        </div>
    )
}
