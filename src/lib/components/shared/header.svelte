<script lang="ts">
  import { base } from "$app/paths";
  import {
    AuthButton,
    CalendarMonthSelect,
    CalendarTypeSelect,
    CalendarYearSelect,
    IconSymbol,
  } from "$lib/components";

  export let background = "bg-primary";
  export let selectedYear: number;
  export let selectedMonth: string;
  export let selectedType: string;
</script>

<header class="flex items-center justify-between {background} px-3 py-2">
  <div class="flex items-center gap-4 flex-grow">
    <div class="flex-none pl-3">
      <a href="{base}/" title="landingpage">
        <IconSymbol size={35} />
      </a>
    </div>

    <div class="flex gap-4 ml-4">
      <CalendarYearSelect bind:selectedYear />
      <CalendarMonthSelect bind:selectedMonth />
      <CalendarTypeSelect bind:selectedType />
    </div>
  </div>

  <div class="flex-none py-2 pr-1">
    <AuthButton
      background="bg-tint"
      textColor="text-black"
      userEmailTextColor="text-black"
    />
  </div>
</header>
