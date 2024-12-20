<script lang="ts">
  export let selectedMonth: string = new Date()
    .getMonth()
    .toString()
    .padStart(2, "0");

  const months = [
    { value: "00", label: "Januar" },
    { value: "01", label: "Februar" },
    { value: "02", label: "März" },
    { value: "03", label: "April" },
    { value: "04", label: "Mai" },
    { value: "05", label: "Juni" },
    { value: "06", label: "Juli" },
    { value: "07", label: "August" },
    { value: "08", label: "September" },
    { value: "09", label: "Oktober" },
    { value: "10", label: "November" },
    { value: "11", label: "Dezember" },
  ] as const;
</script>

<div class="flex flex-col items-start mt-2 w-48 relative">
  <select
    id="month-select"
    bind:value={selectedMonth}
    class="inline-block border-2 border-white rounded-lg bg-primary text-black/70 py-2 px-2 ps-3 pe-4 focus:outline-0 w-full cursor-pointer leading-relaxed appearance-none"
  >
    {#each months as month}
      <option value={month.value}>{month.label}</option>
    {/each}
  </select>
  <label
    for="month-select"
    class="absolute top-0.5 left-3 -translate-y-1/2 text-xs text-slate-500 bg-white px-1 rounded"
  >
    Monat
  </label>
</div>
