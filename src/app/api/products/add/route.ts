import Product from "@/models/product";
import path from "path";
import { writeFile } from "fs/promises";
import authenticateUser from "@/utils/authenticateUser";
import { cookies } from "next/headers";

// PRIVATE API
// Create a new product
// /api/products/add

export const POST = async (req: Request) => {
  const token: string = cookies().get("token")?.value || "";

  const formData: FormData = await req.formData();

  const name = formData.get("name");
  const oldPrice = formData.get("oldPrice") as string;
  const price = formData.get("price") as string;
  const category = formData.get("category");
  const seller = formData.get("seller");
  const productIsNew = formData.get("productIsNew");
  const description = formData.get("description");

  const photo = formData.get("photo") as File;
  const images = formData.getAll("images") as File[];

  if (!description || !name || !price || !category) {
    return new Response(
      JSON.stringify({ message: "Please Provide all data" }),
      { status: 400 }
    );
  }

  const photoBuffer = Buffer.from(await photo.arrayBuffer());
  const photoFileName = photo.name.replaceAll(" ", "_");
  const photoPath = path.join("public/uploads", photoFileName);
  const publicPhotoPath = `/uploads/${photoFileName}`;

  try {
    const isAuthenticated = await authenticateUser(token);

    if (isAuthenticated?.status !== 200) {
      return new Response(
        JSON.stringify({ message: isAuthenticated.message }),
        { status: isAuthenticated.status }
      );
    }

    await writeFile(photoPath, photoBuffer);

    const imagesArray = [];
    for (const image of images) {
      const imageBuffer = Buffer.from(await image.arrayBuffer());
      const imageFileName = image.name.replaceAll(" ", "_");
      const imagePath = path.join("public/uploads", imageFileName);
      const publicImagePath = `/uploads/${imageFileName}`;
      await writeFile(imagePath, imageBuffer);
      imagesArray.push({
        url: publicImagePath,
        public_id: Math.random().toString(),
      });
    }
    const newProduct = await Product.create({
      name: name,
      photo: publicPhotoPath,
      description: description,
      oldPrice: parseFloat(oldPrice),
      price: parseFloat(price),
      images: imagesArray,
      category: category,
      productIsNew: productIsNew,
      seller: seller,
    });

    if (!newProduct) {
      return new Response(JSON.stringify({ message: "Invalid data input" }), {
        status: 400,
      });
    }

    return new Response(JSON.stringify({ message: "Success product added" }), {
      status: 201,
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
};
