import { AuthOptions, getServerSession } from "next-auth";
import DashboardAsideBar from "./_components/DashboardAsideBar";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/authOptions";
import AuthenticationLayout from "./_components/AuthenticationLayout";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions as AuthOptions);

  if (!session) return redirect("/login");
  else {
    return (
      <AuthenticationLayout>
        <div
          className={`flex gap-5 h-[calc(100vh -135px)] border-b-2 border-gray-200`}
        >
          <DashboardAsideBar />
          <div className="bg-white flex-1 p-5">{children}</div>
        </div>
      </AuthenticationLayout>
    );
  }
}
