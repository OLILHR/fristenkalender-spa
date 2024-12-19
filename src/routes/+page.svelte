<!-- 
 remember to add the base path when referencing to other endpoints:
import { base } from "$app/paths";
for instance: href="{base}/<route>" 
-->
<script lang="ts">
  import "$src/app.scss";

  import { AuthButton, IconSquareArrow } from "$lib/components";
</script>

<div class="relative">
  <div class="absolute top-4 right-4 z-10">
    <AuthButton />
  </div>
</div>

<section class="bg-secondary flex-grow flex items-center justify-center">
  <div class="rounded-lg w-1/3 text-justify bg-tint p-12 shadow-md">
    <h1 class="text-2xl text-center pb-5">Digitaler Fristenkalender</h1>
    <h2
      class="flex justify-center text-sm border-b border-secondary pb-3 mb-5 uppercase"
    >
      Fristen im Blick und Zukunft im Griff
    </h2>
    <h3>
      Das Projekt digitaler Fristenkalender bringt den bewährten
      Hochfrequenz-Fristenkalender vom Wand-Format in Ihre Kalender-App. So
      können alle offiziellen Fristen aus unter anderem GPKE und MaBiS in
      beliebe Kalender-Apps importiert und dort als Ereignisse angezeigt werden.
    </h3>
    <div class="mt-10 flex justify-center">
      <button
        class="flex flex-row items-center gap-2 rounded-full bg-secondary text-white px-5 py-2 shadow-md no-underline transition-transform duration-300 ease-in-out hover:scale-110"
      >
        <IconSquareArrow /> Jetzt öffnen
      </button>
    </div>
  </div>
</section>
