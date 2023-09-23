import React, { useState, useCallback } from "react";
import styles from "./NewTaskForm.module.scss";

interface NewTaskFormProps {
  onTaskAdded: (label: string, minutes: number, seconds: number) => void;
}

const NewTaskForm: React.FC<NewTaskFormProps> = ({ onTaskAdded }) => {
  const [inputValue, setInputValue] = useState("");
  const [minutes, setMinutes] = useState<number | string>("");
  const [seconds, setSeconds] = useState<number | string>("");

  const handleSetMinutes = useCallback((value: number) => {
    if (!isNaN(value) && value < 60) {
      setMinutes(value);
    }
  }, []);

  const handleSetSeconds = useCallback((value: number) => {
    if (!isNaN(value) && value < 60) {
      setSeconds(value);
    }
  }, []);

  const handleSubmit = useCallback(() => {
    if (inputValue.trim() !== "") {
      onTaskAdded(
        inputValue,
        parseInt(minutes as string) || 0,
        parseInt(seconds as string) || 0
      );
      setInputValue("");
      setMinutes("");
      setSeconds("");
    }
  }, [inputValue, minutes, seconds, onTaskAdded]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleSubmit();
      }
    },
    [handleSubmit]
  );

  return (
    <form
      className={styles["new-task-form"]}
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        className={styles["new-task"]}
        placeholder="Task"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        aria-label="Task Name"
      />
      <input
        className={styles["new-task-form__timer"]}
        placeholder="Min"
        value={minutes as string}
        onChange={(e) => handleSetMinutes(parseInt(e.target.value))}
        onKeyDown={handleKeyDown}
        type="number"
        aria-label="Min"
      />
      <input
        className={styles["new-task-form__timer"]}
        placeholder="Sec"
        value={seconds as string}
        onChange={(e) => handleSetSeconds(parseInt(e.target.value))}
        onKeyDown={handleKeyDown}
        type="number"
        aria-label="Sec"
      />
    </form>
  );
};

export default NewTaskForm;
