import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models';

// Seed the octofit_db database with test data
const seedDatabase = async () => {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';

  await mongoose.connect(uri);
  console.log('Connected to MongoDB for seeding');

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    LeaderboardEntry.deleteMany({}),
    Workout.deleteMany({}),
  ]);

  const users = await User.insertMany([
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

  await Team.insertMany([
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

  await Activity.insertMany([
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

  await LeaderboardEntry.insertMany([
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

  await Workout.insertMany([
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
  await mongoose.disconnect();
};

seedDatabase().catch((error) => {
  console.error('Seed failed', error);
  process.exit(1);
});
