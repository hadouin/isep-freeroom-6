<script lang="ts">
  import { Building2, Calendar, CalendarCheck, CircleUser, DoorOpen, Home, Menu, Moon, Sun } from 'lucide-svelte';

  import { resetMode, setMode, toggleMode } from 'mode-watcher';
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
    // Trim leading and trailing whitespace from
    // an email address and force all characters
    // to lower case
    const address = String(email).trim().toLowerCase();
    // Create a SHA256 hash of the final string
    const hash = sha256(address);
    // Grab the actual image URL
    return `https://www.gravatar.com/avatar/${hash}`;
  }

  let open = false;
  $: if ($navigating) open = false;
  export let data;
  $: rooms = data.rooms;
  $: user = data?.session?.cas;
  $: gravatarURL = getGravatarURL(user?.attributes.mail._text);
</script>

<div class="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
  <div class="hidden border-r bg-muted/40 md:block">
    <div class="flex flex-col h-full max-h-screen gap-2">
      <div class="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <a class="flex items-center gap-2 font-semibold" href="/">
          <Building2 class="w-6 h-6" />
          <span>FreeRoom</span>
        </a>
      </div>
      <div class="flex-1">
        <nav class="grid items-start px-2 text-sm font-medium lg:px-4">
          <NavBarItem href="/" icon={Home} label="Accueil" />
          <NavBarItem href="/rooms" icon={DoorOpen} label="Salles" />
          <NavBarItem href="/calendar" icon={Calendar} label="Calendrier" />
          <NavBarItem href="/reservation" icon={CalendarCheck} label="Réservation" />
          <NavBarItem reload={!user} href="/admin" icon={CircleUser} label="Admin" beta />
        </nav>
      </div>
    </div>
  </div>
  <div class="flex flex-col h-screen">
    <header class="flex h-14 min-w-0 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <Sheet.Root bind:open>
        <Sheet.Trigger asChild let:builder>
          <Button builders={[builder]} class="shrink-0 md:hidden" size="icon" variant="outline">
            <Menu class="w-5 h-5" />
            <span class="sr-only">Afficher/cacher le menu de navigation</span>
          </Button>
        </Sheet.Trigger>
        <Sheet.Content class="flex flex-col" side="left">
          <nav class="grid gap-2 text-lg font-medium">
            <div class="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
              <a class="flex items-center gap-2 text-lg font-semibold" href="/">
                <Building2 class="w-6 h-6" />
                <span>FreeRoom</span>
              </a>
            </div>
            <NavBarItem href="/" icon={Home} label="Home" />
            <NavBarItem href="/rooms" icon={DoorOpen} label="Salles" />
            <NavBarItem href="/calendar" icon={Calendar} label="Calendrier" />
            <NavBarItem href="/reservation" icon={CalendarCheck} label="Réservation" />
            <NavBarItem reload={!user} href="/admin" icon={CircleUser} label="Admin" beta />
          </nav>
        </Sheet.Content>
      </Sheet.Root>
        <div class="flex flex-1 w-full min-w-0">
          <SearchBar class="sm:w-2/3 lg:w-1/2 xl:w-1/3" {rooms} />
        </div>
        <Dropdown.Root>
          <Dropdown.Trigger asChild let:builder>
            <Button builders={[builder]} class="hidden sm:flex" size="icon" variant="outline">
              <Sun class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon
                class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
              />
              <span class="sr-only">Changer de thème</span>
            </Button>
          </Dropdown.Trigger>
          <Dropdown.Content align="end">
            <Dropdown.Item on:click={() => setMode('light')}>Clair</Dropdown.Item>
            <Dropdown.Item on:click={() => setMode('dark')}>Sombre</Dropdown.Item>
            <Dropdown.Item on:click={() => resetMode()}>Système</Dropdown.Item>
          </Dropdown.Content>
        </Dropdown.Root>
        <Dropdown.Root>
          <Dropdown.Trigger asChild let:builder>
            <Button builders={[builder]} class="rounded-full" size="icon" variant="secondary">
              <Avatar>
                <AvatarImage src={gravatarURL} />
                <AvatarFallback>
                  <CircleUser class="w-5 h-5" />
                </AvatarFallback>
              </Avatar>
              <CircleUser class="w-5 h-5" />
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
