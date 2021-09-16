import React, { FC, useState, useEffect, ChangeEvent } from "react";
import "./TodoList.css";
import { Todo } from "./todo";
import { ITask } from "./interfaces";

interface IListProps {}
const LOCAL_LIST_KEY = 'todos';

export const TodoList: FC<IListProps> = () => {
  const [todoList, setTodoList] = useState<ITask[]>([]);
  const [task, setTask] = useState<string>("");
  
  useEffect(() => {
    const items = localStorage.getItem(LOCAL_LIST_KEY) || "";
    const todos = JSON.parse(items);
    setTodoList(todos);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_LIST_KEY, JSON.stringify(todoList));
  }, [todoList]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === "task") {
      setTask(event.target.value);
    } 
  };

  const addTask = (): void => {
    const newTask =  { value: task };
    setTodoList([...todoList, newTask]);
    setTask("");
  };

  const markDone = (taskName: string): void => {
    setTodoList(
      todoList.filter((task) => {
        return task.value !== taskName;
      })
    );
  };

  return (
    <div>
      <div> 
        <h2>Igloo.energy TodoList</h2>
        <div className="App container">
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
            <button onClick={addTask}>Add Task</button>
          </div>
          <div className="todoList list">
            {todoList.length > 0 ? todoList.map((task: ITask, key: number) => {
              return <Todo key={key} value={task.value} onClick={markDone} />;
            }): <h3>No todos found!</h3>}
          </div>
        </div>
      </div>
    </div>
  );
}