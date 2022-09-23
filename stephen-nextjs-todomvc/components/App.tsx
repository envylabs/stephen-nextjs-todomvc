import { useState } from "react";
import Footer from "./Footer";
import Note from "./Note";
import Header from "./Header";
import Filter from "./Filter";

import "todomvc-common/base.css";
import "todomvc-app-css/index.css";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

/**
 * Todo
 *
 * [X] 7 tests passing
 * [X] Bug: You can currently add an "empty" todo
 * [X] Bug: You can currently edit an item to have an "empty" title, this is supposed to delete an item per the app spec.
 * [X] : add eslint and prettier
 * [] : Get firebase database receiving data
 * [] :  firebase console, you can restrict which domains can use that key though,  otherwise anyone can use that key and eat up your quota
 * [] : Have nextjs sending todo data to the db- get uuid package installed, maybe next already has this
 * [] : use firebase authentication and login users with id/google login, e.g. on creategroupsurvey.js line 158 and down
 * [] : use next built in router for nav between login and todo page
 * [] : add authentication with firebase, go to web console enable there, use google login,
 * [] : manage state of login with Zustand, so that it is global level.
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
  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  };

  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

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

  // replacing the states with push and pull the todos to firebase
  // example is ligonier selfSurvey, dataexplorer.js line 297
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
