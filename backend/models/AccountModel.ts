import { Schema, model, Document } from "mongoose";

export interface IAccount extends Document {
  username: string;
  saldo: number;
  version: number;
  createdAt: Date;
  updatedAt: Date;
}

const AccountSchema: Schema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    saldo: {
      type: Number,
      required: true,
      default: 0,
    },
    version: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default model<IAccount>("Account", AccountSchema);
