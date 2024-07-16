import Project from './Project'
import Task from './Task'
import TodoList from './TodoList'

export default class Storage {
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

        // need to set tasks?
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

}