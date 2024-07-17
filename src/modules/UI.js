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

    static startForm() {
        // make all forms none first
        const forms = document.querySelectorAll('.popupform');
        forms.forEach(form => {
            console.log(form);
            form.classList.remove('show');
        })
        // disable the rest of the screen
        const overlay = document.querySelector('.overlay');
        overlay.classList.add('show');
    }

    static endForm() {
        const forms = document.querySelectorAll('.popupform');
        forms.forEach(form => {
            console.log(form);
            form.classList.remove('show');
        });
        const overlay = document.querySelector('.overlay');
        overlay.classList.remove('show');
    }

    static loadSidemenu() {
        UI.clearSidemenu();
        const sidemenu = document.querySelector('.sidemenu');

        const taskBtn = document.createElement('button');
        const projectBtn = document.createElement('button');
        taskBtn.textContent = '+';
        projectBtn.textContent = '+';
        taskBtn.classList.add('add-task-btn');
        projectBtn.classList.add('add-project-btn')

        taskBtn.addEventListener('click', UI.createTaskForm);
        projectBtn.addEventListener('click', UI.createProjectForm);

        sidemenu.appendChild(taskBtn);

        const projectContainer = document.createElement('div');
        const header = document.createElement('h3');
        header.textContent = 'projects'
        projectContainer.classList.add('project-container');
        projectContainer.append(header);
        projectContainer.append(projectBtn);
        sidemenu.append(projectContainer);

        const projects = Storage.getTodoList().getProjects();

        projects.forEach(project => {
            const projectName = project.getName();
            const projectBtn = document.createElement('button');
            projectBtn.textContent = projectName;

            projectBtn.addEventListener('click', () => {
                UI.selectProject(project)
            })
            sidemenu.appendChild(projectBtn);
        })
    }

    static selectProject(project) {
        UI.clearContent();
        const content = document.querySelector('.content');
        
        const projectName = project.getName();
        const projectTitle = document.createElement('h2');
        projectTitle.textContent = projectName;

        const deleteBtn = document.createElement('button');
        deleteBtn.addEventListener('click', () => {
            UI.clearContent();
            Storage.deleteProject(project);
            UI.loadSidemenu();
        });
        deleteBtn.textContent = 'delete project';

        const headerContainer = document.createElement('div');
        headerContainer.classList.add('project-header');
        headerContainer.appendChild(projectTitle);
        headerContainer.appendChild(deleteBtn);

        content.appendChild(headerContainer);

        const updatedProject = Storage.getTodoList().getProject(projectName);
        UI.loadProject(updatedProject);

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
        UI.startForm();

        const taskForm = document.querySelector('.popupform.task');
        taskForm.classList.add('show');

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

            document.getElementById('title').value = '';
            document.getElementById('date').value = '';
            document.getElementById('priority').value = '';
            document.getElementById('projectSelect').value= '';

            const newTask = new Task(title, date, priority);
            const project = todoList.getProject(projectName);
            Storage.addTask(projectName, newTask);            
            UI.loadSidemenu();
            UI.endForm();
            UI.selectProject(project);



        }, { once: true });

        const cancelBtn = document.querySelector('#taskForm .cancel');
        cancelBtn.addEventListener('click', function() {
            UI.endForm();
        }, { once: true });
    }

    static createProjectForm() {
        UI.startForm();

        const projectForm = document.querySelector('.popupform.project');
        projectForm.classList.add('show');

        const submitBtn = document.querySelector('#projectForm .submit');
        projectForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const name = document.getElementById('name').value;
            document.getElementById('name').value = '';

            const newProject = new Project(name);
            Storage.addProject(newProject);            
            UI.loadSidemenu();
            UI.endForm();

        }, { once: true });

        const cancelBtn = document.querySelector('#projectForm .cancel');
        cancelBtn.addEventListener('click', function() {
            UI.endForm();
        }, { once: true });
    }


}