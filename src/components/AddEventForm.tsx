import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { auth } from "../firebase";
import { createEvent } from "../api/events";
import { EventImportance } from "../types/importance";
import type { FormData } from "../types/FormData";

export default function AddEventForm() {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FormData) => {
    const user = auth.currentUser;
    if (!user) return;

    setLoading(true);
    try {
      await createEvent({ ...data, userId: user.uid });
      reset();
    } catch (error) {
      console.error("Error creating event:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4 bg-white rounded shadow">
      <Input {...register("title")} placeholder="Title" required />
      <Textarea {...register("description")} placeholder="Description" />
      <Input {...register("date")} type="datetime-local" required />
      <select {...register("importance")} className="w-full border rounded p-2">
        <option value={EventImportance.NORMAL}>Normal</option>
        <option value={EventImportance.IMPORTANT}>Important</option>
        <option value={EventImportance.CRITICAL}>Critical</option>
      </select>
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Saving..." : "Add Event"}
      </Button>
    </form>
  );
}
