<script>
  import { IconHeart, IconLogo } from "$lib/components";

  export let background = "bg-tint";

  let currentYear = new Date().getFullYear();
</script>

<footer class="flex items-center {background} px-3 py-2">
  <div class="flex-none">
    <a href="https://hochfrequenz.de" title="landingpage">
      <IconLogo size={160} />
    </a>
  </div>

  <div class="flex-1 flex justify-center">
    <div class="flex items-center text-sm text-black/70 space-x-1 text-center">
      <p class="flex items-center flex-wrap justify-center">
        © {currentYear} - made with
        <IconHeart />
        by
        <a
          class="ml-1 mr-2"
          target="_blank"
          rel="noopener noreferrer"
          href="https://hochfrequenz.de">Hochfrequenz</a
        >
        |
        <a
          class="font-bold underline ml-2"
          target="_blank"
          rel="noopener
        noreferrer"
          href="https://www.hochfrequenz.de/#fristenkalender"
        >
          hier klicken</a
        >
        <span class="mr-2"
          >, um unseren aktuellsten Fristenkalender als PDF anzufordern</span
        >
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
  </div>

  <div class="flex-none w-[150px]"></div>
</footer>
