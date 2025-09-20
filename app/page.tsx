
"use client";
import dynamic from "next/dynamic";
import AuthGuard from "./components/AuthGuard";

const Dashboard = dynamic(() => import("./private/dashboard"), { ssr: false });

export default function Home() {
  return (
    <AuthGuard>
      <Dashboard />
    </AuthGuard>
  );
}
