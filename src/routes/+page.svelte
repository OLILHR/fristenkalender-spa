<!-- 
 remember to add the base path when referencing to other endpoints:
import { base } from "$app/paths";
for instance: href="{base}/<route>" 
-->
<script lang="ts">
  import "$src/app.scss";

  import { AuthButton } from "$lib/components";
</script>

<div class="relative">
  <div class="absolute top-4 right-4 z-10">
    <AuthButton />
  </div>
</div>

<h1>Welcome to SvelteKit</h1>
<p>
  Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation
</p>
