import "@testing-library/jest-dom";

import { render, RenderResult } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import App from "../components/App";

function newApp(): JSX.Element {
  return <App />;
}

export async function setupApp(initialTodos = []) {
  let rerender: RenderResult["rerender"];

  const setTodos = () => {
    rerender(newApp());
  };

  await act(async () => {
    const renderResult = await render(newApp());
    rerender = renderResult.rerender;
  });
}
