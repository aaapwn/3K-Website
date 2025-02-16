'use client';
import React from 'react';
import { useQuery } from '@tanstack/react-query';

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@heroui/react';

import { getFootballSummary } from '@/queries/result/qurey';
import { FootballSumary } from '@/queries/result/type';

export default function FootballTable() {
  const { data } = useQuery<FootballSumary[]>({
    queryKey: ['football-summary'],
    queryFn: getFootballSummary,
  });

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
          {(data || []).map((team, index) => (
              <TableRow key={index}>
                <TableCell className="text-2xl">{index + 1}</TableCell>
                <TableCell className="text-2xl">{team.team}</TableCell>
                <TableCell className="text-2xl">{team.played}</TableCell>
                <TableCell className="text-2xl">{team.win}</TableCell>
                <TableCell className="text-2xl">{team.draw}</TableCell>
                <TableCell className="text-2xl">{team.lose}</TableCell>
                <TableCell className="text-2xl">{team.goalsFor}</TableCell>
                <TableCell className="text-2xl">{team.goalsAgainst}</TableCell>
                <TableCell className="text-2xl">{team.goalsDiff}</TableCell>
                <TableCell className="text-2xl">{team.points}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      ;
    </>
  );
}
