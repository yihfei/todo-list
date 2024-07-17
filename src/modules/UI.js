import Task from "./Task";
import TodoList from "./TodoList";
import Project from "./Project";
import Storage from "./Storage";

export default class UI {

    static clearContent() {
        const content = document.querySelector('.content');
        content.textContent = '';
    }
    
    static clearSidemenu() {
        const sidemenu = document.querySelector('.sidemenu');
        sidemenu.textContent =  '';
    }

    static loadTodoList() {
        const todoList = Storage.getTodoList();
        todoList.getProjects()
            .forEach(project => this.loadProject(project));
    }

    static loadProject(project) {
        project.getTasks()
            .forEach(task => this.loadTask(project, task));
    }

    static loadTask(project, task) {
        const content = document.querySelector('.content');
        const taskCard = this.createTaskCard(project, task);
        content.appendChild(taskCard);
    }

    static loadSidemenu() {
        UI.clearSidemenu();
        const sidemenu = document.querySelector('.sidemenu');

        const taskBtn = document.createElement('button');
        const projectBtn = document.createElement('button');
        taskBtn.textContent = 'add task';
        projectBtn.textContent = 'add project';
        taskBtn.classList.add('add-task-btn');
        projectBtn.classList.add('add-project-btn')

        taskBtn.addEventListener('click', UI.createTaskForm);
        projectBtn.addEventListener('click', UI.createProjectForm);

        sidemenu.appendChild(taskBtn);
        sidemenu.appendChild(projectBtn);


        const projects = Storage.getTodoList().getProjects();

        projects.forEach(project => {
            const projectName = project.getName();
            const projectBtn = document.createElement('button');
            projectBtn.textContent = projectName;

            projectBtn.addEventListener('click', () => {
                UI.clearContent();
                UI.loadProject(project);
                console.log('clicked!')
            })
            sidemenu.appendChild(projectBtn);
        })
    }

    static createTaskCard(project, task) {
        const title = task.getTitle();
        const date = task.getDate();
        const priority = task.getPriority();

        const taskCard = document.createElement('div');
        taskCard.classList.add('taskcard');
        
        const titleElement = document.createElement('h3');
        titleElement.classList.add('title');
        titleElement.textContent = title;
        taskCard.appendChild(titleElement);


        const dateElement = document.createElement('p');
        dateElement.classList.add('date');
        dateElement.textContent = date;
        taskCard.appendChild(dateElement);

        const priorityElement = document.createElement('p');
        priorityElement.classList.add('priority');
        priorityElement.textContent = priority;
        taskCard.appendChild(priorityElement);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'delete';
        deleteBtn.addEventListener('click', () => {
            taskCard.remove();
            Storage.deleteTask(project.getName(), task)
            UI.loadSidemenu();
        } )
        taskCard.appendChild(deleteBtn);

        return taskCard;
    }

    static createTaskForm() { 
        const taskForm = document.querySelector('.popupform.task');
        taskForm.style.display = 'flex';

        const todoList = Storage.getTodoList();
        const projects = todoList.getProjects();
        const projectSelect = document.querySelector('#projectSelect')
        while (projectSelect.firstChild) {
            projectSelect.removeChild(projectSelect.firstChild);
        }
        projects.forEach(project => {
            const option = document.createElement('option');
            option.value = project.getName();
            option.textContent = project.getName();
            projectSelect.appendChild(option);
        });

        const submitBtn = document.querySelector('#taskForm .submit');
        taskForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const title = document.getElementById('title').value;
            const date = document.getElementById('date').value;
            const priority = document.getElementById('priority').value;
            const projectName = document.getElementById('projectSelect').value;

            const newTask = new Task(title, desc, date, priority);
            const project = todoList.getProject(projectName);
            Storage.addTask(projectName, newTask);            
            UI.loadSidemenu();
            taskForm.style.display = 'none';


        }, { once: true });

        const cancelBtn = document.querySelector('#taskForm .cancel');
        cancelBtn.addEventListener('click', function() {
            taskForm.style.display = 'none';
        }, { once: true });
    }

    static createProjectForm() {
        const projectForm = document.querySelector('.popupform.project');
        projectForm.style.display = 'flex';

        const submitBtn = document.querySelector('#projectForm .submit');
        projectForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const name = document.getElementById('name').value;

            const newProject = new Project(name);
            Storage.addProject(newProject);            
            UI.loadSidemenu();
            projectForm.style.display = 'none';

        }, { once: true });

        const cancelBtn = document.querySelector('#projectForm .cancel');
        cancelBtn.addEventListener('click', function() {
            projectForm.style.display = 'none';
        }, { once: true });
    }


}