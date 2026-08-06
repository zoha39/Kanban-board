const TASKS_KEY = "jira_tasks";

export const loadTasks = () => {
  try {
    const tasks = localStorage.getItem(TASKS_KEY);
    return tasks ? JSON.parse(tasks) : [];
  } catch {
    return [];
  }
};

export const saveTasks = (tasks) => {
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
};
