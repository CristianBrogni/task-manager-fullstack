import { useEffect, useState } from "react";
import { taskService } from "./services/taskServices";
import type { Task } from "./types/task";
import { TaskForm } from "./components/TaskForm";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const loadTasks = async () => {
      const data = await taskService.getAll();
      setTasks(data);
    };
    loadTasks();
  }, []);

  const handleTaskCreated = (task: Task) => {
    setTasks((prev) => [...prev, task]);
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Lista de Tarefas</h1>

      <TaskForm onTaskCreated={handleTaskCreated} />
      <ul>
        {tasks.map((t) => (
          <li key={t._id} className="border-b py-2">
            {t.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
