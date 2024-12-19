<script lang="ts">
  import { IconLogin, IconLogout } from "$lib/components";
</script>

<div class="flex items-center gap-4">
  <button
    class="flex items-center gap-2 rounded-full bg-tint text-[16px] py-3 px-5 text-secondary"
  >
    Abmelden <IconLogout />
  </button>
  <button
    class="flex items-center gap-2 rounded-full bg-tint text-[16px] py-3 px-5 text-secondary"
  >
    Anmelden <IconLogin />
  </button>
</div>
