import mongoose from "mongoose";
import slugify from "slugify";

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product must has a name"],
      trim: true,
    },
    photo: {
      type: String,
      required: [true, "Product must has a photo"],
    },
    description: {
      type: String,
      required: [true, "Product must has a description"],
      trim: true,
    },
    cleanDescription: String,
    oldPrice: {
      type: Number,
      default: 0,
      maxLength: [7, "Product price cannot exceed 7 digits"],
    },
    price: {
      type: Number,
      required: [true, "Please enter product price"],
      maxLength: [7, "Product price cannot exceed 7 digits"],
    },
    images: [
      {
        public_id: { type: String, required: true },
        url: { type: String, required: true },
      },
    ],
    slug: { type: String, trim: true, unique: true },
    category: {
      type: String,
      required: [true, "Product must has a category"],
      enums: {
        values: ["wall-mounted", "concealed", "cassette-type"],
        message: "Please select a valid category",
      },
    },
    productIsNew: {
      type: Boolean,
      default: false,
    },
    seller: {
      type: String,
      default: "Green Line",
    },
    views: {
      type: Number,
      default: 0,
    },
  },

  { timestamps: true }
);

productSchema.pre("save", function (next) {
  this.slug = slugify(`${this.name}-${Date.now()}`, {
    trim: true,
    lower: true,
  });

  // remove HTML tags from description property and set plain text to cleanDescription property
  this.cleanDescription = this.description
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  next();
});

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);
export default Product;
