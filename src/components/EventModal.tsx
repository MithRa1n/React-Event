import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import type { FormData } from "../types/FormData";
import type { EventData } from "../types/EventData";
import { EventImportance } from "../types/importance";

type Props = {
  event?: EventData | null;
  date: string;
  open?: boolean;
  onSave: (data: FormData) => void;
  onClose: () => void;
};

export default function EventModal({ event, date, open, onSave, onClose }: Props) {
  const { register, handleSubmit, reset } = useForm<FormData>({
    defaultValues: event
      ? {
          title: event.title,
          description: event.description,
          date: event.date,
          importance: event.importance,
        }
      : {
          title: "",
          description: "",
          date: date + "T12:00",
          importance: EventImportance.NORMAL,
        },
  });

  const handleFormSubmit = (data: FormData) => {
    onSave(data);
    reset();
    onClose();
  };

  return (
    <Dialog open={open !== undefined ? open : !!event} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{event ? "Edit Event" : "Add Event"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <Input {...register("title")} placeholder="Event name" required />
          <Textarea {...register("description")} placeholder="Event description" rows={3} />
          <Input type="datetime-local" {...register("date")} required />
          <select
            {...register("importance")}
            className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={EventImportance.NORMAL}>Normal</option>
            <option value={EventImportance.IMPORTANT}>Important</option>
            <option value={EventImportance.CRITICAL}>Critical</option>
          </select>
          <div className="flex gap-2">
            <Button type="submit" className="flex-1">
              {event ? "Update" : "Create"}
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
