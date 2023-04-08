import { Schema, model, models } from "mongoose";

const PostSchema = new Schema(
  {
    uid: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    description: {
      type: String,
      required: true,
    },
    images: {
      type: String,
      default: "",
    },
    severity: {
      type: Number,
      default: 0,
    },
    solved: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Posts = models.Post || model("Post", PostSchema);

export default Posts;
