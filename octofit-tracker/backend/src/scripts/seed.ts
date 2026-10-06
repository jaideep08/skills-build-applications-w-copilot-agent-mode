import mongoose from 'mongoose';
import { connectionString } from '../config/database.js';
import activity from '../models/activity.js';
import leaderboard from '../models/leaderboard.js';
import team from '../models/team.js';
import user from '../models/user.js';
import workout from '../models/workout.js';

const seedKey = /^octofit-demo-/;

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase(): Promise<void> {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');

    await Promise.all([
      user.deleteMany({ seedKey }),
      team.deleteMany({ seedKey }),
      activity.deleteMany({ seedKey }),
      leaderboard.deleteMany({ seedKey }),
      workout.deleteMany({ seedKey }),
    ]);

    const users = await user.insertMany([
      {
        seedKey: 'octofit-demo-user-alex',
        name: 'Alex Morgan',
        username: 'alexm',
        email: 'alex.morgan@example.com',
      },
      {
        seedKey: 'octofit-demo-user-jamie',
        name: 'Jamie Chen',
        username: 'jamiec',
        email: 'jamie.chen@example.com',
      },
      {
        seedKey: 'octofit-demo-user-riley',
        name: 'Riley Patel',
        username: 'rileyp',
        email: 'riley.patel@example.com',
      },
    ]);

    const [alex, jamie, riley] = users;
    const teams = await team.insertMany([
      {
        seedKey: 'octofit-demo-team-trailblazers',
        name: 'Trailblazers',
        members: [alex._id, jamie._id],
      },
      {
        seedKey: 'octofit-demo-team-pace-setters',
        name: 'Pace Setters',
        members: [riley._id],
      },
    ]);

    await activity.insertMany([
      {
        seedKey: 'octofit-demo-activity-alex-run',
        user: alex._id,
        activityType: 'running',
        duration: 35,
        distance: 5.2,
        date: new Date('2026-10-05T08:00:00.000Z'),
      },
      {
        seedKey: 'octofit-demo-activity-jamie-cycle',
        user: jamie._id,
        activityType: 'cycling',
        duration: 45,
        distance: 14,
        date: new Date('2026-10-05T09:00:00.000Z'),
      },
      {
        seedKey: 'octofit-demo-activity-riley-walk',
        user: riley._id,
        activityType: 'walking',
        duration: 50,
        distance: 4.1,
        date: new Date('2026-10-05T10:00:00.000Z'),
      },
    ]);

    await leaderboard.insertMany([
      { seedKey: 'octofit-demo-leaderboard-alex', user: alex._id, points: 520, rank: 1 },
      { seedKey: 'octofit-demo-leaderboard-jamie', user: jamie._id, points: 430, rank: 2 },
      { seedKey: 'octofit-demo-leaderboard-riley', user: riley._id, points: 390, rank: 3 },
    ]);

    await workout.insertMany([
      {
        seedKey: 'octofit-demo-workout-endurance-run',
        name: 'Endurance Run',
        description: 'A steady-paced outdoor run to build aerobic endurance.',
        category: 'running',
        difficulty: 'beginner',
      },
      {
        seedKey: 'octofit-demo-workout-strength-circuit',
        name: 'Full-Body Strength Circuit',
        description: 'A balanced circuit of bodyweight strength exercises.',
        category: 'strength',
        difficulty: 'intermediate',
      },
      {
        seedKey: 'octofit-demo-workout-recovery-ride',
        name: 'Recovery Ride',
        description: 'An easy cycling session focused on active recovery.',
        category: 'cycling',
        difficulty: 'beginner',
      },
    ]);

    console.log(`Seeded ${users.length} users and ${teams.length} teams, plus activities, leaderboard, and workouts.`);
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase().catch((error: unknown) => {
  console.error('Error seeding database:', error);
  process.exitCode = 1;
});
