import Task from "../Task";
import styles from "./TaskList.module.scss";

interface TaskListProps {
  tasks: Array<{
    id: number;
    label: string;
    isCompleted: boolean;
    isRunning: boolean;
    time: number;
    createTime: number;
  }>;
  onDeleted: (id: number) => void;
  onChangeTaskState: (id: number) => void;
  onChangeTimerState: (id: number, isRunning: boolean) => void;
  onChangeLabel: (id: number, label: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onDeleted,
  onChangeTaskState,
  onChangeTimerState,
  onChangeLabel,
}) => {
  return (
    <ul className={styles["task-list"]}>
      {tasks.map((task) => (
        <li key={task.id}>
          <Task
            data={task}
            onDeleted={onDeleted}
            onChangeTaskState={onChangeTaskState}
            onChangeTimerState={onChangeTimerState}
            onChangeLabel={onChangeLabel}
          />
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
