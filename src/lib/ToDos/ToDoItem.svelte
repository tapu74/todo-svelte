<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import todoStore from "../ToDos/todo-store";

    export let id: string;
    export let projectName: string;
    export let description: string;
    export let dueDate: Date|null;
    // export let tasks: [];

    let isLoading = false;

    const dispatch = createEventDispatcher();
</script>

<div class="card card-compact w-96 bg-base-100 shadow-xl">
    <div class="card-body">
        <h2 class="card-title">
            {projectName}
        </h2>

        <p>{description}</p>
        <div class="card-actions justify-left">
            <div class="badge badge-accent">{dueDate}</div>
        </div>
        <div class="card-actions justify-left">
            <button
                class="btn btn-warning"
                on:click={() => dispatch("edit", id)}>Edit</button
            >

            <button
                class="btn btn-info"
                on:click={() => dispatch("details", id)}>View</button
            >
        </div>
    </div>
</div>
