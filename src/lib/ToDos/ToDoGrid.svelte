<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { scale } from "svelte/transition";
    import { flip } from "svelte/animate";
    import TodoItem from "./ToDoItem.svelte";
    import type { ToDo } from "./ToDoType";

    export let todos:ToDo[];

    const dispatch = createEventDispatcher();
</script>

<div class="container mx-auto">
    <div class="grid grid-cols-2 gap-4">
        {#each todos as todo (todo.projectName)}
            <div transition:scale animate:flip={{ duration: 300 }}>
                <TodoItem
                    id={todo.id}
                    projectName={todo.projectName}
                    description={todo.description}
                    dueDate={todo.dueDate}
                    on:edit
                    on:details
                />
                <!-- <div class="divider"></div> -->
            </div>
        {/each}
    </div>
</div>
