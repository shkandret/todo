"use client";

import { useState } from "react";

import NewTaskForm from "@/components/NewTaskForm";
import TaskList from "@/components/TaskList";
import Footer from "@/components/Footer";

import styles from "./page.module.scss";

export default function Home() {
  const [taskList, setTaskList] = useState([] as any);
  const [maxId, setMaxId] = useState(1);
  const [filter, setFilter] = useState("all");

  const addTask = (label: string, minutes: number, seconds: number) => {
    setMaxId(maxId + 1);
    setTaskList(() => {
      const newTask = {
        id: maxId,
        label: label,
        isCompleted: false,
        isRunning: false,
        time: Math.floor(minutes * 60) + Number(seconds),
        createTime: new Date(),
      };
      return [...taskList, newTask];
    });
  };

  const deleteTask = (id: number) => {
    setTaskList(() => {
      return taskList.filter((task: any) => task.id !== id);
    });
  };

  const clearCompleted = () => {
    setTaskList(taskList.filter((task: any) => !task.isCompleted));
  };

  const onChangeTaskState = (id: number) => {
    setTaskList(() => {
      return taskList.map((task: any) => {
        if (task.id === id) {
          return { ...task, isCompleted: !task.isCompleted };
        }
        return task;
      });
    });
  };

  const onChangeLabel = (id: number, label: string) => {
    setTaskList(() => {
      return taskList.map((task: any) => {
        if (task.id === id) {
          return { ...task, label: label };
        }
        return task;
      });
    });
  };

  const onChangeFilterState = (state: string) => {
    setFilter(state);
  };

  const onChangeTimerState = (id: number, isRunning: boolean) => {
    setTaskList(() => {
      return taskList.map((task: any) => {
        if (task.id === id) {
          return { ...task, isRunning: isRunning };
        }
        return task;
      });
    });
  };

  const onFilter = () => {
    switch (filter) {
      case "all":
        return taskList;
      case "active":
        return taskList.filter((item: any) => !item.isCompleted);
      case "completed":
        return taskList.filter((item: any) => item.isCompleted);
      default:
        return taskList;
    }
  };

  return (
    <main className={styles["app"]}>
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm onTaskAdded={addTask} />
      </header>
      <section className={styles["main"]}>
        <TaskList
          tasks={onFilter()}
          onDeleted={deleteTask}
          onChangeTaskState={onChangeTaskState}
          onChangeTimerState={onChangeTimerState}
          onChangeLabel={onChangeLabel}
        />
        <Footer
          tasksLeft={taskList.length}
          onChangeFilterState={onChangeFilterState}
          onClearCompleted={clearCompleted}
        />
      </section>
    </main>
  );
}
