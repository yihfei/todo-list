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
            .forEach(task => this.loadTask(project, task));
    }

    static loadTask(project, task) {
        // add task card into content
        const content = document.querySelector('.content');
        const taskCard = this.createTaskCard(project, task);
        content.appendChild(taskCard);
    }

    static loadSidemenu() {
        const projects = Storage
    }

    static createTaskCard(project, task) {
        const title = task.getTitle();
        const desc = task.getDescription();
        const date = task.getDate();
        const priority = task.getPriority();

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

        const deleteBtn = document.createElement('button');
        deleteBtn.addEventListener('click', () => {
            taskCard.innerText = '';
            Storage.deleteTask(project.getName(), task)
        } )
        taskCard.appendChild(deleteBtn);
        console.log(project);

        return taskCard;
    }

    static createTaskForm() { 
        const content = document.querySelector('.content');
        // create a form
        const popupForm = document.createElement('div');
        popupForm.class ='popupForm';

        const formTitle = document.createElement('h3');
        formTitle.textContent = 'Add a new Task';
        popupForm.appendChild(formTitle);

        const form = document.createElement('form');
        form.id = 'taskForm';

        const fields = [
            { label: 'Title', type: 'text', id: 'title' },
            { label: 'Description', type: 'text', id: 'desc' },
            { label: 'Date', type: 'date', id: 'date' },
            { label: 'Priority', type: 'text', id: 'priority' }
        ];

        fields.forEach(field => {
            const label = document.createElement('label');
            label.setAttribute('for', field.id);
            label.textContent = field.label;
            form.appendChild(label);
            console.log(label);
            const input = document.createElement('input');
            input.type = field.type;
            input.id = field.id;
            input.name = field.id;
            input.required = true;
            form.appendChild(input);
            form.appendChild(document.createElement('br'));
        });

        const projectLabel = document.createElement('label');
        projectLabel.setAttribute('for', 'project');
        projectLabel.textContent = 'Project:';
        form.appendChild(projectLabel);

        const projectSelect = document.createElement('select');
        projectSelect.id = 'project';
        projectSelect.name = 'project';

        const todoList = Storage.getTodoList();
        const projects = todoList.getProjects();
        projects.forEach(project => {
            const option = document.createElement('option');
            option.value = project.getName();
            option.textContent = project.getName();
            projectSelect.appendChild(option);
        });

        form.appendChild(projectSelect);

        const submitButton = document.createElement('button');
        submitButton.type = 'submit';
        submitButton.textContent = 'Add Task';
        form.appendChild(submitButton);

        const cancelButton = document.createElement('button');
        cancelButton.type = 'button';
        cancelButton.textContent = 'Cancel';
        cancelButton.addEventListener('click', function() {
        document.querySelector('.popupForm').style.display = 'none';
        });
        form.appendChild(cancelButton);
        
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            const title = document.getElementById('title').value;
            const desc = document.getElementById('desc').value;
            const date = document.getElementById('date').value;
            const priority = document.getElementById('priority').value;
            const projectName = document.getElementById('project').value;

            const newTask = new Task(title, desc, date, priority);
            Storage.addTask(projectName, newTask);            
            //placeholder
            UI.loadTask(project, newTask);
        });
        popupForm.appendChild(form);
        content.appendChild(popupForm);

    }

    static createProjectForm() {
        const content = document.querySelector('.content');

        const popupForm = document.createElement('div');
        popupForm.class ='popupForm';

        const formTitle = document.createElement('h3');
        formTitle.textContent = 'Add a new project';
        popupForm.appendChild(formTitle);

        const form = document.createElement('form');
        form.id = 'taskForm';

        const fields = [
            { label: 'Name', type: 'text', id: 'name' },
        ];

        fields.forEach(field => {
            const label = document.createElement('label');
            label.setAttribute('for', field.id);
            label.textContent = field.label;
            form.appendChild(label);
            console.log(label);
            const input = document.createElement('input');
            input.type = field.type;
            input.id = field.id;
            input.name = field.id;
            input.required = true;
            form.appendChild(input);
            form.appendChild(document.createElement('br'));
        });

        const submitButton = document.createElement('button');
        submitButton.type = 'submit';
        submitButton.textContent = 'Add Project';
        form.appendChild(submitButton);

        const cancelButton = document.createElement('button');
        cancelButton.type = 'button';
        cancelButton.textContent = 'Cancel';
        cancelButton.addEventListener('click', function() {
        document.querySelector('.popupForm').style.display = 'none';
        });
        form.appendChild(cancelButton);
        
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            const name = document.getElementById('name').value;

            const newProject = new Project(name)
            Storage.addProject(newProject);            
            //placeholder
            UI.loadProject(newProject);
        });
        popupForm.appendChild(form);
        content.appendChild(popupForm);
    }

    
    

    

}