import React, { FC, useState, useEffect, ChangeEvent } from "react";
import { uuid } from 'uuidv4';
import "./TodoList.css";
import { Todo } from "./todo";
import { ITask } from "./interfaces";

interface IListProps {}
const LOCAL_LIST_KEY = 'todos';

export const TodoList: FC<IListProps> = () => {
  const [todos, setTodoList] = useState<ITask[]>([]);
  const [task, setTask] = useState<string>("");
  const [validationError, setValidationError] = useState<string>("");

  useEffect(() => {
    const items = localStorage.getItem(LOCAL_LIST_KEY) || "";
    const todos = JSON.parse(items);
    setTodoList(todos);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_LIST_KEY, JSON.stringify(todos));
  }, [todos]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === "task") {
      setTask(event.target.value);
    } 
  };

  const onEdit = (task: ITask) => {
    const filteredItems = todos.filter(item => item.id !== task.id);
    const newTodos = [...filteredItems, task];
    setTodoList(newTodos);
  }

  const addTask = (): void => {
    if (task !== "") {
      const newTask =  { id: uuid(), value: task };
      setTodoList([...todos, newTask]);
      setTask("");
      setValidationError("");
    } else {
      setValidationError("Task value can't be empty...");
    }
  };

  const markDone = (taskName: string): void => {
    setTodoList(
      todos.filter((task) => {
        return task.value !== taskName;
      })
    );
  };

  return (
    <div>
      <div> 
        <h2>Igloo.energy TodoList</h2>
        <div className="App container">
        {validationError !== "" && <h3 className="invalid_input">{validationError}</h3>}
          <div className="header">
            <div className="inputContainer">
              <input
                type="text"
                placeholder="Task..."
                name="task"
                value={task}
                onChange={handleChange}
              />
            </div>
            <button onClick={addTask} >Add Task</button>
          </div>

          <div className="todoList list">
            <h4>Click on task text to edit it and on checkbox to delete it!</h4>
            {todos.length > 0 ? todos.map((task: ITask) => {
              return <Todo key={task.id} value={task} onClick={markDone} onEdit={onEdit} />;
            }): <h3>No todos found!</h3>}
          </div>
        </div>
      </div>
    </div>
  );
}