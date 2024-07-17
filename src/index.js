import "./style.css"
import Task from "./modules/Task";
import TodoList from "./modules/TodoList";
import Project from "./modules/Project";
import Storage from "./modules/Storage";
import UI from "./modules/Ui";

const myTask = new Task('Example Task', '2024-07-15', 'High');
const proj = new Project("test");
const lis = new TodoList();

proj.addTask(myTask);
lis.addProject(proj);

lis.addProject(new Project("two"));
Storage.setTodoList(lis);
UI.loadSidemenu();


// console.log(lis.getProject("two"))

