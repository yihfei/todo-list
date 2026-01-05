import { Todo, Priority } from "./modules/Todo";
import { Project } from "./modules/Project";
import Storage from "./modules/Storage";
import { format } from "date-fns";

let editingTodo = null;

// Display Areas
const projectListUI = document.getElementById("project-list");
const todoContainer = document.getElementById("todo-container");
const activeProjectNameUI = document.getElementById("active-project-name");

// Task Modal Elements
const addTaskBtn = document.getElementById("add-task-btn");
const todoModal = document.getElementById("todo-modal");
const todoForm = document.getElementById("todo-form");
const closeModalBtn = document.getElementById("close-modal");

// Project Modal Elements
const addProjectBtn = document.getElementById("add-project-btn");
const projectModal = document.getElementById("project-modal");
const projectForm = document.getElementById("project-form");
const closeProjectModalBtn = document.getElementById("close-project-modal");

// --- 2. APP STATE ---

// APP STATE: try to load from storage first
let projects = [];
let activeProject = null;
const saved = Storage.load();
if (saved && Array.isArray(saved.projects) && saved.projects.length) {
  projects = saved.projects;
  activeProject =
    projects.find((p) => p.id === saved.activeProjectId) || projects[0];
} else {
  const defaultProject = new Project("Inbox");
  projects.push(defaultProject);
  activeProject = defaultProject;
  // persist initial state
  Storage.save(projects, activeProject.id);
}

// --- 3. RENDER FUNCTIONS ---

// Update the Sidebar
const renderProjects = () => {
  activeProjectNameUI.textContent = activeProject.name;
  projectListUI.innerHTML = "";

  projects.forEach((project) => {
    const li = document.createElement("li");
    li.textContent = project.name;
    if (project === activeProject) li.classList.add("active");

    li.addEventListener("click", () => {
      activeProject = project;
      activeProjectNameUI.textContent = project.name;
      renderProjects();
      renderTodos();
      Storage.save(projects, activeProject.id);
    });

    projectListUI.appendChild(li);
  });
};

const openEditModal = (todo) => {
  editingTodo = todo;
  console.log("Editing Todo:", todo);
  document.getElementById("title-input").value = todo.title;
  document.getElementById("date-input").value = todo.dueDate;
  document.getElementById("priority-input").value = todo.priority;

  // Change UI text to indicate editing
  document.getElementById("modal-title").textContent = "Edit Task";
  todoModal.classList.remove("hidden");
};

const renderTodos = () => {
  console.log("Rendering Todos for Project:", activeProject.name);
  todoContainer.innerHTML = "";

  activeProject.todos.forEach((todo) => {
    // 1. Create the Card
    const todoCard = document.createElement("div");
    todoCard.className = `todo-card ${todo.isCompleted ? "completed" : ""}`;

    // 2. Create the Main Section
    const todoMain = document.createElement("div");
    todoMain.className = "todo-main";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.isCompleted;
    checkbox.addEventListener("change", () => {
      todo.toggleComplete();
      renderTodos();
      Storage.save(projects, activeProject.id);
    });

    const todoText = document.createElement("div");
    todoText.className = "todo-text";

    const h3 = document.createElement("h3");
    h3.textContent = todo.title; // SAFE: User input cannot execute

    // Assemble Text and Main (no description)
    todoText.append(h3);
    todoMain.append(checkbox, todoText);

    // 3. Create the Footer
    const todoFooter = document.createElement("div");
    todoFooter.className = "todo-footer";

    const dueDateSpan = document.createElement("span");
    dueDateSpan.textContent = `Due: ${
      todo.dueDate ? format(new Date(todo.dueDate), "MMM do, yyyy") : "No date"
    }`;

    const prioritySpan = document.createElement("span");
    prioritySpan.className = `priority-badge ${todo.priority.toLowerCase()}`;
    prioritySpan.textContent = todo.priority;

    // Icon buttons for edit and delete (accessible)
    const editBtn = document.createElement("button");
    editBtn.className = "icon-btn edit-btn";
    editBtn.setAttribute("aria-label", "Edit task");
    editBtn.title = "Edit";
    editBtn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z" />
                <path d="M20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
            </svg>
        `;
    editBtn.addEventListener("click", () => openEditModal(todo));

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "icon-btn delete-btn";
    deleteBtn.setAttribute("aria-label", "Delete task");
    deleteBtn.title = "Delete";
    deleteBtn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                <line x1="10" y1="11" x2="10" y2="17" />
                <line x1="14" y1="11" x2="14" y2="17" />
            </svg>
        `;
    deleteBtn.addEventListener("click", () => {
      activeProject.removeTodo(todo.id);
      renderTodos();
      Storage.save(projects, activeProject.id);
    });

    todoFooter.append(dueDateSpan, prioritySpan, editBtn, deleteBtn);

    todoCard.append(todoMain, todoFooter);
    todoContainer.appendChild(todoCard);
  });
};

