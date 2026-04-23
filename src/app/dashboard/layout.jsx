import { AuthSessionProvider } from "@/components/Auth/AuthSessionProvider";
import DashboardShell from "@/components/Dashboard/DashboardShell";
import { getAuthenticatedUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }) {
  const user = await getAuthenticatedUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <AuthSessionProvider user={user}>
      <DashboardShell user={user}>{children}</DashboardShell>
    </AuthSessionProvider>
  );
}
