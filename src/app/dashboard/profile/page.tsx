import { AuthOptions, getServerSession } from "next-auth";
import ProfileForm from "./_Form";
import { authOptions } from "@/lib/authOptions";

export default async function Profile() {
  const session = await getServerSession(authOptions as AuthOptions);

  return (
    <div>
      <ProfileForm email={session?.user?.email || ""} />
    </div>
  );
}
