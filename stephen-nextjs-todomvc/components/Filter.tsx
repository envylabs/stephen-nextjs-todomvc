import React, {FC} from "react";
import { Selection } from './App'
import "./styles.css";

interface IFilterSignature {
  activeItemCount: number;
  completedItemCount: number;
  isCleared: () => void;
  selectFilter: (state: Selection) => void;
}

const Filter: FC<IFilterSignature> = ({
  activeItemCount,
  completedItemCount,
  isCleared,
  selectFilter,
}) => {
  return (
    <div className="footer">
      <label className="todo-count" style={{ marginTop: "2px" }}>
        {activeItemCount} {activeItemCount === 1 ? "item left" : "items left"}
      </label>
      <div className="filters">
        <button
          onClick={() => {
            selectFilter("all");
          }}
          className="filterButton">
          All
        </button>
        <button
          onClick={() => {
            selectFilter("active");
          }}
          className="filterButton">
          Active
        </button>
        <button
          onClick={() => {
            selectFilter("completed");
          }}
          className="filterButton">
          Completed
        </button>
      </div>
      {completedItemCount > 0 ? (
        <button
          onClick={() => {
            isCleared();
          }}
          className="clear-completed"
          style={{ marginTop: "2px" }}>
          Clear Completed
        </button>
      ) : null}
    </div>
  );
}

export default Filter;
