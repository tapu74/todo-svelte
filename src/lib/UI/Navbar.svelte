
<script lang="ts">
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
</script>
<div class="navbar bg-base-100">
  <div class="flex-1">
    <button class="btn btn-ghost text-xl">Todo App</button>
  </div>
  <div class="flex-none gap-2">
    <div class="form-control">
      <button class="btn btn-primary" on:click={()=> dispatch('add')}>Add </button>
    </div>
  </div>
</div>