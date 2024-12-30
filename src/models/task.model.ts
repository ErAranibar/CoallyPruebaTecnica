import { Schema, model } from 'mongoose';

export interface ITask {
  _id?: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
  userId: string;
}

const taskSchema = new Schema<ITask>(
  {
    title: { type: String, required: true },
    description: { type: String, required: false },
    completed: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    userId: { type: String, required: true },
  },
  { timestamps: true }
);

export default model<ITask>('Task', taskSchema);
