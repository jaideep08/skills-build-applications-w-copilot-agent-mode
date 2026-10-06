import { model, Schema } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    points: { type: Number, default: 0, min: 0 },
    rank: { type: Number, min: 1 },
  },
  { timestamps: true, strict: false },
);

export default model('Leaderboard', leaderboardSchema);
