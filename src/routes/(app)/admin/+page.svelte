<script lang="ts">
  import { page } from '$app/stores';
</script>

<main class="flex flex-col flex-1 gap-4 p-4 overflow-scroll md:gap-8 md:p-8">
  <h1>Admin</h1>
  {#if $page.data?.session}
    <div class="flex flex-col">
      <div class="text-lg font-bold">{$page.data?.session?.cas?.user}</div>
    </div>
  {/if}
</main>
