"use client";

import toast from "react-hot-toast";
import Input from "./_Input";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { EMAIL, PASSWORD, SIGN_IN } from "@/constants/arabic";
import { INVALID_EMAIL_OR_PASSWORD } from "@/constants/toastArabicMessages";

export default function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      setLoading(true);

      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        toast.error(INVALID_EMAIL_OR_PASSWORD);
        return;
      }
      router.replace("/dashboard/add-product");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-sm mx-auto py-5">
      <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
        <Input
          labelName={EMAIL}
          id="email"
          type="email"
          placeholder="user@gmail.com"
        />
        <Input
          labelName={PASSWORD}
          id="password"
          type="password"
          placeholder="********"
        />

        <button
          type="submit"
          disabled={loading}
          className={`${
            loading && "opacity-60 cursor-not-allowed"
          } text-white w-full font-semibold bg-green-500 hover:bg-green-700 focus:outline-none rounded-lg text-md px-5 py-2.5 text-center`}
        >
          {SIGN_IN}
        </button>
      </form>
    </main>
  );
}
