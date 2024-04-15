<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { fly, fade } from "svelte/transition";

  export let title: string;
  export let editMode: null | string;

  const dispatch = createEventDispatcher();

  function closeModal() {
    dispatch("cancel");
  }
</script>

<dialog
  id="my_modal_5"
  class="modal modal-bottom sm:modal-middle"
  class:modal-open={editMode}
>
  <div class="modal-box" transition:fly={{ y: 300 }}>
    <h1 class="font-bold text-lg">{title}</h1>
    <slot />
    <!-- <div class="modal-action">
      <form method="dialog">
        <button class="btn" on:click={closeModal}>Close</button>
      </form>
    </div> -->
  </div>
</dialog>
