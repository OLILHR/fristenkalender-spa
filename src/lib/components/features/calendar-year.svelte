<script lang="ts">
  import { onMount } from "svelte";

  export let selectedYear: number = new Date().getFullYear();

  const minYear = new Date().getFullYear() - 10;
  const maxYear = 2099;

  function handleYearChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const newYear = parseInt(target.value);
    if (newYear >= minYear && newYear <= maxYear) {
      selectedYear = newYear;
    }
  }

  onMount(() => {
    selectedYear = selectedYear || new Date().getFullYear();
  });
</script>

<div>
  <label for="year-input">Jahr:</label>
  <input
    id="year-input"
    type="number"
    bind:value={selectedYear}
    min={minYear}
    max={maxYear}
    on:input={handleYearChange}
    step="1"
  />
</div>
