<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import { base } from "$app/paths";
  import {
    CalendarMonthSelect,
    CalendarTypeSelect,
    CalendarYearInput,
  } from "$lib/components";
  import type { MonthValue } from "$lib/types/calendar-month";
  import type { TypeValue } from "$lib/types/calendar-type";

  // default placeholders on inital page access (current year/month + "alle Netzzugangsthemen")
  let year = new Date().getFullYear();
  let month: MonthValue = (new Date().getMonth() + 1)
    .toString()
    .padStart(2, "0") as MonthValue;
  let type: TypeValue = "ALL";

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
      year = Number(urlYear);
    }

    const urlMonth = queryParams.get("monat");
    if (urlMonth && reverseMonthNameMap[urlMonth]) {
      month = reverseMonthNameMap[urlMonth];
    }

    const urlType = queryParams.get("netzzugangsthema");
    if (urlType && reverseTypeNameMap[urlType]) {
      type = reverseTypeNameMap[urlType];
    }
  });

  $: {
    // dynamically update URL query parameters
    if (year && month && type) {
      const params = new URLSearchParams();
      params.set("jahr", year.toString());
      params.set("monat", monthNameMap[month]);
      params.set("netzzugangsthema", typeNameMap[type]);

      goto(`${base}/fristenkalender/?${params.toString()}`, {
        replaceState: true,
      });
    }
  }
</script>

<div class="mx-5 my-5">
  <CalendarYearInput bind:selectedYear={year} />
  <CalendarMonthSelect bind:selectedMonth={month} />
  <CalendarTypeSelect bind:selectedType={type} />
</div>
