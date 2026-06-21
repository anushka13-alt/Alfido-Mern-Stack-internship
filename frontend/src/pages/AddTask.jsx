import { useState } from "react";
import { createTask } from "../services/taskService";

function AddTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createTask({
        title,
        description,
        priority: "medium",
      });

      alert("Task Created");

      setTitle("");
      setDescription("");
    } catch (error) {
      alert("Error creating task");
    }
  };

  return (
    <div>
      <h1>Add Task</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <br /><br />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <br /><br />

        <button type="submit">
          Add Task
        </button>
      </form>
    </div>
  );
}

export default AddTask;