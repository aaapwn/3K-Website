import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  ModalFooter,
  Chip,
} from "@heroui/react";

import { Button } from "@heroui/button";
import { z } from "zod";

import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import toast from "react-hot-toast";

import { Schedule, TrackResult, MatchResult } from "@/queries/schedule/type";
import { postScheduleResult } from "@/queries/schedule/query";

const matchesSchema = z.object({
  matchId: z.string().min(1, "Match ID is required"),
  scoreA: z.number().min(0, "Score must be 0 or higher"),
  scoreB: z.number().min(0, "Score must be 0 or higher"),
});

const athleticsSchema = z.object({
  matchId: z.string().min(1, "Match ID is required"),
  players: z.array(
    z.object({
      playerID: z.string(),
      time: z.number().min(0, "Finish time must be 0 or higher"),
    })
  ),
});

type MatchesResultProps = {
  match: Schedule;
};

type AthleticsFormData = z.infer<typeof athleticsSchema>;
type OtherSportsFormData = z.infer<typeof matchesSchema>;

interface AthleticsFormProps {
  match: Schedule;
  onSubmit: SubmitHandler<AthleticsFormData>;
}

interface OtherSportsFormProps {
  match: Schedule;
  onSubmit: SubmitHandler<OtherSportsFormData>;
}

function AthleticsForm({ onSubmit, match }: AthleticsFormProps) {
  const form = useForm<AthleticsFormData>({
    resolver: zodResolver(athleticsSchema),
    defaultValues: {
      matchId: match.id,
      players: match.players.map((player, index) => ({
        playerID: player.user.id,
        time: (match.result?.data as TrackResult[])[index]?.time ?? 0,
      })),
    },
  });

  const { fields } = useFieldArray({
    control: form.control,
    name: "players",
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {fields.map((field, index) => (
          <FormField
            key={field.id}
            control={form.control}
            name={`players.${index}.time`}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-2xl">
                  {match.players[index].user.firstname_th}{" "}
                  {match.players[index].user.lastname_th}
                </FormLabel>
                <FormControl>
                  <Input
                    className="custom-input"
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        ))}
        <Button
          type="submit"
          className="text-secondw bg-firsto w-full my-5 text-2xl"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}

function OtherSportForm({ onSubmit, match }: OtherSportsFormProps) {
  const form = useForm<OtherSportsFormData>({
    resolver: zodResolver(matchesSchema),
    defaultValues: {
      matchId: match.id,
      scoreA: (match.result?.data as MatchResult)?.scoreA ?? 0,
      scoreB: (match.result?.data as MatchResult)?.scoreB ?? 0,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="scoreA"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="custom-input">
                {
                  Array.from(
                    new Set(match.players.map((player) => player.user.college))
                  )[0]
                }
              </FormLabel>
              <FormControl>
                <Input
                  className="custom-input"
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="scoreB"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="custom-input">
                {
                  Array.from(
                    new Set(match.players.map((player) => player.user.college))
                  )[1]
                }
              </FormLabel>
              <FormControl>
                <Input
                  className="custom-input"
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="text-secondw bg-firsto w-full text-2xl my-5"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}

export default function MatchesResultForm({ match }: MatchesResultProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  // const router = useRouter();

  const handleFormSubmit: SubmitHandler<
    AthleticsFormData | OtherSportsFormData
  > = (data) => {
    toast.success("Form submitted successfully!");
    postScheduleResult(match.id, match.id, data);
  };

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent className="max-w-6xl">
          <ModalHeader className="flex flex-col gap-2">
            <h1 className="text-3xl">แก้ไข/เพิ่ม ผลการแข่งขัน</h1>
          </ModalHeader>
          <ModalBody className="flex flex-col justify-center gap-4 text-2xl max-h-[70vh]">
            <div className="overflow-y-auto">
              {match.sport.category === "กรีฑา" ? (
                <AthleticsForm
                  onSubmit={handleFormSubmit}
                  match={match as Schedule}
                />
              ) : (
                <OtherSportForm
                  onSubmit={handleFormSubmit}
                  match={match as Schedule}
                />
              )}
            </div>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
      <Button onPress={onOpen} variant="bordered" size="lg" className="text-xl">
        แก้ไขผลการแข่งขัน
      </Button>
    </>
  );
}
