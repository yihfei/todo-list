export default class TodoList {
    constructor() {
        this.projects = [];
    }

    addProject(project) {
        this.projects.push(project);
    }

    deleteProject(projectName) {
        let index = -1;
        for (let i = 0; i < this.projects.length; i++) {
            if (this.projects[i].getName() == projectName) {
                index = i;
                break;
            }
        }
        if (index >= 0) {
            this.projects.splice(index, 1);
        }
    }

    getProjects() {
        return this.projects;
    }

    setProjects(projects) {
        this.projects = projects;
    }

    getProject(projectName) {
        return this.projects.find(project => project.getName() == projectName )
    }
}