<script lang="ts">
  import type { CalendarEntry } from "$lib/types/calendar-entry";
  import type { MonthValue } from "$lib/types/calendar-month";
  import type { TypeValue } from "$lib/types/calendar-type";

  export let selectedYear: number;
  export let selectedMonth: MonthValue;
  export let selectedType: TypeValue;

  let entries: CalendarEntry[] = [];
  let isLoading = false;

  async function fetchDataForYear(): Promise<string[]> {
    const apiUrl =
      selectedType === "ALL"
        ? `https://fristenkalender.azurewebsites.net/api/GenerateAllFristen/${selectedYear}`
        : `https://fristenkalender.azurewebsites.net/api/GenerateFristenForType/${selectedYear}/${selectedType}`;

    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(apiUrl)}`;

    const response = await fetch(proxyUrl);
    if (!response.ok) {
      throw new Error(`HTTP error status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  }

  function displayResults(data: string[]): void {
    let yearSelected = selectedYear;
    let monthSelected = parseInt(selectedMonth);

    if (monthSelected === 0) {
      yearSelected += -1;
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

    entries = data
      .map((row) => {
        const labelPattern = /label='(.*?)'/;
        const labelMatches = row.match(labelPattern);
        const labelMatch = labelMatches && labelMatches[1];

        const datePattern =
          /datetime\.date\((?<year>\d+), (?<month>\d+), (?<day>\d+)\)/;
        const dateMatches = row.match(datePattern);

        // skip rows containing unselected dates (azure function returns data for a whole year)
        if (!dateMatches?.groups || !labelMatch) {
          return null;
        }

        const year = parseInt(dateMatches.groups.year);
        const monthInt = parseInt(dateMatches.groups.month);
        const day = parseInt(dateMatches.groups.day);

        if (monthInt !== monthSelected || year !== yearSelected) {
          return null;
        }

        const descriptionPattern = /description='(.*?)'/;
        const descriptionMatches = row.match(descriptionPattern);
        const description = (descriptionMatches?.[1] || "").replace(
          /\\n/g,
          "<br>",
        );

        return {
          date: `${day} ${monthNames[monthInt - 1]} ${year}`,
          workday: labelMatch,
          description,
        };
      })
      .filter((entry): entry is CalendarEntry => entry !== null)
      .sort((a, b) => {
        const dateA = new Date(
          a.date.replace(/(\d+)\s+(\w+)\s+(\d+)/, "$3-$2-$1"),
        );
        const dateB = new Date(
          b.date.replace(/(\d+)\s+(\w+)\s+(\d+)/, "$3-$2-$1"),
        );
        return dateA.getTime() - dateB.getTime();
      });
  }

  async function loadData(): Promise<void> {
    isLoading = true;

    try {
      const data = await fetchDataForYear();
      displayResults(data);
    } catch (e) {
      console.error("Error in loadData:", e);
      entries = [];
    } finally {
      isLoading = false;
    }
  }

  $: if (selectedYear && selectedMonth && selectedType) {
    loadData();
  }
</script>

<div class="relative overflow-x-auto mt-4">
  {#if isLoading}
    <div class="flex justify-center items-center p-4">
      <span class="text-gray-600">Fristen werden geladen ...</span>
    </div>
  {:else if entries.length === 0}
    <div class="text-gray-600 p-4">
      Keine Fristen für den ausgewählten Zeitraum gefunden.
    </div>
  {:else}
    <table class="w-full text-left text-gray-800">
      <thead class="bg-gray-50 text-xs uppercase">
        <tr>
          <th class="px-6 py-3">Datum</th>
          <th class="px-6 py-3">Werktag</th>
          <th class="px-6 py-3">Beschreibung</th>
        </tr>
      </thead>
      <tbody>
        {#each entries as entry}
          <tr class="bg-white border-b">
            <td class="px-6 py-4">{entry.date}</td>
            <td class="px-6 py-4">{entry.workday}</td>
            <td class="px-6 py-4">{@html entry.description}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  {/if}
</div>
