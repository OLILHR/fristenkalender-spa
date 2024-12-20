<script lang="ts">
  import {
    CalendarMonthSelect,
    CalendarTypeSelect,
    CalendarYearInput,
  } from "$lib/components";

  let year = new Date().getFullYear();
  let month = (new Date().getMonth() + 1).toString().padStart(2, "0");
  let type = "ALL";
</script>

<div class="mx-5 my-5">
  <CalendarYearInput bind:selectedYear={year} />
  <CalendarMonthSelect bind:selectedMonth={month} />
  <CalendarTypeSelect bind:selectedType={type} />
</div>
