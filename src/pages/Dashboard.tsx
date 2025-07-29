import AddEventForm from "@/components/AddEventForm";
import Header from "@/components/Header";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="max-w-xl mx-auto mt-10">
        <h1 className="text-2xl font-bold mb-4">Your Events</h1>
        <AddEventForm />
      </div>
    </div>
  );
}
