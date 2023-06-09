import { Schema, model, models } from "mongoose";

const PostSchema = new Schema(
  {
    patientId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    severity: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "low",
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
