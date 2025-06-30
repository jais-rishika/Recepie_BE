import mongoose, { Schema } from "mongoose";

export interface INotification extends Document {
  recipient: mongoose.Types.ObjectId;
  sender: mongoose.Types.ObjectId;
  type: "like" | "comment" | "follow" | "new_recipe";
  recipe?: mongoose.Types.ObjectId;
  isRead: boolean;
  message?: string;
  createdAt: Date;
}

const notificationSchema = new Schema(
  {
    recipient: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["like", "comment", "follow", "new_recipe"],
      required: true,
    },
    recipe: {
      type: Schema.Types.ObjectId,
      ref: "Recipe",
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    message: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const Notification = mongoose.model<INotification>(
  "Notification",
  notificationSchema,
);
