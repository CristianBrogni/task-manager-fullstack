import mongoose, { Document, Schema } from "mongoose";

export interface ITask extends Document {
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
}

const TaskSchema = new Schema<ITask>({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Task = mongoose.model<ITask>("Task", TaskSchema);

export default Task;
