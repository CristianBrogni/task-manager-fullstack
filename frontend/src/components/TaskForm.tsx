import { useState } from "react";
import type { Task } from "../types/task";
import { taskService } from "../services/taskServices";

interface TaskFormProps {
  onTaskCreated: (task: Task) => void;
}

export function TaskForm({ onTaskCreated }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("O título é obrigatório");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const newTask = await taskService.create({
        title,
        description,
        completed: false,
      });
      onTaskCreated(newTask);
      setTitle("");
      setDescription("");
    } catch (err) {
      console.error(err);
      setError("Erro ao criar tarefa. Tente novamente");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-4 p-4 border rounded-lg shadow-sm bg-white"
    >
      <h2 className="text-lg font-semibold mb-2">Nova Tarefa</h2>

      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border rounded px-3 py-2 mb-2 focus:outline-none focus:ring-blue-300"
      />
      <textarea
        placeholder="Descrição (opcional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border rounded px-3 py-2 mb-2 focus:outline-none focus:ring-blue-300"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
      >
        {" "}
        {loading ? "Criando..." : "Adicionar"}{" "}
      </button>
    </form>
  );
}
