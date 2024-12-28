import { Schema, model } from 'mongoose';

export interface ITask {
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
}

const taskSchema = new Schema<ITask>(
  {
    title: { type: String, required: true },
    description: { type: String, required: false },
    completed: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default model<ITask>('Task', taskSchema);
