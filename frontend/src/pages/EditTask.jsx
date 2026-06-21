import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTaskById, updateTask } from "../services/taskService";

function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    loadTask();
  }, []);

  const loadTask = async () => {
    try {
      const response = await getTaskById(id);

      setTitle(response.data.title);
      setDescription(response.data.description);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateTask(id, {
        title,
        description,
      });

      alert("Task Updated");

      navigate("/");
    } catch (error) {
      alert("Update Failed");
    }
  };

  return (
    <div>
      <h1>Edit Task</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <br /><br />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <br /><br />

        <button type="submit">
          Update Task
        </button>
      </form>
    </div>
  );
}

export default EditTask;