import { Project } from "./Project";
import { Todo } from "./Todo";

const STORAGE_KEY = "todo-list:v1";
const SCHEMA_VERSION = 1;

function safeParse(json) {
  try {
    return JSON.parse(json);
  } catch (e) {
    console.warn("Storage: failed to parse JSON", e);
    return null;
  }
}

function serializeProjects(projects) {
  return projects.map((p) => ({
    id: p.id,
    name: p.name,
    todos: (p.todos || []).map((t) => ({
      id: t.id,
      title: t.title,
      dueDate: t.dueDate,
      priority: t.priority,
      isCompleted: !!t.isCompleted,
    })),
  }));
}

function reviveProjects(rawProjects) {
  if (!Array.isArray(rawProjects)) return [];
  return rawProjects.map((p) => {
    const proj = new Project(p.name || "");
    // Restore id if present
    if (p.id) proj.id = p.id;
    proj.todos = (p.todos || []).map((t) => {
      const todo = new Todo(
        t.title || "",
        t.dueDate || "",
        t.priority || undefined
      );
      if (t.id) todo.id = t.id;
      todo.isCompleted = !!t.isCompleted;
      return todo;
    });
    return proj;
  });
}

const Storage = {
  save(projects, activeProjectId) {
    try {
      const payload = {
        version: SCHEMA_VERSION,
        projects: serializeProjects(projects || []),
        activeProjectId: activeProjectId || null,
        savedAt: Date.now(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (e) {
      console.warn("Storage: failed to save", e);
    }
  },

  load() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = safeParse(raw);
    if (!parsed || parsed.version !== SCHEMA_VERSION) return null;
    const projects = reviveProjects(parsed.projects || []);
    const activeProjectId = parsed.activeProjectId || null;
    return { projects, activeProjectId };
  },

  clear() {
    localStorage.removeItem(STORAGE_KEY);
  },
};

export default Storage;
