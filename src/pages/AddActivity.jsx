import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

function AddActivity() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const addTodo = (event) => {
    event.preventDefault();
    if (!newTodo) {
      alert("task is required");
      return;
    }
    setTodos([
      ...todos,
      { id: todos.length + 1, text: newTodo, completed: false },
    ]);
    setNewTodo("");
  };

  return (
    <Container className="my-4">
      <Row>
        <Col>
          <Form onSubmit={addTodo}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Task Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter task"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
              />
            </Form.Group>
            <div className="d-grid gap-2">
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default AddActivity;
