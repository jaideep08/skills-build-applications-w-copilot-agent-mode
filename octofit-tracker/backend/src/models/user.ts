import { model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, trim: true },
    username: { type: String, trim: true, lowercase: true },
    email: { type: String, trim: true, lowercase: true },
  },
  { timestamps: true, strict: false },
);

export default model('User', userSchema);
