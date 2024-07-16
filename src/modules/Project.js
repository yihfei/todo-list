export default class Project {
    constructor(name) {
        this.name = name;
        this.tasks = [];
    }

    addTask(newTask) {
        this.tasks.push(newTask);
    } 

    deleteTask(task) {
        const taskTitle = task.getTitle();
        let index = -1;
        for (let i = 0; i < this.tasks.length; i++) {
            if (this.tasks[i].getTitle() == taskTitle) {
                index = i;
                console.log(i);
            }
        }
        if (index >= 0) {
            this.tasks.splice(index, 1);
        }
    }

    getTasks() {
        return this.tasks;
    }

    setTasks(tasks) {
        this.tasks = tasks;
    }

    getName() {
        return this.name;
    }


}