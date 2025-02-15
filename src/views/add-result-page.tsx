'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@heroui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import toast from 'react-hot-toast';

const otherSportsMatches = [
  { id: '1', name: 'Match 1' },
  { id: '2', name: 'Match 2' },
];

const athleticsMatches = [
  {
    id: '100',
    name: 'Athletics Match 1',
    players: [
      { id: 'P1', name: 'Athlete 1', team: 'KMITL' },
      { id: 'P2', name: 'Athlete 2', team: 'KMUTT' },
      { id: 'P3', name: 'Athlete 3', team: 'KMUTNB' },
    ],
  },
  {
    id: '101',
    name: 'Athletics Match 2',
    players: [
      { id: 'P3', name: 'Athlete 3', team: 'KMITL' },
      { id: 'P4', name: 'Athlete 4', team: 'KMUTNB' },
      { id: 'P5', name: 'Athlete 5', team: 'KMUTT' },
    ],
  },
];

const sportSchema = z.object({
  sport: z.enum(['athletics', 'other']),
  matchId: z.string().min(1, 'Match ID is required'),
});

const otherSportsSchema = sportSchema.extend({
  homeTeamScore: z.number().min(0, 'Score must be 0 or higher'),
  awayTeamScore: z.number().min(0, 'Score must be 0 or higher'),
});

const athleticsSchema = z.object({
  matchId: z.string().min(1, 'Match ID is required'),
  players: z.array(
    z.object({
      playerID: z.string(),
      finishTime: z.string(),
    })
  ),
});

type AthleticsFormData = z.infer<typeof athleticsSchema>;
type OtherSportsFormData = z.infer<typeof otherSportsSchema>;

interface AthleticsFormProps {
  onSubmit: SubmitHandler<AthleticsFormData>;
}

function AthleticsForm({ onSubmit }: AthleticsFormProps) {
  const form = useForm<AthleticsFormData>({
    resolver: zodResolver(athleticsSchema),
    defaultValues: {
      matchId: '',
      players: [],
    },
  });

  const { fields } = useFieldArray({
    control: form.control,
    name: 'players',
  });

  const selectedMatch = athleticsMatches.find((match) => match.id === form.watch('matchId'));

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="matchId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Athletics Match</FormLabel>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={(value) => {
                    form.setValue('matchId', value);
                    const match = athleticsMatches.find((m) => m.id === value);
                    if (match) {
                      form.setValue(
                        'players',
                        match.players.map((p) => ({ playerID: p.id, finishTime: '' }))
                      );
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Match" />
                  </SelectTrigger>
                  <SelectContent>
                    {athleticsMatches.map((match) => (
                      <SelectItem key={match.id} value={match.id}>
                        {match.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {fields.map((field, index) => (
          <FormField
            key={field.id}
            control={form.control}
            name={`players.${index}.finishTime`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Finish Time</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

interface OtherSportsFormProps {
  onSubmit: SubmitHandler<OtherSportsFormData>;
}

function OtherSportsForm({ onSubmit }: OtherSportsFormProps) {
  const form = useForm<OtherSportsFormData>({
    resolver: zodResolver(otherSportsSchema),
    defaultValues: {
      sport: 'other',
      matchId: '',
      homeTeamScore: 0,
      awayTeamScore: 0,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="matchId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Existing Match</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={(value) => form.setValue('matchId', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Match" />
                  </SelectTrigger>
                  <SelectContent>
                    {otherSportsMatches.map((match) => (
                      <SelectItem key={match.id} value={match.id}>
                        {match.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="homeTeamScore"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Home Team Score</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="awayTeamScore"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Away Team Score</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export default function AddResultForm() {
  const [selectedSport, setSelectedSport] = useState<'athletics' | 'other'>('other');
  const router = useRouter();

  const handleFormSubmit: SubmitHandler<AthleticsFormData | OtherSportsFormData> = (data) => {
    toast.success('Form submitted successfully!');
    console.log(data);
    router.push('/results');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Result</CardTitle>
        <CardDescription>Select sport and fill in the details</CardDescription>
      </CardHeader>
      <CardContent>
        <Select value={selectedSport} onValueChange={(value) => setSelectedSport(value as 'athletics' | 'other')}>
          <SelectTrigger>
            <SelectValue placeholder="Select Sport" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="athletics">Athletics</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
        {selectedSport === 'athletics' ? (
          <AthleticsForm onSubmit={handleFormSubmit} />
        ) : (
          <OtherSportsForm onSubmit={handleFormSubmit} />
        )}
      </CardContent>
    </Card>
  );
}
