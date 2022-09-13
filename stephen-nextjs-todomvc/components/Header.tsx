import React from "react";
import MakeNote from "./MakeNote";

function Header(props: {addTodo: Function, todoLen: number, toggleAll: Function}) {
  return (
    <header className="header">
      <h1>todos</h1>
      <MakeNote onAdd={props.addTodo} todoLen={props.todoLen} toggleAll={props.toggleAll} />
    </header>
  );
}

export default Header;
