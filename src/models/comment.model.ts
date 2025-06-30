import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema(
  {
    user: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    recepie: [
      {
        type: Schema.Types.ObjectId,
        ref: "Recepie",
      },
    ],
    isPinned: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

commentSchema.index({ user: 1, recipe: 1 });

export const Comments = mongoose.model("Comments", commentSchema);
