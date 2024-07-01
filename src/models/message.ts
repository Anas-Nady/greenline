import mongoose from "mongoose";
import slugify from "slugify";
import validator from "validator";

const messageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please enter your email."],
      validate: {
        validator: function (value: string) {
          return validator.isEmail(value);
        },
        message: (props: any) =>
          `"${props.value}" is not a valid email address.!`,
      },
    },
    slug: { type: String, required: true },

    message: {
      type: String,
      required: [true, "Please write your message.!"],
    },
    phone: String,
    read: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

messageSchema.pre("save", function (next) {
  this.slug = slugify(`${this.name}-${Date.now()}`, {
    lower: true,
    trim: true,
  });
  next();
});

messageSchema.pre("save", function (next) {
  // Replace consecutive newline characters with <br> tags
  this.message = this.message.replace(/[\r\n]{2,}/g, "<br><br>");
  next();
});

const Message =
  mongoose.models.Message || mongoose.model("Message", messageSchema);
export default Message;
