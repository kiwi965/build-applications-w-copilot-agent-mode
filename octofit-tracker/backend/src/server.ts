import express from 'express';
import { Activity, LeaderboardEntry, Team, User, Workout } from './models';
import { connectDatabase } from './config/database';

const app = express();
const PORT = Number(process.env.PORT || 8000);
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${PORT}`;

app.use(express.json());

app.get(['/api/health', '/api/health/'], (_req, res) => {
  res.json({ status: 'ok', apiUrl: apiBaseUrl });
});

app.get(['/api/config', '/api/config/'], (_req, res) => {
  res.json({ apiUrl: apiBaseUrl, port: PORT });
});

app.get(['/api/users', '/api/users/'], async (_req, res) => {
  const users = await User.find({}).lean();
  res.json({ apiUrl: apiBaseUrl, items: users });
});

app.post(['/api/users', '/api/users/'], async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json({ apiUrl: apiBaseUrl, item: user });
});

app.get(['/api/teams', '/api/teams/'], async (_req, res) => {
  const teams = await Team.find({}).lean();
  res.json({ apiUrl: apiBaseUrl, items: teams });
});

app.post(['/api/teams', '/api/teams/'], async (req, res) => {
  const team = await Team.create(req.body);
  res.status(201).json({ apiUrl: apiBaseUrl, item: team });
});

app.get(['/api/activities', '/api/activities/'], async (_req, res) => {
  const activities = await Activity.find({}).lean();
  res.json({ apiUrl: apiBaseUrl, items: activities });
});

app.post(['/api/activities', '/api/activities/'], async (req, res) => {
  const activity = await Activity.create(req.body);
  res.status(201).json({ apiUrl: apiBaseUrl, item: activity });
});

app.get(['/api/leaderboard', '/api/leaderboard/'], async (_req, res) => {
  const leaderboard = await LeaderboardEntry.find({}).lean();
  res.json({ apiUrl: apiBaseUrl, items: leaderboard });
});

app.get(['/api/workouts', '/api/workouts/'], async (_req, res) => {
  const workouts = await Workout.find({}).lean();
  res.json({ apiUrl: apiBaseUrl, items: workouts });
});

app.post(['/api/workouts', '/api/workouts/'], async (req, res) => {
  const workout = await Workout.create(req.body);
  res.status(201).json({ apiUrl: apiBaseUrl, item: workout });
});

const startServer = async () => {
  await connectDatabase();
  app.listen(PORT, () => {
    console.log(`Backend listening on port ${PORT}`);
    console.log(`API base URL: ${apiBaseUrl}`);
  });
};

startServer().catch((error) => {
  console.error('Failed to start server', error);
  process.exit(1);
});
