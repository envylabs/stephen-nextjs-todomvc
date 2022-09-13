import { useState } from "react";
import Footer from "./Footer";
import Note from "./Note";
import Header from "./Header";
import Filter from "./Filter";

import "todomvc-common/base.css";
import "todomvc-app-css/index.css";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";

/**
 * Todo
 *
 * [X] 7 tests passing
 * [X] Bug: You can currently add an "empty" todo
 * [X] Bug: You can currently edit an item to have an "empty" title, this is supposed to delete an item per the app spec.
 * [X] : add eslint and prettier
 */

export type Todo = {
  title: string;
  isCompleted: boolean;
};

export type Selection = "all" | "active" | "completed";

// check what type works best for App()
export default function App(): JSX.Element {
  const [todo, setTodo] = useState<Todo[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<Selection>("all");

  let filteredTodoList;

  // Add firebase initialization:
  // TODO: Replace the following with your app's Firebase project configuration
  const firebaseConfig = {
    //...
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  // Get a list of cities from your database
  async function getCities(db: any) {
    const citiesCol = collection(db, "cities");
    const citySnapshot = await getDocs(citiesCol);
    const cityList = citySnapshot.docs.map((doc) => doc.data());
    return cityList;
  }

  switch (selectedFilter) {
    case "all":
      filteredTodoList = [...todo];
      break;
    case "active":
      filteredTodoList = todo.filter((item) => !item.isCompleted);
      break;
    case "completed":
      filteredTodoList = todo.filter((item) => item.isCompleted);
      break;
    default:
      throw new Error(`Unexpected filter selected: ${selectedFilter}`);
  }

  const addTodo = (text: string) => {
    if (text) {
      setTodo([
        ...todo,
        {
          title: text,
          isCompleted: false,
        },
      ]);
    }
  };

  const clearCompleted = () => {
    setTodo(
      todo.filter((item) => {
        return !item.isCompleted;
      })
    );
  };

  const completeTodo = (toggledItem: Todo) => {
    setTodo(
      todo.map((item) => {
        if (item === toggledItem) {
          return { ...item, isCompleted: !item.isCompleted };
        }
        return item;
      })
    );
  };

  const deleteTodo = (deletedItem: Todo) => {
    setTodo(
      todo.filter((item) => {
        return item !== deletedItem;
      })
    );
  };

  const editTodo = (editedItem: Todo, title: string) => {
    if (title) {
      setTodo(
        todo.map((item) => {
          if (item === editedItem) {
            return { ...item, title };
          }
          return item;
        })
      );
    } else deleteTodo(editedItem);
  };

  const toggleAll = () => {
    const allItemsCompleted = todo.every((item) => item.isCompleted);
    setTodo(todo.map((item) => ({ ...item, isCompleted: !allItemsCompleted })));
  };

  const activeItemCount = todo.filter((item) => !item.isCompleted).length;
  const completedItemCount = todo.filter((item) => item.isCompleted).length;

  return (
    <>
      <div className="todoapp">
        <Header addTodo={addTodo} todoLen={todo.length} toggleAll={toggleAll} />
        <div>
          <ul className="todo-list">
            {filteredTodoList.map((item, index) => {
              return (
                <Note
                  key={index}
                  item={item}
                  deleteTodo={deleteTodo}
                  completeTodo={completeTodo}
                  editTodo={editTodo}
                />
              );
            })}
          </ul>
        </div>
        {todo.length > 0 ? (
          <Filter
            activeItemCount={activeItemCount}
            completedItemCount={completedItemCount}
            isCleared={clearCompleted}
            selectFilter={setSelectedFilter}
          />
        ) : null}
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}
