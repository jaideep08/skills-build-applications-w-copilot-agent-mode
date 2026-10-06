import express, { type NextFunction, type Request, type Response } from 'express';
import { connectDatabase } from './config/database.js';
import Activity from './models/activity.js';
import Leaderboard from './models/leaderboard.js';
import Team from './models/team.js';
import User from './models/user.js';
import Workout from './models/workout.js';

const port = Number(process.env.PORT ?? 8000);
const codespaceName = process.env.CODESPACE_NAME;

export const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

export const app = express();

const allowedOrigins = new Set([
  'http://localhost:5173',
  ...(codespaceName ? [`https://${codespaceName}-5173.app.github.dev`] : []),
]);

app.use((request, response, next) => {
  const origin = request.headers.origin;
  if (origin && allowedOrigins.has(origin)) {
    response.setHeader('Access-Control-Allow-Origin', origin);
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    response.setHeader('Vary', 'Origin');
  }

  if (request.method === 'OPTIONS') {
    response.sendStatus(204);
    return;
  }

  next();
});

app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' });
});

app.get('/api/users/', async (_request, response) => {
  response.json(await User.find().lean());
});

app.get('/api/teams/', async (_request, response) => {
  response.json(await Team.find().lean());
});

app.get('/api/activities/', async (_request, response) => {
  response.json(await Activity.find().lean());
});

app.get('/api/leaderboard/', async (_request, response) => {
  response.json(await Leaderboard.find().sort({ points: -1 }).lean());
});

app.get('/api/workouts/', async (_request, response) => {
  response.json(await Workout.find().lean());
});

app.use(
  (error: unknown, _request: Request, response: Response, _next: NextFunction) => {
    console.error('API request failed:', error);
    response.status(500).json({ error: 'Internal server error' });
  },
);

export async function startServer() {
  await connectDatabase();
  return app.listen(port, '0.0.0.0', () => {
    console.log(`OctoFit API listening at ${baseUrl}`);
  });
}
