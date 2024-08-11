"use client";

import React, { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AuthenticationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const checkAdminLoggedIn = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/auth/profile", {
        method: "GET",
        next: { revalidate: 0 },
      });

      if (res.status === 200) {
        setLoading(false);
      } else {
        await signOut();
        router.push("/login");
      }
    } catch (error) {
      await signOut();
      router.push("/login");
    }
  };

  useEffect(() => {
    checkAdminLoggedIn();
  }, []);

  return <>{loading ? null : children}</>;
}
