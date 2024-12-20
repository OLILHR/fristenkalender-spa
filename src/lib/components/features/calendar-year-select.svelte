<script lang="ts">
  export let selectedYear: number = new Date().getFullYear();

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i);
</script>

<div>
  <label for="year-select">Jahr:</label>
  <select id="year-select" bind:value={selectedYear}>
    {#each years as year}
      <option value={year}>{year}</option>
    {/each}
  </select>
</div>
