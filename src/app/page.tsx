import { Dashboard } from "@/components/Dashboard";

export default function Home() {
  return (
    <div className="w-full h-full min-h-screen bg-dashboard_bg bg-no-repeat bg-cover bg-fixed bg-center">
      <Dashboard />
    </div>
  );
}
