<script lang="ts">
  export let selectedType: string = "ALL";

  const types = [
    { value: "ALL", label: "alle" },
    { value: "GELI", label: "GeLi Gas" },
    { value: "GPKE", label: "GPKE" },
    { value: "KOV", label: "KoV" },
    { value: "MABIS", label: "MaBiS" },
  ];
</script>

<div>
  <label for="type-select">Netzzugangsthema:</label>
  <select id="type-select" bind:value={selectedType}>
    {#each types as type}
      <option value={type.value}>{type.label}</option>
    {/each}
  </select>
</div>
