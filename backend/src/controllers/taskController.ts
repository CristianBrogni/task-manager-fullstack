import { Request, Response } from "express";
import Task, { ITask } from "../models/Task";

export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar tarefas", error });
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ message: "O titulo é obrigatório" });
    }
    const newTask: ITask = new Task({
      title,
      description,
      completed: false,
    });
    const savedTask = await newTask.save();
    res.status(200).json(savedTask);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar tarefa", error });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description, completed },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(400).json({ message: "Tarefa não encontrada" });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar tarefa", error });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ message: "Tarefa não encontrada" });
    }
    res.status(200).json({ message: "Tarefa excluida com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao excluir tarefa", error });
  }
};
