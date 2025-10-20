import { api } from "./api";
import type { Task } from "../types/task";

export const taskService = {
  getAll: async (): Promise<Task[]> => {
    const res = await api.get("/tasks");
    return res.data;
  },

  create: async (task: Omit<Task, "_id">): Promise<Task> => {
    const res = await api.post("tasks", task);
    return res.data;
  },

  update: async (id: string, task: Partial<Task>): Promise<Task> => {
    const res = await api.put(`/tasks/${id}`, task);
    return res.data;
  },

  remove: async (id: string): Promise<void> => {
    await api.delete(`/tasks/${id}`);
  },
};
