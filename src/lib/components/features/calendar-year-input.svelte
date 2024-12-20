<script lang="ts">
  export let selectedYear: number = new Date().getFullYear();
</script>

<div>
  <label for="year-input">Jahr:</label>
  <input id="year-input" type="number" bind:value={selectedYear} step="1" />
</div>
