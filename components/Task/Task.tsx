import React, { useState, useRef, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import classNames from "classnames";
import styles from "./Task.module.scss";

interface TaskProps {
  data: {
    id: number;
    label: string;
    isCompleted: boolean;
    isRunning: boolean;
    time: number;
    createTime: number;
  };
  onDeleted: (id: number) => void;
  onChangeTaskState: (id: number) => void;
  onChangeTimerState: (id: number, isRunning: boolean) => void;
  onChangeLabel: (id: number, label: string) => void;
}

const formatTime = (seconds: number) => {
  let minutes = Math.floor(seconds / 60);
  let remainingSeconds = seconds % 60;

  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const formattedSeconds =
    remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`;

  return `${formattedMinutes}:${formattedSeconds}`;
};

const Task: React.FC<TaskProps> = ({
  data,
  onDeleted,
  onChangeTaskState,
  onChangeTimerState,
  onChangeLabel,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedLabel, setEditedLabel] = useState(data.label);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onChangeLabel(data.id, editedLabel);
      setIsEditing(false);
    }
  };

  const [timeLeft, setTimeLeft] = useState<string>(() => {
    return formatTime(data.time);
  });
  const [elapsedTime, setElapsedTime] = useState<string>(() => {
    return formatDistanceToNow(data.createTime, {
      includeSeconds: true,
      addSuffix: true,
    });
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      setElapsedTime(() => {
        return formatDistanceToNow(data.createTime, {
          includeSeconds: true,
          addSuffix: true,
        });
      });
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [data.createTime]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (data.isRunning && data.time > 0) {
        onChangeTimerState(data.id, true);
      } else if (data.time === 0 && !data.isCompleted) {
        onChangeTaskState(data.id);
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [
    data.id,
    data.isRunning,
    data.time,
    data.isCompleted,
    onChangeTaskState,
    onChangeTimerState,
  ]);

  return (
    <div
      className={classNames(styles["task"], {
        [styles["completed"]]: data.isCompleted,
      })}
    >
      <div className={classNames(isEditing && "hidden", styles["view"])}>
        <input
          className={styles["toggle"]}
          type="checkbox"
          onClick={() => onChangeTaskState(data.id)}
          defaultChecked={data.isCompleted}
        />
        <label>
          <span className={styles["title"]}>{data.label}</span>
          <span className={styles["description"]}>
            <button
              className={classNames(styles["icon"], styles["icon-play"])}
              onClick={() => onChangeTimerState(data.id, true)}
            />
            <button
              className={classNames(styles["icon"], styles["icon-pause"])}
              onClick={() => onChangeTimerState(data.id, false)}
            />
            <span style={{ marginLeft: "16px" }}>{formatTime(data.time)}</span>{" "}
          </span>
          <span className={styles["description"]}>{elapsedTime}</span>
        </label>
        <button
          className={classNames(styles["icon"], styles["icon-edit"])}
          onClick={handleEditClick}
        />
        <button
          className={classNames(styles["icon"], styles["icon-destroy"])}
          onClick={() => onDeleted(data.id)}
        ></button>
      </div>
      {isEditing ? (
        <div className={styles["edit-container"]}>
          <input
            className={styles["edit"]}
            type="text"
            autoFocus
            value={editedLabel}
            onChange={(e) => setEditedLabel(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Task;
