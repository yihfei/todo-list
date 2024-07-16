import Task from "./Task";
import TodoList from "./TodoList";
import Project from "./Project";
import Storage from "./Storage";

export default class UI {

    static loadTodoList() {
        const todoList = Storage.getTodoList();
        todoList.getProjects()
            .forEach(project => this.loadProject(project));
    }

    static loadProject(project) {
        project.getTasks()
            .forEach(task => this.loadTask(task));
    }

    static loadTask(task) {
        const title = task.getTitle();
        const desc = task.getDescription();
        const date = task.getDate();
        const priority = task.getPriority();

        // add task card into content
        const content = document.querySelector('.content');
        const taskCard = document.createElement('div');
        taskCard.classList.add('task');
        
        const titleElement = document.createElement('h3');
        titleElement.textContent = title;
        taskCard.appendChild(titleElement);

        const descElement = document.createElement('p');
        descElement.textContent = desc;
        taskCard.appendChild(descElement);

        const dateElement = document.createElement('p');
        dateElement.textContent = date;
        taskCard.appendChild(dateElement);

        const priorityElement = document.createElement('p');
        priorityElement.textContent = priority;
        taskCard.appendChild(priorityElement);

        content.appendChild(taskCard);

    }
}