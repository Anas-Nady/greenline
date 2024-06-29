import Message from "@/models/message";
import { cookies } from "next/headers";
import authenticateUser from "@/utils/authenticateUser";

// PRIVATE API
// GET a message
// /api/message/:slug
export const GET = async (
  request: Request,
  { params }: { params: { slug: string | null } }
) => {
  const token: string = cookies().get("token")?.value || "";

  try {
    const isAuthenticated = await authenticateUser(token);

    if (isAuthenticated?.status !== 200) {
      return new Response(
        JSON.stringify({ message: isAuthenticated.message }),
        { status: isAuthenticated.status }
      );
    }

    const { slug } = params;
    const message = await Message.findOne({ slug });

    if (!message)
      return new Response(JSON.stringify({ message: "Message Not Found" }), {
        status: 404,
      });

    message.read = !message.read;

    await message.save();

    return new Response(JSON.stringify(message), { status: 200 });
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        message: error.message,
      }),
      { status: 500 }
    );
  }
};

// PRIVATE API
// DELETE a message
// /api/message/:slug
export const DELETE = async (
  request: Request,
  { params }: { params: { slug: string | null } }
) => {
  const token: string = cookies().get("token")?.value || "";

  try {
    const isAuthenticated = await authenticateUser(token);

    if (isAuthenticated?.status !== 200) {
      return new Response(
        JSON.stringify({ message: isAuthenticated.message }),
        { status: isAuthenticated.status }
      );
    }

    const { slug } = params;
    const message = await Message.findOne({ slug });

    if (!message)
      return new Response(JSON.stringify({ message: "Message Not Found" }), {
        status: 404,
      });

    await message.deleteOne();

    return new Response(JSON.stringify({ message: "Message Deleted" }), {
      status: 200,
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        message: error.message,
      }),
      { status: 500 }
    );
  }
};