// --- Project remove button (placed in the main header) ---
// Create once and append to the main header area if present
const mainHeader = document.querySelector(".main-header");
let removeProjectBtn = null;
if (mainHeader) {
  removeProjectBtn = document.createElement("button");
  removeProjectBtn.className = "icon-btn delete-btn";
  removeProjectBtn.setAttribute("aria-label", "Delete project");
  removeProjectBtn.title = "Delete project";
  removeProjectBtn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
            <line x1="10" y1="11" x2="10" y2="17" />
            <line x1="14" y1="11" x2="14" y2="17" />
        </svg>
    `;

  removeProjectBtn.addEventListener("click", () => {
    if (projects.length <= 1) {
      // Don't allow removing the last project
      alert("You must keep at least one project.");
      return;
    }

    const confirmed = confirm(
      `Delete project "${activeProject.name}" and all its todos? This cannot be undone.`
    );
    if (!confirmed) return;

    // Remove active project from list
    projects = projects.filter((p) => p.id !== activeProject.id);

    // Choose a new active project (first in list)
    activeProject = projects[0];

    // Update UI
    renderProjects();
    renderTodos();
    if (activeProjectNameUI)
      activeProjectNameUI.textContent = activeProject.name;

    // Persist change
    Storage.save(projects, activeProject.id);
  });

  // Append the button to the header (it will appear on the right due to flex: space-between)
  mainHeader.appendChild(removeProjectBtn);
}

// --- 4. EVENT LISTENERS ---
addTaskBtn.addEventListener("click", () =>
  todoModal.classList.remove("hidden")
);
closeModalBtn.addEventListener("click", () =>
  todoModal.classList.add("hidden")
);

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("title-input").value;
  const date = document.getElementById("date-input").value;
  const priority = document.getElementById("priority-input").value;

  if (editingTodo) {
    // CASE A: Update existing Todo
    editingTodo.title = title;
    editingTodo.dueDate = date;
    editingTodo.priority = priority;
    editingTodo = null; // Reset
  } else {
    // CASE B: Create new Todo (Your existing logic)
    const newTodo = new Todo(title, date, priority);
    activeProject.addTodo(newTodo);
  }

  renderTodos();
  todoForm.reset();
  todoModal.classList.add("hidden");
  Storage.save(projects, activeProject.id);
});

// Project Modal Listeners
addProjectBtn.addEventListener("click", () =>
  projectModal.classList.remove("hidden")
);
closeProjectModalBtn.addEventListener("click", () =>
  projectModal.classList.add("hidden")
);

projectForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("project-name-input").value;
  const newProject = new Project(name);
  projects.push(newProject);

  renderProjects();
  projectForm.reset();
  projectModal.classList.add("hidden");
  Storage.save(projects, activeProject.id);
});

// --- 5. INITIALIZE APP ---

renderProjects();
renderTodos();

// Ensure UI matches loaded state
if (activeProject && activeProjectNameUI)
  activeProjectNameUI.textContent = activeProject.name;
