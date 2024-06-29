import { cookies } from "next/headers";
import connectDB from "@/config/database";
import authenticateUser from "@/utils/authenticateUser";
import User from "@/models/user";

export const GET = async () => {
  try {
    await connectDB();
    const token: string = cookies().get("token")?.value || "";

    const isAuthenticated = await authenticateUser(token);

    if (isAuthenticated?.status !== 200) {
      return new Response(
        JSON.stringify({ message: isAuthenticated.message }),
        { status: isAuthenticated.status }
      );
    }

    return new Response(JSON.stringify({ message: isAuthenticated.message }), {
      status: 200,
    });
  } catch (error: any) {
    console.error(error);
    return new Response(
      JSON.stringify({
        message: error.message,
      }),
      { status: 500 }
    );
  }
};

// update user profile /api/auth/profile
export const PUT = async (request: Request) => {
  try {
    const { email, password } = await request.json();
    await connectDB();
    const token: string = cookies().get("token")?.value || "";

    const isAuthenticated = await authenticateUser(token);

    if (isAuthenticated?.status !== 200) {
      return new Response(
        JSON.stringify({ message: isAuthenticated.message }),
        { status: isAuthenticated.status }
      );
    }

    const currentUser = await User.findOne({ email });

    currentUser.email = email || currentUser.email;
    if (password) {
      currentUser.password = password || currentUser.password;
    }
    await currentUser.save();

    return new Response(
      JSON.stringify({ message: "Success updated your account" }),
      { status: 200 }
    );
  } catch (error: any) {
    console.error(error);
    return new Response(
      JSON.stringify({
        message: error.message,
      }),
      { status: 500 }
    );
  }
};
