import { model, Schema } from 'mongoose';

const workoutSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    category: { type: String, trim: true },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'] },
  },
  { timestamps: true, strict: false },
);

export default model('Workout', workoutSchema);
