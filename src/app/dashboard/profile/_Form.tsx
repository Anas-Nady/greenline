"use client";
import toast from "react-hot-toast";
import Input from "./_Input";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import {
  EMAIL_AND_PASSWORD_REQUIRED,
  PROFILE_UPDATED,
} from "@/constants/ToastArabicMessages";
import {
  CURRENT_EMAIL,
  NEW_EMAIL,
  PASSWORD,
  SAVE_CHANGES,
} from "@/constants/Form";

interface ProfileFormProps {
  email: string;
}

export default function ProfileForm({ email }: ProfileFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      toast.error(EMAIL_AND_PASSWORD_REQUIRED);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/auth/profile", {
        method: "PUT",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        toast.success(PROFILE_UPDATED);
        await signOut();
        router.push("/login");
      } else {
        const data = await res.json();
        toast.error(data.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="max-w-md mx-auto my-16 px-8 py-8 border-2 border-gray-200"
      onSubmit={handleSubmit}
    >
      <Input
        type="email"
        id="currentEmail"
        labelName={CURRENT_EMAIL}
        placeholder={email}
        isReadOnly
      />
      <Input type="email" id="email" labelName={NEW_EMAIL} />
      <Input type="password" id="password" labelName={PASSWORD} />

      <button
        type="submit"
        disabled={loading}
        className={`${
          loading && "opacity-40 cursor-not-allowed"
        } text-white w-full bg-green-500 hover:bg-green-700 duration-200 focus:outline-none font-semibold rounded-lg text-lg px-5 py-2.5 text-center`}
      >
        {SAVE_CHANGES}
      </button>
    </form>
  );
}
