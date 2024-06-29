import { cookies } from "next/headers";

export const GET = async () => {
  cookies().delete("token");

  return new Response(JSON.stringify({ message: "success" }), { status: 200 });
};
