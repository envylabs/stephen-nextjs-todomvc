import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

export async function editTodo(title: string, newTitle: string) {
  userEvent.dblClick(screen.getByText(title));

  const editInput = await screen.findByLabelText(`Edit ${title}`);

  if (!(editInput instanceof HTMLInputElement)) {
    throw new Error(
      `Expected "Edit ${title}" to be an INPUT element, instead got ${typeof editInput}`
    );
  }

  editInput.setSelectionRange(0, editInput.value.length);
  await userEvent.type(editInput, newTitle, {
    initialSelectionStart: 0,
    initialSelectionEnd: editInput.value.length,
  });
}
