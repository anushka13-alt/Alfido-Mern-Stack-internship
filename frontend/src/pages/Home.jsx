import { useEffect, useState } from "react";
import { getTasks, deleteTask } from "../services/taskService";

function Home() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const response = await getTasks();
      setTasks(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to load tasks");
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmDelete) return;

    try {
      await deleteTask(id);

      alert("Task Deleted Successfully");

      loadTasks(); // Refresh task list
    } catch (error) {
      alert("Failed to delete task");
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div>
      <h1>Task Manager</h1>

      {tasks.length === 0 ? (
        <p>No Tasks Found</p>
      ) : (
        tasks.map((task) => (
          <div
            key={task._id}
            style={{
              border: "1px solid black",
              padding: "10px",
              margin: "10px",
            }}
          >
            <h3>{task.title}</h3>

            <p>{task.description}</p>

            <p>Status: {task.status}</p>

            <p>Priority: {task.priority}</p>

            <button
  onClick={() =>
    window.location.href = `/edit/${task._id}`
  }
>
  Edit
</button>

{" "}

<button
  onClick={() => handleDelete(task._id)}
>

              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

<button
  onClick={() => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }}
>
  Logout
</button>

export default Home;