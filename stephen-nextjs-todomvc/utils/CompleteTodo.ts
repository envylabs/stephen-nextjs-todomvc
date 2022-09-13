import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

export async function completeTodo(title: string): Promise<void> {
  await userEvent.click(screen.getByLabelText(`Complete ${title}`));
}
