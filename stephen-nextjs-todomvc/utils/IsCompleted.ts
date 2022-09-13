import { screen } from "@testing-library/react";

export async function isCompleted(title: string) {
  const todoCompleted = await screen.findByLabelText(`Complete ${title}`);

  if (!(todoCompleted instanceof HTMLInputElement)) {
    throw new Error(
      `Expected "Complete ${title}" to be an INPUT element, instead got ${typeof todoCompleted}`,
    );
  }

  return todoCompleted.checked;
}
