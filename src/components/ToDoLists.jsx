import React, { useState } from "react";
import data from "../data/data.json";
import { InputGroup, Form, Button } from "react-bootstrap";
import { MdDelete, MdEdit } from "react-icons/md";

function ToDoLists({ task, complete, id }) {
  const [tasks, setTasks] = useState([]);
  const handleDelete = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };
  const handleComplete = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, complete: !task.completed } : task
    );
    setTasks(updatedTasks);
  };
  return (
    <InputGroup className="mt-3">
      <Form.Control placeholder={task} readOnly />
      <InputGroup.Checkbox
        checked={complete}
        onChange={() => handleComplete(id)}
      />
      <Button variant="outline-warning">
        <MdEdit />
      </Button>
      <Button variant="outline-danger" onClick={() => handleDelete(id)}>
        <MdDelete />
      </Button>
    </InputGroup>
  );
}

export default ToDoLists;
