<script context="module" lang="ts">
  import type JQueryAjaxSettings from "jquery";

  declare global {
    interface Window {
      $: {
        ajax: (settings: JQueryAjaxSettings) => Promise<unknown>;
      };
    }
  }

  type CacheData = Array<string>;
  const dataCache: Record<string, CacheData> = {};
</script>

<script lang="ts">
  import type { CalendarEntry } from "$lib/types/calendar-entry";
  import type { MonthValue } from "$lib/types/calendar-month";
  import type { TypeValue } from "$lib/types/calendar-type";

  export let selectedYear: number;
  export let selectedMonth: MonthValue;
  export let selectedType: TypeValue;

  let entries: CalendarEntry[] = [];
  let isLoading = false;

  async function fetchData(): Promise<CacheData> {
    const cacheKey = `${selectedYear}-${selectedType}`;

    if (dataCache[cacheKey]) {
      return dataCache[cacheKey];
    }

    const requestUrl =
      selectedType === "ALL"
        ? `https://fristenkalender.azurewebsites.net/api/GenerateAllFristen/${selectedYear}`
        : `https://fristenkalender.azurewebsites.net/api/GenerateFristenForType/${selectedYear}/${selectedType}`;

    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(requestUrl)}`;

    try {
      const response = await window.$.ajax({
        url: proxyUrl,
        type: "GET",
        cache: true,
      });

      const typedResponse = response as CacheData;
      dataCache[cacheKey] = typedResponse;
      return typedResponse;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw new Error("Failed to fetch data");
    }
  }

  function processData(data: CacheData): CalendarEntry[] {
    let yearSelected = selectedYear;
    let monthSelected = parseInt(selectedMonth);

    if (monthSelected === 0) {
      yearSelected -= 1;
      monthSelected = 12;
    }
    if (monthSelected === 13) {
      yearSelected += 1;
      monthSelected = 1;
    }

    const monthNames = [
      "Jan",
      "Feb",
      "März",
      "Apr",
      "Mai",
      "Jun",
      "Jul",
      "Aug",
      "Sept",
      "Okt",
      "Nov",
      "Dez",
    ];

    return data
      .map((row) => {
        const labelMatch = row.match(/label='(.*?)'/);
        const dateMatch = row.match(
          /datetime\.date\((?<year>\d+), (?<month>\d+), (?<day>\d+)\)/,
        );
        const descriptionMatch = row.match(/description='(.*?)'/);

        if (!dateMatch?.groups || !labelMatch?.[1]) return null;

        const year = parseInt(dateMatch.groups.year);
        const monthInt = parseInt(dateMatch.groups.month);
        const day = parseInt(dateMatch.groups.day);

        if (monthInt !== monthSelected || year !== yearSelected) return null;

        return {
          date: `${day} ${monthNames[monthInt - 1]} ${year}`,
          workday: labelMatch[1],
          description: (descriptionMatch?.[1] || "").replace(/\\n/g, "<br>"),
        };
      })
      .filter((entry): entry is CalendarEntry => entry !== null)
      .sort((a, b) => {
        const [dayA, monthA, yearA] = a.date.split(" ");
        const [dayB, monthB, yearB] = b.date.split(" ");
        return (
          new Date(`${yearA}-${monthA}-${dayA}`).getTime() -
          new Date(`${yearB}-${monthB}-${dayB}`).getTime()
        );
      });
  }

  async function loadData(): Promise<void> {
    if (!selectedYear || !selectedMonth || !selectedType) return;

    isLoading = true;

    try {
      const data = await fetchData();
      entries = processData(data);
    } catch (error: unknown) {
      console.error("Error in loadData:", error);
      entries = [];
    } finally {
      isLoading = false;
    }
  }

  $: if (selectedYear && selectedMonth && selectedType) {
    loadData();
  }
</script>

<div class="h-full w-full relative flex flex-col overflow-hidden">
  {#if isLoading}
    <div class="flex justify-center items-center p-4">
      <span>Lade Fristenkalender ...</span>
    </div>
  {:else if entries.length === 0}
    <span> Keine Fristen für den ausgewählten Zeitraum gefunden. </span>
  {:else}
    <div class="overflow-auto flex-1 min-h-0">
      <table class="w-full text-left text-gray-800">
        <thead class="bg-gray-50 text-xs uppercase sticky top-0 z-10">
          <tr>
            <th class="px-6 py-3">Datum</th>
            <th class="px-6 py-3">Werktag</th>
            <th class="px-6 py-3">Beschreibung</th>
          </tr>
        </thead>
        <tbody>
          {#each entries as entry}
            <tr class="bg-white border-b">
              <td class="px-6 py-4 whitespace-nowrap">{entry.date}</td>
              <td class="px-6 py-4 whitespace-nowrap">{entry.workday}</td>
              <td class="px-6 py-4">{@html entry.description}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}
</div>
