import React, { useState, ChangeEvent } from "react";
import "./todo.css";
import { IProps } from "./interfaces";

export const Todo = ({ value, onClick, onEdit}: IProps) => {
    const [ editMode, setEditMode ] = useState("");
    const [ taskValue, setTaskValue ] = useState(value.value);

    const handleEdit = (newValue: string)=> {
        const updatedTask = { id: value.id, value: newValue};
        onEdit(updatedTask);
        setEditMode("");
    }
    const hideEditBar = () => {
        setEditMode("")
    }
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setTaskValue(event.target.value);
    }
    return (
        <article className="num">
            <button className="todo-check" onClick={() => onClick(value.value)}></button>
            {(editMode === "") ?  
                <h3 onClick={() => setEditMode(value.id)}>{value.value}</h3>: 
            <div>
                <input type="text" className={`${!taskValue ? "invalid_input" : ""}`} value={taskValue} onChange={handleInputChange} />                
                {!taskValue && <span className="invalid_input">  Invalid task value</span>}
                <button className={`save`}  disabled={!taskValue} onClick={() => handleEdit(taskValue)}>Save
                </button>
                <button className="cancel" onClick={hideEditBar}>Cancel
                </button>
            </div>}
        </article>
    )
}
