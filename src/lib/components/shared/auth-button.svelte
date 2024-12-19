<script lang="ts">
  import { IconLogin, IconLogout } from "$lib/components";

  export let background = "bg-tint";
  export let textColor = "text-secondary";
</script>

<div class="flex items-center gap-4">
  <button
    class="flex items-center gap-2 rounded-full {background} {textColor} text-[16px] py-3 px-5"
  >
    Abmelden <IconLogout />
  </button>
  <button
    class="flex items-center gap-2 rounded-full {background} {textColor} text-[16px] py-3 px-5"
  >
    Anmelden <IconLogin />
  </button>
</div>
