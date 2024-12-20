<script lang="ts">
  import { onMount } from "svelte";

  import { goto } from "$app/navigation";
  import { base } from "$app/paths";
  import { page } from "$app/stores";
  import {
    CalendarMonthSelect,
    CalendarTypeSelect,
    CalendarYearInput,
  } from "$lib/components";
  import CalendarTable from "$lib/components/features/calendar-table.svelte";
  import type { MonthValue } from "$lib/types/calendar-month";
  import type { TypeValue } from "$lib/types/calendar-type";

  // default placeholders on inital page access (current year/month + "alle Netzzugangsthemen")
  let selectedYear = new Date().getFullYear();
  let selectedMonth: MonthValue = (new Date().getMonth() + 1)
    .toString()
    .padStart(2, "0") as MonthValue;
  let selectedType: TypeValue = "ALL";

  const monthNameMap: Record<MonthValue, string> = {
    "00": "dezember-1",
    "01": "januar",
    "02": "februar",
    "03": "maerz",
    "04": "april",
    "05": "mai",
    "06": "juni",
    "07": "juli",
    "08": "august",
    "09": "september",
    "10": "oktober",
    "11": "november",
    "12": "dezember",
    "13": "januar+1",
  };

  const reverseMonthNameMap: Record<string, MonthValue> = Object.fromEntries(
    Object.entries(monthNameMap).map(([k, v]) => [v, k as MonthValue]),
  );

  const typeNameMap: Record<TypeValue, string> = {
    ALL: "alle",
    GELI: "geli-gas",
    GPKE: "gpke",
    KOV: "kov",
    MABIS: "mabis",
  };

  const reverseTypeNameMap: Record<string, TypeValue> = Object.fromEntries(
    Object.entries(typeNameMap).map(([k, v]) => [v, k as TypeValue]),
  );

  onMount(() => {
    const queryParams = $page.url.searchParams;

    const urlYear = queryParams.get("jahr");
    if (urlYear && !isNaN(Number(urlYear))) {
      selectedYear = Number(urlYear);
    }

    const urlMonth = queryParams.get("monat");
    if (urlMonth && reverseMonthNameMap[urlMonth]) {
      selectedMonth = reverseMonthNameMap[urlMonth];
    }

    const urlType = queryParams.get("netzzugangsthema");
    if (urlType && reverseTypeNameMap[urlType]) {
      selectedType = reverseTypeNameMap[urlType];
    }
  });

  $: {
    // dynamically update URL query parameters
    if (selectedYear && selectedMonth && selectedType) {
      const params = new URLSearchParams();
      params.set("jahr", selectedYear.toString());
      params.set("monat", monthNameMap[selectedMonth]);
      params.set("netzzugangsthema", typeNameMap[selectedType]);

      goto(`${base}/fristenkalender/?${params.toString()}`, {
        replaceState: true,
      });
    }
  }
</script>

<div class="flex flex-col h-full">
  <div class="flex-none p-5">
    <div class="flex flex-wrap gap-4">
      <CalendarYearInput bind:selectedYear />
      <CalendarMonthSelect bind:selectedMonth />
      <CalendarTypeSelect bind:selectedType />
    </div>
  </div>

  <div class="flex-1 min-h-0 px-5 pb-5">
    <CalendarTable {selectedYear} {selectedMonth} {selectedType} />
  </div>
</div>
