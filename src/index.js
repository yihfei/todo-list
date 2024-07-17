import "./style.css"
import Task from "./modules/Task";
import TodoList from "./modules/TodoList";
import Project from "./modules/Project";
import Storage from "./modules/Storage";
import UI from "./modules/Ui";


if (!Storage.checkTodoList()) {
    const myTask = new Task('Example Task', '2024-07-15', 'high');
    const proj = new Project("General");
    const list = new TodoList();
    list.addProject(proj);
    Storage.setTodoList(list);
}

UI.loadSidemenu();




