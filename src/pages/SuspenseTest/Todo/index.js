import React, { Children } from "react";
import todos from "../dataFetch";

const Todo = () => {
  const todoList = todos();
  return (
    <div>
      <ul>
        {Children.toArray(
          todoList.map((todo) => <li kes={todo.id}>{todo.title}</li>)
        )}
      </ul>
    </div>
  );
};

export default Todo;
