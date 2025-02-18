'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@heroui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import toast from 'react-hot-toast';

interface Medals {
  gold: number;
  silver: number;
  bronze: number;
}

const allScores: Record<string, Medals> = {
  KMITL: {
    gold: 1,
    silver: 0,
    bronze: 0,
  },
  KMUTT: {
    gold: 0,
    silver: 1,
    bronze: 0,
  },
  KMUTNB: {
    gold: 0,
    silver: 0,
    bronze: 1,
  },
};

const scoreSchema = z.object({
  team: z.enum(['KMITL', 'KMUTT', 'KMUTNB']),
  gold: z.number().min(0, 'Gold must be 0 or higher'),
  silver: z.number().min(0, 'Silver must be 0 or higher'),
  bronze: z.number().min(0, 'Bronze must be 0 or higher'),
});

type MedalFormData = z.infer<typeof scoreSchema>;

interface MedalFormProps {
  onSubmit: SubmitHandler<MedalFormData>;
}

function MedalFormFunction({ onSubmit }: MedalFormProps) {
  const form = useForm<MedalFormData>({
    resolver: zodResolver(scoreSchema),
    defaultValues: {
      team: 'KMITL',
      gold: 0,
      silver: 0,
      bronze: 0,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="team"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Team</FormLabel>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={(value) => form.setValue('team', value as 'KMITL' | 'KMUTT' | 'KMUTNB')}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Team" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(allScores).map((team) => (
                      <SelectItem key={team} value={team}>
                        {team}
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
          name="gold"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gold Medals</FormLabel>
              <FormControl>
                <Input type="string" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="silver"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Silver Medals</FormLabel>
              <FormControl>
                <Input type="string" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bronze"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bronze Medals</FormLabel>
              <FormControl>
                <Input type="string" {...field} />
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

export default function MedalForm() {
  const [medals, setMedals] = useState<Record<string, Medals>>(allScores);
  const router = useRouter();

  const handleFormSubmit: SubmitHandler<MedalFormData> = (data) => {
    setMedals((prevMedals) => ({
      ...prevMedals,
      [data.team]: {
        gold: data.gold,
        silver: data.silver,
        bronze: data.bronze,
      },
    }));
    toast.success('Form submitted successfully!');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Medal Standings</CardTitle>
        <CardDescription>View and edit medal counts for each team</CardDescription>
      </CardHeader>
      <CardContent>
        <table>
          <thead>
            <tr>
              <th>Team</th>
              <th>Gold</th>
              <th>Silver</th>
              <th>Bronze</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(medals).map(([team, counts]) => (
              <tr key={team}>
                <td>{team}</td>
                <td>{counts.gold}</td>
                <td>{counts.silver}</td>
                <td>{counts.bronze}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <MedalFormFunction onSubmit={handleFormSubmit} />
      </CardContent>
    </Card>
  );
}
