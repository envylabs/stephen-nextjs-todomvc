import {
  ChangeEventHandler,
  FC,
  FocusEventHandler,
  FormEventHandler,
  KeyboardEventHandler,
  useState,
} from "react";
import { Todo } from "./App";

interface NoteSignature {
  item: Todo;
  deleteTodo: (item: Todo) => void;
  completeTodo: (item: Todo) => void;
  editTodo: (item: Todo, title: string) => void;
}

const Note: FC<NoteSignature> = ({
  completeTodo,
  deleteTodo,
  editTodo,
  item,
}) => {
  const [localTitle, setLocalTitle] = useState(item.title);
  const [isEditing, setEditing] = useState(""); // or "editing"

  const startEditing = () => {
    setEditing("editing");
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    event.preventDefault();
    setLocalTitle(event.target.value);
  };

  const finalizeEdit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    saveTodo();
  };

  const saveTodo = (): void => {
    editTodo(item, localTitle);
    setEditing("");
  };

  const onBlur: FocusEventHandler<HTMLInputElement> = (event) => {
    saveTodo();
  };

  const handleEscape: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === "Escape") {
      setEditing("");
    }
  };

  return (
    <li
      data-testid="checked note"
      className={`${isEditing} ${item.isCompleted ? "completed" : null}`}>
      <input
        aria-label={`Complete ${item.title}`}
        className="toggle"
        type="checkbox"
        onChange={() => {}}
        onClick={() => {
          completeTodo(item);
        }}
        checked={item.isCompleted}
      />
      <label onDoubleClick={startEditing} role="button">
        {isEditing ? (
          <form onSubmit={finalizeEdit}>
            <input
              aria-label={`Edit ${item.title}`}
              autoFocus
              className="edit"
              onChange={handleChange}
              onBlur={onBlur}
              onKeyDown={handleEscape}
              type="text"
              value={localTitle}></input>
          </form>
        ) : (
          item.title
        )}
      </label>
      <button
        className="destroy"
        onClick={() => {
          deleteTodo(item);
        }}></button>
    </li>
  );
};

export default Note;
