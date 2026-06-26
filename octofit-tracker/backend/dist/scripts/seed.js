"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
const database_1 = require("../config/database");
// Seed the octofit_db database with test data
const seedDatabase = async () => {
    await (0, database_1.connectDatabase)();
    console.log('Connected to MongoDB for seeding');
    await Promise.all([
        models_1.User.deleteMany({}),
        models_1.Team.deleteMany({}),
        models_1.Activity.deleteMany({}),
        models_1.LeaderboardEntry.deleteMany({}),
        models_1.Workout.deleteMany({}),
    ]);
    const users = await models_1.User.insertMany([
        {
            name: 'Avery Chen',
            email: 'avery.chen@example.com',
            role: 'captain',
            fitnessGoal: 'Train for a half marathon',
            city: 'Seattle',
        },
        {
            name: 'Jordan Patel',
            email: 'jordan.patel@example.com',
            role: 'member',
            fitnessGoal: 'Improve cycling endurance',
            city: 'Austin',
        },
        {
            name: 'Mina Alvarez',
            email: 'mina.alvarez@example.com',
            role: 'coach',
            fitnessGoal: 'Lead strength sessions',
            city: 'Denver',
        },
    ]);
    await models_1.Team.insertMany([
        {
            name: 'River Runners',
            sport: 'Running',
            members: 8,
            focus: 'Endurance and pace work',
        },
        {
            name: 'Peak Cyclists',
            sport: 'Cycling',
            members: 6,
            focus: 'Hill climbs and interval sessions',
        },
    ]);
    await models_1.Activity.insertMany([
        {
            userId: users[0]._id.toString(),
            type: 'Run',
            duration: 45,
            calories: 420,
            date: new Date('2026-06-20T07:00:00Z'),
        },
        {
            userId: users[1]._id.toString(),
            type: 'Ride',
            duration: 60,
            calories: 510,
            date: new Date('2026-06-21T06:30:00Z'),
        },
        {
            userId: users[2]._id.toString(),
            type: 'Strength',
            duration: 35,
            calories: 280,
            date: new Date('2026-06-22T18:00:00Z'),
        },
    ]);
    await models_1.LeaderboardEntry.insertMany([
        {
            userId: users[0]._id.toString(),
            name: 'Avery Chen',
            points: 980,
            rank: 1,
            streak: 7,
        },
        {
            userId: users[1]._id.toString(),
            name: 'Jordan Patel',
            points: 915,
            rank: 2,
            streak: 4,
        },
        {
            userId: users[2]._id.toString(),
            name: 'Mina Alvarez',
            points: 900,
            rank: 3,
            streak: 3,
        },
    ]);
    await models_1.Workout.insertMany([
        {
            title: 'Tempo Interval Run',
            difficulty: 'Intermediate',
            duration: 30,
            focus: 'Speed and endurance',
            equipment: 'Running shoes',
        },
        {
            title: 'Core Strength Circuit',
            difficulty: 'Beginner',
            duration: 25,
            focus: 'Core stability',
            equipment: 'Yoga mat',
        },
        {
            title: 'Hill Climb Ride',
            difficulty: 'Advanced',
            duration: 40,
            focus: 'Power and stamina',
            equipment: 'Bike',
        },
    ]);
    console.log('Seed data inserted successfully');
    await (0, database_1.disconnectDatabase)();
};
seedDatabase().catch((error) => {
    console.error('Seed failed', error);
    process.exit(1);
});
