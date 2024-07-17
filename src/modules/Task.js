export default class Task {
    constructor(title, dueDate, priority) {
        this.title = title;
        this.dueDate = dueDate;
        this.priority = priority;
    }

    setTitle(title) {
        this.title = title;
    }

    getTitle() {
        return this.title;
    }

    getDate() {
        return this.dueDate;
    }

    getPriority() {
        return this.priority;
    }
}