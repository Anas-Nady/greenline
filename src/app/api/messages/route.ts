import connectDB from "@/config/database";
import Message from "@/models/message";
import authenticateUser from "@/utils/authenticateUser";
import { cookies } from "next/headers";

// PRIVATE API
// GET ALL Messages
// /api/messages
export const GET = async (request: Request) => {
  const token: string = cookies().get("token")?.value || "";

  const url = new URL(request.url);
  const searchParams: URLSearchParams = url.searchParams;

  try {
    const isAuthenticated = await authenticateUser(token);

    if (isAuthenticated?.status !== 200) {
      return new Response(
        JSON.stringify({ message: isAuthenticated.message }),
        { status: isAuthenticated.status }
      );
    }

    const page: number = parseInt(searchParams.get("page") || "1", 10);
    const limit: number = parseInt(searchParams.get("limit") || "10", 9);
    const skip: number = (page - 1) * limit;

    const totalMessages = await Message.countDocuments();
    const totalPages = Math.ceil(totalMessages / limit);

    const messages = await Message.find({})
      .sort("-createdAt")
      .skip(skip)
      .limit(limit);

    // set `read` property of all messages to true after returning them;
    await Message.updateMany({}, { $set: { read: true } });

    return new Response(
      JSON.stringify({ messages, totalPages, page, totalMessages }),
      { status: 200 }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        message: error.message,
      }),
      { status: 500 }
    );
  }
};

// PUBLIC API
// Create a new Message
// /api/messages
export const POST = async (request: Request) => {
  try {
    await connectDB();

    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ message: "Please provide all data." }),
        { status: 400 }
      );
    }

    const newMessage = await Message.create({ name, email, message });

    if (!newMessage) {
      return new Response(
        JSON.stringify({
          message: `Invalid data input. Try again later.`,
        }),
        { status: 400 }
      );
    }

    return new Response(JSON.stringify(newMessage), { status: 201 });
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        message: error.message,
      }),
      { status: 500 }
    );
  }
};
