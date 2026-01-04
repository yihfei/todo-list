import { Todo, Priority } from './modules/Todo';
import { Project } from './modules/Project';
import { format } from 'date-fns';

// --- 1. DOM ELEMENTS ---

// Display Areas
const projectListUI = document.getElementById('project-list');
const todoContainer = document.getElementById('todo-container');
const activeProjectNameUI = document.getElementById('active-project-name');
const activeProjectDescUI = document.getElementById('active-project-desc');

// Task Modal Elements
const addTaskBtn = document.getElementById('add-task-btn');
const todoModal = document.getElementById('todo-modal');
const todoForm = document.getElementById('todo-form');
const closeModalBtn = document.getElementById('close-modal');

// Project Modal Elements
const addProjectBtn = document.getElementById('add-project-btn');
const projectModal = document.getElementById('project-modal');
const projectForm = document.getElementById('project-form');
const closeProjectModalBtn = document.getElementById('close-project-modal');

// --- 2. APP STATE ---

let projects = [];
const defaultProject = new Project('Inbox', 'Your default task list');
projects.push(defaultProject);

let activeProject = defaultProject;

// --- 3. RENDER FUNCTIONS ---

// Update the Sidebar
const renderProjects = () => {
    projectListUI.innerHTML = '';
    
    projects.forEach((project) => {
        const li = document.createElement('li');
        li.textContent = project.name;
        if (project === activeProject) li.classList.add('active');
        
        li.addEventListener('click', () => {
            activeProject = project;
            activeProjectNameUI.textContent = project.name;
            activeProjectDescUI.textContent = project.description;
            renderProjects();
            renderTodos();
        });
        
        projectListUI.appendChild(li);
    });
};

const renderTodos = () => {
    todoContainer.innerHTML = '';

    activeProject.todos.forEach((todo) => {
        // 1. Create the Card
        const todoCard = document.createElement('div');
        todoCard.className = `todo-card ${todo.isCompleted ? 'completed' : ''}`;

        // 2. Create the Main Section
        const todoMain = document.createElement('div');
        todoMain.className = 'todo-main';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.isCompleted;
        checkbox.addEventListener('change', () => {
            todo.toggleComplete();
            renderTodos();
        });

        const todoText = document.createElement('div');
        todoText.className = 'todo-text';

        const h3 = document.createElement('h3');
        h3.textContent = todo.title; // SAFE: User input cannot execute

        const p = document.createElement('p');
        p.textContent = todo.description; // SAFE

        // Assemble Text and Main
        todoText.append(h3, p);
        todoMain.append(checkbox, todoText);

        // 3. Create the Footer
        const todoFooter = document.createElement('div');
        todoFooter.className = 'todo-footer';

        const dueDateSpan = document.createElement('span');
        dueDateSpan.textContent = `Due: ${todo.dueDate ? format(new Date(todo.dueDate), 'MMM do, yyyy') : 'No date'}`;

        const prioritySpan = document.createElement('span');
        prioritySpan.className = `priority-badge ${todo.priority.toLowerCase()}`;
        prioritySpan.textContent = todo.priority;

        todoFooter.append(dueDateSpan, prioritySpan);

        // 4. Final Assembly
        todoCard.append(todoMain, todoFooter);
        todoContainer.appendChild(todoCard);
    });
};

// --- 4. EVENT LISTENERS ---

// Task Modal Listeners
addTaskBtn.addEventListener('click', () => todoModal.classList.remove('hidden'));
closeModalBtn.addEventListener('click', () => todoModal.classList.add('hidden'));

todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('title-input').value;
    const desc = document.getElementById('desc-input').value;
    const date = document.getElementById('date-input').value;
    const priority = document.getElementById('priority-input').value;

    const newTodo = new Todo(title, desc, date, priority);
    activeProject.addTodo(newTodo);

    renderTodos();
    todoForm.reset();
    todoModal.classList.add('hidden');
});

// Project Modal Listeners
addProjectBtn.addEventListener('click', () => projectModal.classList.remove('hidden'));
closeProjectModalBtn.addEventListener('click', () => projectModal.classList.add('hidden'));

projectForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('project-name-input').value;
    const desc = document.getElementById('project-desc-input').value;
    
    const newProject = new Project(name, desc);
    projects.push(newProject);
    
    renderProjects();
    projectForm.reset();
    projectModal.classList.add('hidden');
});

// --- 5. INITIALIZE APP ---

renderProjects();
renderTodos();