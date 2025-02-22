import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  ModalFooter,
  // Chip,
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

import { useMutation } from "@tanstack/react-query";
import {
  createMatchResult,
  createAthleticResult,
} from "@/queries/result/qurey";
import {
  CreataeAthleticResult,
  CreateMatchResult,
} from "@/queries/result/type";
import { useSession } from "next-auth/react";
import { QueryClient } from "@tanstack/react-query";

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
  onClose: () => void;
}

interface OtherSportsFormProps {
  match: Schedule;
  onClose: () => void;
}

function AthleticsForm({ match, onClose }: AthleticsFormProps) {
  const { data: session } = useSession();
  const queryClient = new QueryClient();
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

  const athleticsresultMutation = useMutation({
    mutationFn: (data: CreataeAthleticResult) =>
      createAthleticResult(session?.accessToken as string, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllSchedule"] });
    },
  });

  const handleAthleticsResultSubmit: SubmitHandler<AthleticsFormData> = (
    data
  ) => {
    console.log(data);
    const id = toast.loading("กำลังบันทึกผลการแข่งขัน...");
    const body: CreataeAthleticResult = {
      matchId: data.matchId,
      results: data.players.map((player) => ({
        userId: player.playerID,
        time: player.time,
      })),
    };
    athleticsresultMutation.mutate(body, {
      onSuccess: () => {
        toast.success("บันทึกผลการแข่งขันสำเร็จ", { id });
        onClose();
      },
      onError: () => {
        toast.error("เกิดข้อผิดพลาดในการบันทึกผลการแข่งขัน", { id });
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleAthleticsResultSubmit)}>
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

function OtherSportForm({ match, onClose }: OtherSportsFormProps) {
  const { data: session } = useSession();
  const queryClient = new QueryClient();
  const form = useForm<OtherSportsFormData>({
    resolver: zodResolver(matchesSchema),
    defaultValues: {
      matchId: match.id,
      scoreA: (match.result?.data as MatchResult)?.scoreA ?? 0,
      scoreB: (match.result?.data as MatchResult)?.scoreB ?? 0,
    },
  });
  const college = Array.from(
    new Set(match.players.map((player) => player.user.college))
  );
  const matchResultMutation = useMutation({
    mutationFn: (data: CreateMatchResult) =>
      createMatchResult(session?.accessToken as string, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllSchedule"] });
    },
  });

  const handleMatchResultSubmit: SubmitHandler<OtherSportsFormData> = (
    data
  ) => {
    const id = toast.loading("กำลังบันทึกผลการแข่งขัน...");

    const body: CreateMatchResult = {
      matchId: data.matchId,
      homeTeam: college[0],
      awayTeam: college[1],
      scoreA: data.scoreA,
      scoreB: data.scoreB,
    };
    matchResultMutation.mutate(body, {
      onSuccess: () => {
        toast.success("บันทึกผลการแข่งขันสำเร็จ", { id });
        onClose();
      },
      onError: () => {
        toast.error("เกิดข้อผิดพลาดในการบันทึกผลการแข่งขัน", { id });
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleMatchResultSubmit)}>
        <FormField
          control={form.control}
          name="scoreA"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="custom-input">{college[0]}</FormLabel>
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
              <FormLabel className="custom-input">{college[1]}</FormLabel>
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
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

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
                <AthleticsForm onClose={onClose} match={match as Schedule} />
              ) : (
                <OtherSportForm onClose={onClose} match={match as Schedule} />
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
