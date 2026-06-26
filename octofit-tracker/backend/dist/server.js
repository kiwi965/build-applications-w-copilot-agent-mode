"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const models_1 = require("./models");
const app = (0, express_1.default)();
const PORT = Number(process.env.PORT || 8000);
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:${PORT}`;
app.use(express_1.default.json());
app.get(['/api/health', '/api/health/'], (_req, res) => {
    res.json({ status: 'ok', apiUrl: apiBaseUrl });
});
app.get(['/api/config', '/api/config/'], (_req, res) => {
    res.json({ apiUrl: apiBaseUrl, port: PORT });
});
app.get(['/api/users', '/api/users/'], async (_req, res) => {
    const users = await models_1.User.find({}).lean();
    res.json({ apiUrl: apiBaseUrl, items: users });
});
app.post(['/api/users', '/api/users/'], async (req, res) => {
    const user = await models_1.User.create(req.body);
    res.status(201).json({ apiUrl: apiBaseUrl, item: user });
});
app.get(['/api/teams', '/api/teams/'], async (_req, res) => {
    const teams = await models_1.Team.find({}).lean();
    res.json({ apiUrl: apiBaseUrl, items: teams });
});
app.post(['/api/teams', '/api/teams/'], async (req, res) => {
    const team = await models_1.Team.create(req.body);
    res.status(201).json({ apiUrl: apiBaseUrl, item: team });
});
app.get(['/api/activities', '/api/activities/'], async (_req, res) => {
    const activities = await models_1.Activity.find({}).lean();
    res.json({ apiUrl: apiBaseUrl, items: activities });
});
app.post(['/api/activities', '/api/activities/'], async (req, res) => {
    const activity = await models_1.Activity.create(req.body);
    res.status(201).json({ apiUrl: apiBaseUrl, item: activity });
});
app.get(['/api/leaderboard', '/api/leaderboard/'], async (_req, res) => {
    const leaderboard = await models_1.LeaderboardEntry.find({}).lean();
    res.json({ apiUrl: apiBaseUrl, items: leaderboard });
});
app.get(['/api/workouts', '/api/workouts/'], async (_req, res) => {
    const workouts = await models_1.Workout.find({}).lean();
    res.json({ apiUrl: apiBaseUrl, items: workouts });
});
app.post(['/api/workouts', '/api/workouts/'], async (req, res) => {
    const workout = await models_1.Workout.create(req.body);
    res.status(201).json({ apiUrl: apiBaseUrl, item: workout });
});
const startServer = async () => {
    await mongoose_1.default.connect(MONGO_URI);
    app.listen(PORT, () => {
        console.log(`Backend listening on port ${PORT}`);
        console.log(`API base URL: ${apiBaseUrl}`);
    });
};
startServer().catch((error) => {
    console.error('Failed to start server', error);
    process.exit(1);
});
