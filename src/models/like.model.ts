import mongoose, { Schema } from "mongoose";

const likeSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    recepie: {
      type: Schema.Types.ObjectId,
      ref: "Recipe",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

likeSchema.index({ user: 1, recipe: 1 }, { unique: true });

export const Likes = mongoose.model("Likes", likeSchema);
