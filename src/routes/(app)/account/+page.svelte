<script lang="ts">
  import { page } from '$app/stores';
  import Badge from '$lib/components/ui/badge/badge.svelte';

  type Attributes = { [key: string]: { _text: string } };

  // let { user, attributes }: { user: string; attributes: Attributes } = $page.data?.session?.cas;

  // let props = Object.fromEntries(
  //   Object.entries(attributes).map(([key, value]) => {
  //     let res: string | string[] = value._text;
  //     if (value instanceof Array) {
  //       res = value.map((v) => v._text);
  //     }
  //     return [key, res];
  //   })
  // );
</script>

<main class="flex flex-col flex-1 gap-4 p-4 overflow-scroll md:gap-8 md:p-8">
  <h1 class="text-xl font-bold">Mon Compte</h1>
  {#if $page.data.session}
    <div class="flex flex-col">
      <div class="text-lg font-bold">{$page.data?.session?.cas.attributes.nomcomplet._text} <Badge>{$page.data?.session?.cas.attributes.type._text}</Badge></div>
      <div>{$page.data?.session?.cas.user}</div>
      <div class="mt-1 text-secondary-foreground">{$page.data?.session?.cas.attributes.mail._text}</div>
    </div>
    <!-- <pre class="text-xs">{JSON.stringify(attributes, null, 2)}</pre> -->
  {/if}
</main>
