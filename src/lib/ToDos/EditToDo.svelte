<script lang="ts">
  import { onMount } from "svelte";
  import { createEventDispatcher } from "svelte";
  import Modal from "../UI/Modal.svelte";
  import todoStore from "./todo-store";
  import DatePicker from "../UI/DatePicker.svelte";
  import type { Task, ToDo } from "./ToDoType";

  export let id: null | string = null;
  export let editMode: null | string;

  let tasks: Task[] = [{ value: "", isDone: false, dateModified: null }];

  let projectName = "";
  let description = "";
  let dueDate: Date | null;

  if (id) {
    const unsubscribe = todoStore.subscribe((items: ToDo[]) => {
      const selectedTodo = items.find((i) => i.id === id);
      if (selectedTodo) {
        projectName = selectedTodo.projectName;
        dueDate = selectedTodo.dueDate;
        description = selectedTodo.description;
        tasks = selectedTodo.tasks;
      }
    });

    unsubscribe();
  }

  const dispatch = createEventDispatcher();

  function cancel() {
    dispatch("cancel");
  }

  function submitForm() {
    const todoData = {
      projectName,
      dueDate,
      tasks,
      description,
    };

    if (id) {
      fetch(`${import.meta.env.VITE_API_URL}/${id}.json`, {
        method: "PATCH",
        body: JSON.stringify(todoData),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("An error occurred, please try again!");
          }

          todoStore.updateTodo(id, todoData);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      fetch(`${import.meta.env.VITE_API_URL}.json`, {
        method: "post",
        body: JSON.stringify({ ...todoData }),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("An error occurred, please try again!");
          }
          return res.json();
        })
        .then((data) => {
          todoStore.addToDo({
            ...todoData,
            id: data.name,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
    dispatch("save");
  }

  function deleteTodo() {
    if (!id) {
      return;
    }
    fetch(`${import.meta.env.VITE_API_URL}/${id}.json`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("An error occurred, please try again!");
        }
        todoStore.removeTodo(id);
      })
      .catch((err) => console.log(err));
    dispatch("save");
  }

  function addTask() {
    tasks = [...tasks, { value: "", isDone: false, dateModified: null }];
  }

  onMount(() => {
    const lastInput = document.getElementById(`input-${tasks.length - 1}`);
    if (lastInput) {
      lastInput.focus();
    }
  });

  function datePicked(event: CustomEvent) {
    dueDate = event.detail;
  }

  function taskDone(id: number) {
    tasks[id].isDone = true;
    tasks[id].dateModified = new Date()
      .toISOString()
      .split("T")[0] as unknown as Date;
  }

  function taskDelete(id: number) {
    tasks = tasks.filter((task, index) => index !== id);
  }

  function editTask(event: InputEvent, id: number) {
    tasks[id].value = event.target.value;
    tasks[id].dateModified = new Date().toISOString().split("T")[0];
  }
</script>

<Modal title="Add To Do" on:cancel {editMode}>
  <input
    type="text"
    placeholder="Project name"
    class="input input-bordered w-full max-w-xs"
    value={projectName}
    on:input={(event) => (projectName = event.target.value)}
  />
  <div class="divider"></div>
  <textarea
    class="textarea textarea-bordered w-full max-w-xs"
    placeholder="description"
    on:input={(event) => (description = event.target.value)}
    value={description}
  />
  <div class="divider"></div>
  <DatePicker on:datePicked={datePicked} {dueDate} />
  <div class="divider"></div>

  {#each tasks as task, index (index)}
    {#if !task.isDone}
      <div class="col-span-3">
        <div class="grid grid-cols-5 gap-2">
          <input
            type="text"
            placeholder="input your to do"
            class="input input-bordered col-span-3 w-full max-w-xs px-4 py-2"
            value={task.value}
            id={`input-${index}`}
            on:input={(event) => editTask(event, index)}
          />
          <!-- on:input={(event) => (tasks[index].value = event.target.value)} -->

          <button
            class="btn btn-circle btn-success col-span-1 w-1/2 px-4 py-2"
            on:click={() => taskDone(index)}>Done</button
          >

          <button
            class="btn btn-circle btn-error col-span-1 w-1/2 px-4 py-2"
            on:click={() => taskDelete(index)}>Delete</button
          >
        </div>
      </div>
      <div class="divider"></div>
    {/if}
  {/each}
  <button class="btn btn-info" on:click={addTask}>Add task</button>
  <div class="divider"></div>

  {#each tasks as task, index (index)}
    {#if task.isDone}
      <div class="grid-12 columns-2">
        <p>{task.value}</p>
      </div>
    {/if}
  {/each}
 
  {#if id}
  <div class="divider"></div>
    <button class="btn btn-success" on:click={submitForm}>Update</button>
    <button class="btn btn-error" on:click={deleteTodo}>Delete</button>
  {:else}
    <button class="btn btn-success" on:click={submitForm}>Save</button>
  {/if}
  <button class="btn btn-outline" on:click={cancel}>Close</button>
</Modal>
