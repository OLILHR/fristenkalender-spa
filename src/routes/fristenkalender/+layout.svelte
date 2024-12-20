<script lang="ts">
  import "$src/app.scss";

  import { AuthButton } from "$lib/components";
</script>

<div class="flex flex-col h-full">
  <div class="p-4">
    <div class="absolute top-4 right-4 z-10">
      <AuthButton
        background="bg-secondary"
        textColor="text-tint"
        userEmailTextColor="text-secondary"
      />
    </div>
  </div>

  <main class="flex-1 min-h-0">
    <slot />
  </main>
</div>
