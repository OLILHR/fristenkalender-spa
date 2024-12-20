<script lang="ts">
  export let selectedMonth: string = (new Date().getMonth() + 1)
    .toString()
    .padStart(2, "0");

  const months = [
    { value: "00", label: "Dezember -1" },
    { value: "01", label: "Januar" },
    { value: "02", label: "Februar" },
    { value: "03", label: "März" },
    { value: "04", label: "April" },
    { value: "05", label: "Mai" },
    { value: "06", label: "Juni" },
    { value: "07", label: "Juli" },
    { value: "08", label: "August" },
    { value: "09", label: "September" },
    { value: "10", label: "Oktober" },
    { value: "11", label: "November" },
    { value: "12", label: "Dezember" },
    { value: "13", label: "Januar +1" },
  ];
</script>

<div>
  <label for="month-select">Monat:</label>
  <select id="month-select" bind:value={selectedMonth}>
    {#each months as month}
      <option value={month.value}>{month.label}</option>
    {/each}
  </select>
</div>
