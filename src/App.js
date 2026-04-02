import { useState } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([
    { text: "Eat breakfast", category: "Personal" },
    { text: "Team meeting", category: "Work" },
    { text: "Buy groceries", category: "Shopping" },
    { text: "Study React", category: "Study" },
    { text: "Go to gym", category: "Health" }
  ]);

  const [editIndex, setEditIndex] = useState(null);

  // Add / Update
  const handleAddOrUpdate = () => {
    if (task.trim() === "") return;

    if (editIndex !== null) {
      const updated = [...tasks];
      updated[editIndex].text = task;
      setTasks(updated);
      setEditIndex(null);
    } else {
      setTasks([...tasks, { text: task, category: "General" }]);
    }

    setTask("");
  };

  // Delete
  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  // Edit
  const editTask = (index) => {
    setTask(tasks[index].text);
    setEditIndex(index);
  };

  // Cancel edit
  const cancelEdit = () => {
    setTask("");
    setEditIndex(null);
  };

  return (
    <div className="app">
      <h1 className="title">TO-DO LIST</h1>

      <div className="inputSection">
        <input
          type="text"
          placeholder="Enter a task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />

        <button onClick={handleAddOrUpdate}>
          {editIndex !== null ? "Update" : "Add"}
        </button>
      </div>

      <div className="taskContainer">
        {tasks.map((item, index) => (
          <div className="taskCard" key={index}>
            <div>
              <h3>{item.text}</h3>
              <span className="category">{item.category}</span>
            </div>

            <div className="actions">
              <button className="delete" onClick={() => deleteTask(index)}>
                Delete
              </button>

              <button className="edit" onClick={() => editTask(index)}>
                Edit
              </button>

              {/* Cancel button only for active edit item */}
              {editIndex === index && (
                <button className="cancel" onClick={cancelEdit}>
                  Cancel
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;