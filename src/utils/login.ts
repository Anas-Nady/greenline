import User from "../models/user";
import connectDB from "@/config/database";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const signToken = (id: string, isAdmin: boolean) => {
  return jwt.sign({ id, isAdmin }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const login = async function (credentials: {
  email: string;
  password: string;
}) {
  try {
    const { email, password } = credentials;
    await connectDB();
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("this is not a valid email address");
    }

    const isPasswordMatch = await user.matchPassword(password);

    if (!isPasswordMatch) {
      throw new Error("this is not a valid password");
    }

    const token = signToken(user._id, user.isAdmin);
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expiresIn: 7 * 24 * 60 * 60 * 1000, // 7 days
    };

    cookies().set("token", token, cookieOptions);
    user.token = token;

    await user.save();

    return {
      _id: user._id,
      email: user.email,
      name: user.name,
      token: user.token,
    };
  } catch (error) {
    return null;
  }
};

export default login;
