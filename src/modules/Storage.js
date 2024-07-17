import Project from './Project'
import Task from './Task'
import TodoList from './TodoList'

export default class Storage {

    static checkTodoList() {
        if (localStorage.getItem("todoList") !== null) {
            return true;
        } 
        return false;
    }

    static setTodoList(todoList) {
        localStorage.setItem("todoList", JSON.stringify(todoList));
    }

    static getTodoList() {
        const todoList = Object.assign(new TodoList(), 
            JSON.parse(localStorage.getItem("todoList")));

        todoList.setProjects(
            todoList.getProjects()
            .map(project => 
            Object.assign(new Project(), project)
        ));

        todoList.getProjects()
            .forEach(project => 
            project.setTasks(
                project.getTasks()
                .map(task => 
                Object.assign(new Task(), task)
            ))
        );
        return todoList;
    }

    static addProject(project) {
        const todoList = Storage.getTodoList();
        todoList.addProject(project);
        Storage.setTodoList(todoList);
    }

    static deleteProject(project) {
        const todoList = Storage.getTodoList();
        todoList.deleteProject(project);
        Storage.setTodoList(todoList);
    }

    static addTask(projectName, task) {
        const todoList= Storage.getTodoList();
        todoList.getProject(projectName).addTask(task);
        Storage.setTodoList(todoList);
    }

    static deleteTask(projectName, task) {
        const todoList= Storage.getTodoList();
        todoList.getProject(projectName).deleteTask(task);
        Storage.setTodoList(todoList);
    }



}