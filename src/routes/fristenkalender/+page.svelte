<script lang="ts">
  import { CalendarMonthSelect, CalendarYearInput } from "$lib/components";

  let year = new Date().getFullYear();
  let month = (new Date().getMonth() + 1).toString().padStart(2, "0");
</script>

<div class="mx-5 my-5">
  <CalendarYearInput bind:selectedYear={year} />
  <CalendarMonthSelect bind:selectedMonth={month} />
</div>
