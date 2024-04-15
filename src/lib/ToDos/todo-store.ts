import { writable} from 'svelte/store'
import type { ToDo } from './ToDoType';
const todos = writable([]);

const customTodosStore ={
    subscribe: todos.subscribe,
    addToDo: (todoData: ToDo) => {
        const newTodo = {
            ...todoData
        }
        todos.update((items: ToDo[]) => {
            return [newTodo, ...items];
        })
    },
    setTodos: (todoArray: ToDo[]) => {
        todos.set(todoArray)
    },
    updateTodo: (id:string, todoData: ToDo) => {
        todos.update((items: ToDo[]) => {
          const todoIndex = items.findIndex(i => i.id === id);
          const updatedTodo = { ...items[todoIndex], ...todoData };
          const updatedTodos = [...items];
          updatedTodos[todoIndex] = updatedTodo;
          return updatedTodos;
        });
      },
      removeTodo: (id:string) => {
        todos.update(items => {
          return items.filter((i: ToDo) => i.id !== id);
        });
      },
}

export default customTodosStore;