<script lang="ts">
  import EditToDo from "./lib/ToDos/EditToDo.svelte";
  import Navbar from "./lib/UI/Navbar.svelte";
  import todoStore from "./lib/ToDos/todo-store";
  import ToDoGrid from "./lib/ToDos/ToDoGrid.svelte";
  import ToDoDetailsView from "./lib/ToDos/ToDoDetailsView.svelte";
    import type { ToDo } from "./lib/ToDos/ToDoType";
  let editMode: "add" | "edit" | "details" | null = null;
  let selectedId: string | null;
  let isLoading = true;
  let error;
  function cancelEdit() {
    editMode = null;
    selectedId = null;
  }

  function savedTodo(event: CustomEvent) {
    editMode = null;
    selectedId = null;
  }
  function onAdd() {
    editMode = "add";
  }

  function startEdit(event: CustomEvent) {
    editMode = "edit";
    selectedId = event.detail;
  }

  function showDetails(event: CustomEvent) {
    editMode = "details";
    selectedId = event.detail;
  }

  fetch(
    `${import.meta.env.VITE_API_URL}.json`,
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error("Fetching meetups failed, please try again later!");
      }
      return res.json();
    })
    .then((data) => {
      const loadedTodos:ToDo[] = [];
      for (const key in data) {
        loadedTodos.push({
          ...data[key],
          id: key,
        });
      }
      setTimeout(() => {
        isLoading = false;
        todoStore.setTodos(loadedTodos.reverse());
      }, 1000);
    })
    .catch((err) => {
      error = err;
      isLoading = false;
      console.log(err);
    });
</script>

<main>
  <Navbar on:add={onAdd} />
  {#if editMode === "add" || editMode === "edit"}
    <EditToDo
      id={selectedId}
      on:save={savedTodo}
      on:cancel={cancelEdit}
      {editMode}
    />
  {/if}
  {#if editMode === "details" && selectedId}
    <ToDoDetailsView todoId={selectedId} on:close={cancelEdit} on:edit={startEdit} />
  {:else}
    {#if isLoading}
      <div class="flex justify-center">
        <span class="loading loading-dots loading-lg"></span>
      </div>
    {/if}
    <ToDoGrid todos={$todoStore} on:edit={startEdit} on:details={showDetails} />
  {/if}
</main>
