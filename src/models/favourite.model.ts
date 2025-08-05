import mongoose, { Schema } from "mongoose";

const favouriteFolderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    recepie: [
      {
        type: Schema.Types.ObjectId,
        ref: "Recipe",
      },
    ],
  },

  {
    timestamps: true,
  },
);

favouriteFolderSchema.index({ user: 1, recepie: 1 }, { unique: true });

export const Favourites = mongoose.model("Favourites", favouriteFolderSchema);
