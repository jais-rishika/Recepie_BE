import mongoose, { Schema } from "mongoose";

const favouriteFolderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    name: {
      type: String,
      required: true, // e.g., "Healthy", "Desserts", etc.
      default: "favourites",
      trim: true,
    },

    recepie: [
      {
        type: Schema.Types.ObjectId,
        ref: "Recepie",
      },
    ],
  },

  {
    timestamps: true,
  },
);

favouriteFolderSchema.index({ user: 1, recipe: 1 }, { unique: true });

export const Favourites = mongoose.model("Favourites", favouriteFolderSchema);
