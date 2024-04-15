<script lang="ts">
    import { onDestroy, createEventDispatcher } from "svelte";
    import TodoStore from "./todo-store";
    import type { ToDo } from "./ToDoType";
    export let todoId:string;
    let selectedTodo:ToDo;

    const unsubscribe = TodoStore.subscribe((items:ToDo[]) => {
        const data  = items.find((i) => i.id === todoId);
        if(data) {
            selectedTodo = data;
        }
    });

    const dispatch = createEventDispatcher();

    onDestroy(() => {
        unsubscribe();
    });
</script>

<div class="max-w-2xl mx-auto py-8 px-4">
    <div class="mb-8">
        <h1 class="text-3xl font-bold mb-2">{selectedTodo.projectName}</h1>
        <p class="text-gray-700">{selectedTodo.description}</p>
        <p class="text-gray-500 text-sm">{selectedTodo.dueDate}</p>
    </div>
    <!-- Task Item -->

    <div class="flex items-center">
        <ul class="steps steps-vertical">
            {#each selectedTodo.tasks as task, index}
                <li
                    data-content={task.isDone ? "✓" : ""}
                    class="step {task.isDone ? 'step-primary' : 'step-neutral'}"
                >
                    {task.value}
                </li>
            {/each}
        </ul>
    </div>

    <footer>
        <button
            class="btn btn-warning"
            on:click={() => dispatch("edit", todoId)}>Edit</button
        >
        <button class="btn btn-info" on:click={() => dispatch("close")}
            >Close</button
        >
    </footer>
</div>
