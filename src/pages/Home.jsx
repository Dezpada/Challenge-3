import React, { useState, useEffect } from "react";
import {
  Container,
  Col,
  Row,
  InputGroup,
  Form,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Modal,
} from "react-bootstrap";
import { MdDelete, MdEdit, MdSearch } from "react-icons/md";
React.createElement("input", { type: "checkbox", defaultChecked: false });

function Home() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [newTodo, setNewTodo] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    // Fetch tasks from JSON file
    fetch("data.json")
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error(error));
  }, []);

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") {
      return true;
    } else if (filter === "done") {
      return task.complete;
    } else {
      return !task.complete;
    }
  });

  const searchedTasks = filteredTasks.filter((task) =>
    task.task
      ?.toString()
      .toLowerCase()
      .includes(searchTerm?.toString().toLowerCase())
  );

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleAddTodo = (event) => {
    event.preventDefault();
    setTasks([
      ...tasks,
      { id: tasks.length + 1, task: newTodo, complete: false },
    ]);
    setNewTodo("");
    setShow(false);
  };

  const handleEdit = (id, newName) => {
    const updatedTasks = tasks.map((todo) => {
      if (todo.id === id) {
        return { ...todo, task: newName };
      } else {
        return todo;
      }
    });
    setTasks(updatedTasks);
  };
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

  const handleDeleteCompleted = () => {
    const updatedTasks = tasks.filter((task) => !task.complete);
    setTasks(updatedTasks);
  };

  const handleDeleteAll = () => {
    setTasks([]);
  };

  return (
    <div>
      <Container>
        <Row className="mx-3 mt-4">
          <h2 className="my-3 text-center">ToDoSearch</h2>
        </Row>
        <Row className="mx-3 mt-4 ">
          <Container className="square border rounded">
            <Row className="mx-3 mt-4">
              <Col lg={6}>
                <InputGroup className="mb-3">
                  <Button variant="primary" id="button-addon1">
                    <MdSearch />
                  </Button>
                  <Form.Control
                    id="search-bar"
                    placeholder="Search To Do"
                    aria-label="Example text with button addon"
                    aria-describedby="basic-addon1"
                    onChange={handleSearchTermChange}
                  />
                </InputGroup>
              </Col>
              <Col></Col>
              <Col></Col>
            </Row>
            <Row className="mx-3 mt-4 mb-4">
              <Col lg={6} className="xs-my-3">
                <div className="d-grid gap-2 my-auto">
                  <Button type="submit" variant="primary">
                    Search
                  </Button>
                </div>
              </Col>
              <Col></Col>
              <Col lg={4} className="xs-my-3">
                <div className="d-grid gap-2">
                  <Button variant="primary" onClick={handleShow}>
                    Add new Task
                  </Button>
                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Add New Task</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Container className="my-4">
                        <Row>
                          <Col>
                            <Form>
                              <Form.Group className="mb-3" controlId="name">
                                <Form.Label>Task Name</Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Enter task"
                                  value={newTodo}
                                  onChange={(e) => setNewTodo(e.target.value)}
                                />
                              </Form.Group>
                            </Form>
                          </Col>
                        </Row>
                      </Container>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        Close
                      </Button>
                      <Button variant="primary" onClick={handleAddTodo}>
                        Save Changes
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </div>
              </Col>
            </Row>
          </Container>
        </Row>
        <Row className="mx-3 mt-4 ">
          <h2 className="my-3 text-center">ToDoList</h2>
        </Row>
        <Row className="mx-2 mt-4">
          <ToggleButtonGroup
            type="radio"
            name="options"
            defaultValue="all"
            onClick={handleFilterChange}
          >
            <ToggleButton id="tbg-radio-all" className="me-1" value="all">
              All
            </ToggleButton>
            <ToggleButton id="tbg-radio-done" value="done">
              Done
            </ToggleButton>
            <ToggleButton id="tbg-radio-todo" className="ms-1" value="todo">
              Todo
            </ToggleButton>
          </ToggleButtonGroup>
        </Row>
        <Row className="mx-3 mt-4">
          {searchedTasks.map((data) => (
            <InputGroup className="mt-3">
              <InputGroup.Checkbox
                checked={data.complete}
                onChange={() => handleComplete(data.id)}
              />
              <Form.Control placeholder={data.task} readOnly />
              <Button variant="outline-warning">
                <MdEdit
                  onClick={() => handleEdit(data.id, prompt("Enter new task:"))}
                />
              </Button>
              <Button
                variant="outline-danger"
                onClick={() => handleDelete(data.id)}
              >
                <MdDelete />
              </Button>
            </InputGroup>
          ))}
        </Row>
        <Row className="mx-3 my-4">
          <Col lg>
            <div className="d-grid gap-2">
              <Button variant="danger" onClick={handleDeleteCompleted}>
                Delete done tasks
              </Button>
            </div>
          </Col>
          <Col lg>
            <div className="d-grid gap-2" onClick={handleDeleteAll}>
              <Button variant="danger">Delete all tasks</Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
