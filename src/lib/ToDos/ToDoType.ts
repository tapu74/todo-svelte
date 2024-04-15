export interface Task {
    value: string;
    isDone:boolean;
    dateModified: Date|null;
}

export interface ToDo {
    id: string;
    projectName: string;
    description: string;
    dueDate: Date|null;
    tasks: Task[];
}