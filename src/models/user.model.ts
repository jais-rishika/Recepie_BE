import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      minLength: 3,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
    },
    fullName: {
      type: String,
      required: true,
      minLength: 3,
      trim: true,
      index: true,
    },
    profile: {
      type: String,
      required: false,
    },
    blockedUsers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = async function () {
  const token = jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullname: this.fullname,
    },
    process.env.ACCESS_TOKEN_SECRET!,
    {
      expiresIn: (process.env.ACCESS_TOKEN_EXPIRY ||
        "1h") as jwt.SignOptions["expiresIn"],
    },
  );
  return token;
};

userSchema.methods.generateRefreshToken = async function () {
  const token = jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullname: this.fullname,
    },
    process.env.REFERESH_TOKEN_SECRET!,
    {
      expiresIn: (process.env.REFERESH_TOKEN_EXPIRY ||
        "8d") as jwt.SignOptions["expiresIn"],
    },
  );

  return token;
};

export const User = mongoose.model("User", userSchema);
