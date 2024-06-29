import Product from "@/models/product";
import connectDB from "@/config/database";

// PUBLIC API
// GET ALL PRODUCTS
// /api/products
export const GET = async (request: Request): Promise<Response> => {
  // Extract query parameters
  const url = new URL(request.url);
  const searchParams: URLSearchParams = url.searchParams;

  try {
    await connectDB();

    const category: string | null = searchParams.get("category");
    const search: string | null = searchParams.get("search");
    const minPrice: number = parseFloat(searchParams.get("minPrice") || "0");
    const maxPrice: number = parseFloat(
      searchParams.get("maxPrice") || "Infinity"
    );
    const page: number = parseInt(searchParams.get("page") || "1", 10);
    const limit: number = parseInt(searchParams.get("limit") || "10", 10);
    const sort: string = searchParams.get("sort") || "-createdAt";
    const topViews: boolean = searchParams.get("topViews") === "true";
    const limitFields: string | null =
      searchParams.get("fields")?.split(",").join(" ") || "";

    // Build query object
    let query: any = {};

    if (category) {
      query.category = category;
    }

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    if (minPrice || maxPrice) {
      query.price = { $gte: minPrice, $lte: maxPrice };
    }

    const skip = (page - 1) * limit;

    const findOperations = Product.find(query).skip(skip).limit(limit);

    if (limitFields) {
      findOperations.select(limitFields);
    }

    const sortBy = sort?.split(",").join(" ");

    if (topViews) {
      findOperations.sort({ views: -1 });
    } else {
      findOperations.sort(sortBy);
    }
    // Execute the query
    const products = await findOperations.exec();

    const totalProducts = await Product.countDocuments(query);
    const totalPages = Math.ceil(totalProducts / limit);

    const categoryCounts = await Product.aggregate([
      { $match: {} },
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $project: { _id: 0, category: "$_id", count: 1 } },
    ]);

    return new Response(
      JSON.stringify({
        products,
        pagination: {
          totalPages,
          totalProducts,
          currentPage: page,
        },
        categoryCounts,
      }),
      { status: 200 }
    );
  } catch (error: any) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: "An error occurred.", error: error?.message }),
      { status: 500 }
    );
  }
};
