<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import "./datePicker.css";
    import { DateInput } from "date-picker-svelte";
    const dispatch = createEventDispatcher();
    export let dueDate:Date|null=null;
    let selectedDate = new Date();

    if(dueDate) {
        selectedDate =new Date(dueDate);
    }

    function selectDueDate(event:CustomEvent) {
        selectedDate= event.detail;
        let dateString= event.detail.toISOString().split('T')[0];

        dispatch("datePicked", dateString);
    }
</script>

<DateInput
    on:select={selectDueDate}
    placeholder="Due Date"
    closeOnSelection={true}
    value={selectedDate}
    id="datePicker"
    format="yyyy-MM-dd"
    class="input input-bordered w-full max-w-xs"
/>
