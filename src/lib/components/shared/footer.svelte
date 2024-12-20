<script>
  import { IconHeart } from "$lib/components";

  export let background = "bg-tint";

  let currentYear = new Date().getFullYear();
</script>

<footer class="flex flex-col items-center {background} px-6 py-2.5">
  <div class="flex items-center text-sm text-black space-x-1 text-center">
    <p class="flex items-center flex-wrap justify-center">
      © {currentYear} - made with
      <IconHeart />
      by
      <a
        class="font-bold ml-1 mr-2"
        target="_blank"
        rel="noopener noreferrer"
        href="https://hochfrequenz.de">Hochfrequenz</a
      >
      |
      <span class="ml-2">unseren Fristenkalender</span>
      <a
        class="font-bold underline mx-1"
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.hochfrequenz.de/#fristenkalender"
      >
        hier
      </a>
      <span class="mr-2">als PDF anfordern</span>
      |
      <a
        class="mx-2"
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.hochfrequenz.de/datenschutz/">Datenschutz</a
      >
      |
      <a
        class="mx-2"
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.hochfrequenz.de/impressum/">Impressum</a
      >
      |
      <a
        class="mx-2"
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.hochfrequenz.de/kontakt/">Kontakt</a
      >
    </p>
  </div>
  <div class="w-[23px]"></div>
</footer>
