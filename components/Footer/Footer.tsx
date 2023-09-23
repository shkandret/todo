import TasksFilter from "../TasksFilter";

import styles from "./Footer.module.scss";

interface FooterProps {
  tasksLeft: number;
  onChangeFilterState: any;
  onClearCompleted: any;
}

const Footer: React.FC<FooterProps> = ({
  tasksLeft,
  onChangeFilterState,
  onClearCompleted,
}) => {
  return (
    <footer className={styles["footer"]}>
      <span className={styles["todo-count"]}>{tasksLeft} items left</span>
      <TasksFilter onChangeFilterState={onChangeFilterState} />
      <button
        className={styles["clear-completed"]}
        onClick={() => onClearCompleted()}
      >
        Clear completed
      </button>
    </footer>
  );
};

export default Footer;
