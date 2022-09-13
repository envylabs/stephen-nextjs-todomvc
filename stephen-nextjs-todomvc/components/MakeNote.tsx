import { useState } from "react";

export default function MakeNote(props: {onAdd: Function, todoLen: number, toggleAll: Function}) {
  const [text, setText] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.onAdd(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div id="rows">
        {props.todoLen > 0 ? (
          <label
            data-testid="MarkAllComplete"
            id="row"
            onClick={() => props.toggleAll()}
            className="newer-todo"></label>
        ) : null}
        <input
          id="row2"
          autoFocus
          className="new-todo"
          onChange={(event) => {
            setText(event.target.value);
          }}
          placeholder="What needs to be done?"
          type="text"
          value={text}
        />
      </div>
    </form>
  );
}
