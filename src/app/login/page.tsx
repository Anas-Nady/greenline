import Headline from "@/components/Headline";
import LoginForm from "@/components/Login/LoginForm";
import { SIGN_IN, SIGN_IN_PAGE } from "@/constants/Form";
import { authOptions } from "@/lib/authOptions";
import type { Metadata } from "next";
import { AuthOptions, getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: SIGN_IN,
};

export default async function LoginPage() {
  const session = await getServerSession(authOptions as AuthOptions);

  if (session) return redirect("/dashboard/add-product");
  else {
    return (
      <div className="h-[calc(100vh-65px)] gird grid-cols-1 place-content-center mx-5">
        <div className="bg-white rounded shadow py-10 px-5 max-w-screen-sm mx-auto">
          <Headline text={SIGN_IN_PAGE} isCentering={true} />
          <LoginForm />
        </div>
      </div>
    );
  }
}
