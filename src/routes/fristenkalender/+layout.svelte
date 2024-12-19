<script lang="ts">
  import "$src/app.scss";

  import { AuthButton } from "$lib/components";
</script>

<div class="relative">
  <div class="absolute top-4 right-4 z-10">
    <AuthButton background="bg-secondary" textColor="text-tint" />
  </div>
</div>

<main>
  <slot />
</main>

<style></style>
