import React from "react";
import "./todo.css";

interface IProps {
    value: String;
    onClick: () => void;
}

export const Todo: React.FC<IProps> = ({ value, onClick}) => {
    return (
        <div className="todo">
            <button className="todo-check" onClick={() => onClick()}></button>
            <div>{value}</div>
        </div>
    
    )
}
