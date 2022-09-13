import userEvent from "@testing-library/user-event";
import { findNewTodoInput } from "./FindNewTodoInput";

export async function addTodo(title: string): Promise<void> {
  const newTodoInput = await findNewTodoInput();
  await userEvent.type(newTodoInput, `${title}{enter}`);
}
