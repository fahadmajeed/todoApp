import React from "react";
import "./todo.css";
import { IProps } from "./interfaces";

export const Todo = ({ value, onClick}: IProps) => {
    return (
        <article className="num">
            <button className="todo-check" onClick={() => onClick(value)}></button>
            <h3>{value}</h3>
        </article>
    )
}
