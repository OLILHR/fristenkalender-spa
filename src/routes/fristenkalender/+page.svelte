<script lang="ts">
  import { CalendarYear } from "$lib/components";

  let year = new Date().getFullYear();
</script>

<div class="mx-5 my-5">
  <CalendarYear bind:selectedYear={year} />
</div>
