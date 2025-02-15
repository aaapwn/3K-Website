'use client';
import React from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@heroui/react';

type FootballTableProps = {
  footballData: {
    key: string;
    name: string;
    played: number;
    won: number;
    drawn: number;
    lost: number;
    goalsFor: number;
    goalsAgainst: number;
    goalDifference: number;
    points: number;
  }[];
};

export default function FootballTable({ footballData }: FootballTableProps) {
  return (
    <>
      <Table>
        <TableHeader>
          <TableColumn className="text-2xl">Rank</TableColumn>
          <TableColumn className="text-2xl">Team</TableColumn>
          <TableColumn className="text-2xl">P</TableColumn>
          <TableColumn className="text-2xl">W</TableColumn>
          <TableColumn className="text-2xl">D</TableColumn>
          <TableColumn className="text-2xl">L</TableColumn>
          <TableColumn className="text-2xl">GF</TableColumn>
          <TableColumn className="text-2xl">GA</TableColumn>
          <TableColumn className="text-2xl">GD</TableColumn>
          <TableColumn className="text-2xl">Pts</TableColumn>
        </TableHeader>
        <TableBody>
          {footballData
            .sort((a, b) => b.points - a.points)
            .map((team, index) => (
              <TableRow key={team.key}>
                <TableCell className="text-2xl">{index + 1}</TableCell>
                <TableCell className="text-2xl">{team.name}</TableCell>
                <TableCell className="text-2xl">{team.played}</TableCell>
                <TableCell className="text-2xl">{team.won}</TableCell>
                <TableCell className="text-2xl">{team.drawn}</TableCell>
                <TableCell className="text-2xl">{team.lost}</TableCell>
                <TableCell className="text-2xl">{team.goalsFor}</TableCell>
                <TableCell className="text-2xl">{team.goalsAgainst}</TableCell>
                <TableCell className="text-2xl">{team.goalDifference}</TableCell>
                <TableCell className="text-2xl">{team.points}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      ;
    </>
  );
}
