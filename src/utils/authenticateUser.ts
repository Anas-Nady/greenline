import jwt, { JwtPayload } from "jsonwebtoken";
import connectDB from "@/config/database";
import User from "../models/user";

const authenticateUser = async function (token: string | null) {
  try {
    await connectDB();

    if (!token) {
      return {
        message: "No Token provided in cookies.",
        status: 401,
      };
    }

    const decode = (await jwt.verify(
      token,
      process.env.JWT_SECRET as string
    )) as string | JwtPayload;

    if (typeof decode === "string" || !("id" in decode)) {
      return {
        message: "Invalid token.",
        status: 401,
      };
    }

    const currentUser = await User.findById(decode.id);

    if (!currentUser) {
      return {
        message: "The user belonging to this token does not exist.",
        status: 404,
      };
    }

    const isAdmin = currentUser.isAdmin || false;

    if (!isAdmin) {
      return {
        message: "You are not an admin.",
        status: 401,
      };
    }

    return { status: 200 };
  } catch (error: any) {
    return {
      message: error.message,
      status: 500,
    };
  }
};

export default authenticateUser;
