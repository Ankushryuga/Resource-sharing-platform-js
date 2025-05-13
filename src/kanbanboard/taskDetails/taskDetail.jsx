import { useLocation, useNavigate } from "react-router-dom";

export default function TaskDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const task = location.state?.task;

  if (!task) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-bold mb-4">Task not found</h1>
        <button
          onClick={() => navigate("/")}
          className="text-blue-600 underline mt-4"
        >
          Go back to Task Board
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">{task.taskName}</h1>
      <p className="text-gray-700">Task ID: {task.taskId}</p>
      <p className="text-gray-700">Assigned To: {task.assignedTo}</p>
      <p className="text-gray-700">Priority: {task.priority}</p>
      <p className="text-gray-700">
        Due Date: {new Date(task.dueDate).toLocaleDateString()}
      </p>
    </div>
  );
}
