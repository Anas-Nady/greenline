import connectDB from "@/config/database";
import Product from "@/models/product";
import authenticateUser from "@/utils/authenticateUser";
import mongoose from "mongoose";
import { cookies } from "next/headers";

// PUBLIC API
// GET a PRODUCT
// /api/products/:id
const ObjectId = mongoose.Types.ObjectId;

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    await connectDB();

    const { id } = params;

    const product = await Product.findById(new ObjectId(id));

    if (!product) {
      return new Response(JSON.stringify({ message: "Product not found" }), {
        status: 404,
      });
    }

    product.views += 1;
    await product.save();

    const category = product.category;

    const similarProducts = await Product.aggregate([
      { $match: { category, _id: { $ne: id } } },
      { $sample: { size: 4 } },
    ]);

    return new Response(JSON.stringify({ product, similarProducts }), {
      status: 200,
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
};

// private API
// Update a PRODUCT
// /api/products/:id
export const PUT = async (
  request: Request,
  { params }: { params: { id: string } }
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

    const { name, oldPrice, price, productIsNew, seller } =
      await request.json();

    const { id } = params;

    const product = await Product.findById(new ObjectId(id));

    if (!product) {
      return new Response(JSON.stringify({ message: "Product not found" }), {
        status: 404,
      });
    }

    product.name = name;
    product.oldPrice = parseFloat(oldPrice);
    product.price = parseFloat(price);
    product.productIsNew = productIsNew === "true";
    product.seller = seller || "Green Line";

    await product.save();

    return new Response(
      JSON.stringify({ message: "Product updated successfully", product }),
      { status: 200 }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ message: "An error occurred", error: error.message }),
      { status: 500 }
    );
  }
};

// PRIVATE API
// DELETE A PRODUCT
// /api/products/:id
export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
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

    const { id } = params;
    const product = await Product.findById(new ObjectId(id));

    if (!product) {
      return new Response(JSON.stringify({ message: "Product not found" }), {
        status: 404,
      });
    }

    await product.deleteOne();

    return new Response(
      JSON.stringify({ message: "Product deleted successfully" }),
      { status: 200 }
    );
  } catch (error: any) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
};
