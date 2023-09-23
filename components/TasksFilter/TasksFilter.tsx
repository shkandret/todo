import React, { useState } from "react";
import styles from "./TasksFilter.module.scss";

interface TasksFilterProps {
  onChangeFilterState: (name: string) => void;
}

const TasksFilter: React.FC<TasksFilterProps> = ({ onChangeFilterState }) => {
  const [buttons, setButtons] = useState([
    { name: "all", label: "All", isActive: true },
    { name: "active", label: "Active", isActive: false },
    { name: "completed", label: "Completed", isActive: false },
  ]);

  const handleButtonClick = (name: string) => {
    setButtons(
      buttons.map((button) => ({
        ...button,
        isActive: button.name === name,
      }))
    );
    onChangeFilterState(name);
  };

  return (
    <ul className={styles["filters"]}>
      {buttons.map(({ name, label, isActive }) => (
        <li key={name}>
          <button
            className={isActive ? styles["selected"] : ""}
            type="button"
            onClick={() => handleButtonClick(name)}
          >
            {label}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TasksFilter;
