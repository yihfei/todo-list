export const Priority = Object.freeze({
  HIGH: "High",
  MEDIUM: "Medium",
  LOW: "Low",
});

export class Todo {
  constructor(title, dueDate, priority = Priority.MEDIUM) {
    this.id = Date.now().toString();
    this.title = title;
    this.dueDate = dueDate;
    this.priority = priority;
    this.isCompleted = false; // The simple checkbox status
  }

  toggleComplete() {
    this.isCompleted = !this.isCompleted;
  }
}
