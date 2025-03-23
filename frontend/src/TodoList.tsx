import React from 'react';
import { Button } from './components/ui/button.tsx';
import { Input } from './components/ui/input.tsx';

type Task = {
  description: string,
  completed_at: Date | null,
  id: number,
};

function TodoList() {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [tasks, setTasks] = React.useState<Task[]>([]);

  const fetchTasks = React.useCallback(async () => {
    const response = await fetch('/api/tasks/current/', {
      method: 'GET',
    });
    if (response.ok) {
      setTasks(await response.json());
    }
    setLoading(false);
  }, [setLoading, setTasks]);

  React.useEffect(() => {
    if (loading) {
      fetchTasks();
    }
  }, [loading, fetchTasks]);

  const updateTask = React.useCallback((event: any, id: number) => {
    const updatedTask = tasks.find((t) => t.id === id);
    if (!updatedTask) {
      throw new Error("Woah that task does not exist!");
    }
    if (event.target.checked) {
      updatedTask.completed_at = new Date();
    } else {
      updatedTask.completed_at = null;
    }
    setTasks([...tasks]);
  }, [tasks, setTasks]);

  return (
    <div className="m-4">
      <div className="flex justify-between">
        <h1 className="text-3xl">Current Tasks</h1>
        {loading && <img src="/static/loading.svg" className="w-8 animate-spin mb-1" />}
      </div>
      <hr className="border border-black border-solid mb-1" />
      {tasks.map((task) => {
        return (
          <div key={task.id} className="flex items-center gap-2">
            <Input
              className="w-5"
              type="checkbox" id={`task-${task.id}`}
              onChange={(event: any) => updateTask(event, task.id)}
            />
            <label htmlFor={`task-${task.id}`} className="text-lg">
              {task.completed_at ? (
                <s>{task.description}</s>
              ) : (
                <span>{task.description}</span>
              )}
            </label>
          </div>
        );
      })}
      {Boolean(tasks.length) || (
        Array(8).fill(0).map(() => (
          <div className="flex items-center gap-2">
            <Input
              className="w-5"
              disabled
              type="checkbox"
            />
            <span className="animate-pulse bg-gray-300 text-gray-300 text-lg">
              aaaaaaaaaaaaaaaaaaaaaaaa
            </span>
          </div>
        ))
      )}
      <div className="mt-2">
        <Button asChild variant="link" className="bg-orange-400">
          <a href="/">
            Back
          </a>
        </Button>
      </div>
    </div>
  );
}

export default TodoList;
