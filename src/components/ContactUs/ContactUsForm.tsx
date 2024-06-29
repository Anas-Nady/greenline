"use client";
import React, { useState } from "react";
import Input from "./Input";
import Textarea from "./Textarea";
import toast from "react-hot-toast";
import { EMAIL, MESSAGE, NAME, SEND } from "@/constants/arabic";
import { MESSAGE_SENDED } from "@/constants/toastArabicMessages";

export default function ContactUsForm() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form as HTMLFormElement);

    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });
      if (res.ok) {
        toast.success(MESSAGE_SENDED);
        form.reset();
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
    <div className="mb-12 w-full shrink-0 grow-0 basis-auto md:px-0 lg:mb-0 lg:w-5/12 lg:px-0">
      <form onSubmit={handleSubmit}>
        <Input id="name" type="text" labelName={NAME} />
        <Input id="email" type="email" labelName={EMAIL} />
        <Textarea id="message" labelName={MESSAGE} />
        <button
          type="submit"
          disabled={loading}
          className={`${
            loading && "opacity-70 cursor-not-allowed"
          } mb-6 w-full rounded bg-green-500 font-semibold hover:bg-green-700 duration-100 text-white px-6 pt-2.5 pb-2 text-md lg:text-lg leading-normal lg:mb-0`}
        >
          {SEND}
        </button>
      </form>
    </div>
  );
}
