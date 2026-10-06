import { model, Schema } from 'mongoose';

const activitySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    activityType: { type: String, trim: true },
    duration: { type: Number, min: 0 },
    distance: { type: Number, min: 0 },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true, strict: false },
);

export default model('Activity', activitySchema);
