import mongoose, { Schema, model, type Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  role: 'captain' | 'member' | 'coach';
  fitnessGoal: string;
  city: string;
  createdAt: Date;
}

export interface ITeam extends Document {
  name: string;
  sport: string;
  members: number;
  focus: string;
  createdAt: Date;
}

export interface IActivity extends Document {
  userId: string;
  type: string;
  duration: number;
  calories: number;
  date: Date;
  createdAt: Date;
}

export interface ILeaderboardEntry extends Document {
  userId: string;
  name: string;
  points: number;
  rank: number;
  streak: number;
  createdAt: Date;
}

export interface IWorkout extends Document {
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: number;
  focus: string;
  equipment: string;
  createdAt: Date;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['captain', 'member', 'coach'], default: 'member' },
  fitnessGoal: { type: String, required: true },
  city: { type: String, required: true },
}, { timestamps: true });

const teamSchema = new Schema<ITeam>({
  name: { type: String, required: true },
  sport: { type: String, required: true },
  members: { type: Number, required: true },
  focus: { type: String, required: true },
}, { timestamps: true });

const activitySchema = new Schema<IActivity>({
  userId: { type: String, required: true },
  type: { type: String, required: true },
  duration: { type: Number, required: true },
  calories: { type: Number, required: true },
  date: { type: Date, default: Date.now },
}, { timestamps: true });

const leaderboardSchema = new Schema<ILeaderboardEntry>({
  userId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  points: { type: Number, required: true },
  rank: { type: Number, required: true },
  streak: { type: Number, default: 0 },
}, { timestamps: true });

const workoutSchema = new Schema<IWorkout>({
  title: { type: String, required: true },
  difficulty: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], required: true },
  duration: { type: Number, required: true },
  focus: { type: String, required: true },
  equipment: { type: String, required: true },
}, { timestamps: true });

export const User = mongoose.models.User || model<IUser>('User', userSchema);
export const Team = mongoose.models.Team || model<ITeam>('Team', teamSchema);
export const Activity = mongoose.models.Activity || model<IActivity>('Activity', activitySchema);
export const LeaderboardEntry = mongoose.models.LeaderboardEntry || model<ILeaderboardEntry>('LeaderboardEntry', leaderboardSchema);
export const Workout = mongoose.models.Workout || model<IWorkout>('Workout', workoutSchema);
