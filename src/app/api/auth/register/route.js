import connectDB from "@/config/database";
import User from "@/models/user";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const signToken = (id, isAdmin) => {
  return jwt.sign({ id, isAdmin }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export const POST = async (request) => {
  try {
    await connectDB();

    const { name, email, password } = await request.json();

    console.log(name, email, password);

    const user = await User.create({ name, email, password });
    console.log(user);

    if (!user) {
      return new Response(
        JSON.stringify({ message: "Failed to create user." }),
        {
          status: 400,
        }
      );
    }

    const token = signToken(user._id, user.isAdmin);
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Expires in 7 days
    };

    cookies().set("token", token, cookieOptions);

    return new Response(JSON.stringify({ user }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
};
