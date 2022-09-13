import { screen } from "@testing-library/react";

export async function findNewTodoInput() {
  return await screen.findByPlaceholderText("What needs to be done?");
}
