<script lang="ts">
  import { Building2, Calendar, CalendarCheck, CircleUser, DoorOpen, Home, Menu, Moon, Sun } from 'lucide-svelte';

  import { mode, resetMode, setMode, toggleMode } from 'mode-watcher';
  import { Button } from '$lib/components/ui/button';
  // noinspection ES6UnusedImports
  import * as Dropdown from '$lib/components/ui/dropdown-menu';
  // noinspection ES6UnusedImports
  import * as Sheet from '$lib/components/ui/sheet';

  import { SearchBar } from '$lib/components/search';
  import { NavBarItem } from '$lib/components/nav-bar-item';
  import { navigating } from '$app/stores';
  import Avatar from '$lib/components/ui/avatar/avatar.svelte';
  import AvatarImage from '$lib/components/ui/avatar/avatar-image.svelte';
  import AvatarFallback from '$lib/components/ui/avatar/avatar-fallback.svelte';
  import { sha256 } from 'js-sha256';

  function getGravatarURL(email: string) {
    // Trim leading and trailing whitespace from email address
    // and force all characters to lower case
    const address = String(email).trim().toLowerCase();
    // create the image URL using the email address' hash
    return `https://www.gravatar.com/avatar/${sha256(address)}`;
  }

  let open = false;
  $: if ($navigating) open = false;
  export let data;
  $: rooms = data.rooms;
  $: user = data?.session?.cas;
  $: gravatarURL = getGravatarURL(user?.attributes.mail._text);

  const navItems = [
    { href: '/', icon: Home, label: 'Accueil' },
    { href: '/rooms', icon: DoorOpen, label: 'Salles' },
    { href: '/calendar', icon: Calendar, label: 'Calendrier' },
    { href: '/reservation', icon: CalendarCheck, label: 'Réservation' },
    { href: '/admin', icon: CircleUser, label: 'Admin', reload: !user, badges: ['beta'] },
  ];
</script>

<div
  class="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[230px_1fr]"
  class:ec-dark={$mode === 'dark'}
>
  <div class="hidden border-r bg-muted/40 md:block">
    <div class="flex h-full max-h-screen flex-col gap-2">
      <div class="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <a class="flex items-center gap-2 font-semibold" href="/">
          <Building2 class="h-6 w-6" />
          <span>FreeRoom</span>
        </a>
      </div>
      <div class="flex-1">
        <nav class="grid items-start px-2 text-sm font-medium lg:px-4">
          {#each navItems as item (item.href)}
            <NavBarItem {...item} />
          {/each}
        </nav>
      </div>
    </div>
  </div>
  <div class="flex h-screen min-w-0 flex-col">
    <header class="flex h-14 min-w-0 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <Sheet.Root bind:open>
        <Sheet.Trigger asChild let:builder>
          <Button builders={[builder]} class="shrink-0 md:hidden" size="icon" variant="outline">
            <Menu class="h-5 w-5" />
            <span class="sr-only">Afficher/cacher le menu de navigation</span>
          </Button>
        </Sheet.Trigger>
        <Sheet.Content class="flex flex-col" side="left">
          <nav class="grid gap-2 text-lg font-medium">
            <div class="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
              <a class="flex items-center gap-2 text-lg font-semibold" href="/">
                <Building2 class="h-6 w-6" />
                <span>FreeRoom</span>
              </a>
            </div>
            {#each navItems as item (item.href)}
              <NavBarItem {...item} />
            {/each}
          </nav>
        </Sheet.Content>
      </Sheet.Root>
      <div class="flex w-full min-w-0">
        <SearchBar class="sm:w-2/3 lg:w-1/2 xl:w-1/3" {rooms} />
      </div>
      <Dropdown.Root>
        <Dropdown.Trigger asChild let:builder>
          <Button builders={[builder]} class="hidden shrink-0 sm:flex" size="icon" variant="outline">
            <Sun
              class="absolute h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
            />
            <Moon class="h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span class="sr-only">Changer de thème</span>
          </Button>
        </Dropdown.Trigger>
        <Dropdown.Content align="end">
          <Dropdown.Item on:click={() => setMode('light')}>Thème clair</Dropdown.Item>
          <Dropdown.Item on:click={() => setMode('dark')}>Thème sombre</Dropdown.Item>
          <Dropdown.Item on:click={() => resetMode()}>Système</Dropdown.Item>
        </Dropdown.Content>
      </Dropdown.Root>
      <Dropdown.Root>
        <Dropdown.Trigger asChild let:builder>
          <Button builders={[builder]} class="shrink-0 rounded-full" size="icon" variant="secondary">
            <Avatar>
              <AvatarImage src={gravatarURL} />
              <AvatarFallback>
                <CircleUser class="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
            <CircleUser class="h-5 w-5" />
            <span class="sr-only">Afficher/cacher le menu utilisateur</span>
          </Button>
        </Dropdown.Trigger>
        <Dropdown.Content align="end">
          <Dropdown.Label>Mon Compte</Dropdown.Label>
          <Dropdown.Separator />
          <Dropdown.Item class="sm:hidden" on:click={toggleMode}
            >Thème&nbsp;
            <span class="hidden dark:inline">clair</span>
            <span class="dark:hidden">sombre</span>
          </Dropdown.Item>
          <Dropdown.Item data-sveltekit-reload={!user ? true : 'off'} href="/account">Paramètres</Dropdown.Item>
          <Dropdown.Item>Support</Dropdown.Item>
          <Dropdown.Separator />
          <Dropdown.Item data-sveltekit-preload-data="off" href="/logout">Déconnexion</Dropdown.Item>
        </Dropdown.Content>
      </Dropdown.Root>
    </header>
    <slot />
  </div>
</div>
