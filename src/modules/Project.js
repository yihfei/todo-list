export class Project {
    constructor(name, description = '') {
        this.id = Date.now().toString();
        this.name = name;
        this.description = description;
        this.todos = []; 
    }

    addTodo(todo) {
        this.todos.push(todo);
    }

    removeTodo(todoId) {
        this.todos = this.todos.filter(todo => todo.id !== todoId);
    }
}