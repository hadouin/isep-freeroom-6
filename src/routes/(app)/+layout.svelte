<script lang="ts">
	import Building2 from 'lucide-svelte/icons/building-2';
	import CircleUser from 'lucide-svelte/icons/circle-user';
	import DoorOpen from 'lucide-svelte/icons/door-open';
	import Home from 'lucide-svelte/icons/home';
	import Menu from 'lucide-svelte/icons/menu';

	import { Button } from '$lib/components/ui/button/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import * as Sheet from '$lib/components/ui/sheet/index.js';

	import { page } from '$app/stores';
	import SearchBar from '$lib/components/search/search-bar.svelte';
	import { Calendar } from 'lucide-svelte';
</script>

<div class="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
	<div class="hidden border-r bg-muted/40 md:block">
		<div class="flex flex-col h-full max-h-screen gap-2">
			<div class="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
				<a href="/" class="flex items-center gap-2 font-semibold">
					<Building2 class="w-6 h-6" />
					<span class="">FreeRoom 3</span>
				</a>
			</div>
			<div class="flex-1">
				<nav class="grid items-start px-2 text-sm font-medium lg:px-4">
					<a
						href="/"
						class="flex items-center gap-3 px-3 py-2 transition-all rounded-lg hover:text-primary"
						class:text-muted-foreground={$page.url.pathname !== '/'}
						class:text-primary={$page.url.pathname === '/'}
						class:bg-muted={$page.url.pathname === '/'}
					>
						<Home class="w-4 h-4" />
						Home
					</a>
					<a
						href="/rooms"
						class="flex items-center gap-3 px-3 py-2 transition-all rounded-lg hover:text-primary"
						class:text-muted-foreground={$page.url.pathname !== '/rooms'}
						class:text-primary={$page.url.pathname === '/rooms'}
						class:bg-muted={$page.url.pathname === '/rooms'}
					>
						<DoorOpen class="w-4 h-4" />
						Salles
					</a>
					<a
						href="/calendar"
						class="flex items-center gap-3 px-3 py-2 transition-all rounded-lg hover:text-primary"
						class:text-muted-foreground={$page.url.pathname !== '/calendar'}
						class:text-primary={$page.url.pathname === '/calendar'}
						class:bg-muted={$page.url.pathname === '/calendar'}
					>
						<Calendar class="w-4 h-4" />
						Calendrier
					</a>
				</nav>
			</div>
			<div class="p-4 mt-auto">
				<!-- <Card.Root>
          <Card.Header class="p-2 pt-0 md:p-4">
            <Card.Title>Upgrade to Pro</Card.Title>
            <Card.Description>
              Unlock all features and get unlimited access to our support team.
            </Card.Description>
          </Card.Header>
          <Card.Content class="p-2 pt-0 md:p-4 md:pt-0">
            <Button size="sm" class="w-full">Upgrade</Button>
          </Card.Content>
        </Card.Root> -->
			</div>
		</div>
	</div>
	<div class="flex flex-col h-screen">
		<header class="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
			<Sheet.Root>
				<Sheet.Trigger asChild let:builder>
					<Button variant="outline" size="icon" class="shrink-0 md:hidden" builders={[builder]}>
						<Menu class="w-5 h-5" />
						<span class="sr-only">Toggle navigation menu</span>
					</Button>
				</Sheet.Trigger>
				<Sheet.Content side="left" class="flex flex-col">
					<nav class="grid gap-2 text-lg font-medium">
						<a href="##" class="flex items-center gap-2 text-lg font-semibold">
							<Building2 class="w-6 h-6" />
							<span class="">FreeRoom 3</span>
						</a>
						<a
							href="/"
							class="flex items-center gap-3 px-3 py-2 transition-all rounded-lg hover:text-primary"
							class:text-muted-foreground={$page.url.pathname !== '/'}
							class:text-primary={$page.url.pathname === '/'}
							class:bg-muted={$page.url.pathname === '/'}
						>
							<Home class="w-4 h-4" />
							Home
						</a>
						<a
							href="/rooms"
							class="flex items-center gap-3 px-3 py-2 transition-all rounded-lg hover:text-primary"
							class:text-muted-foreground={$page.url.pathname !== '/rooms'}
							class:text-primary={$page.url.pathname === '/rooms'}
							class:bg-muted={$page.url.pathname === '/rooms'}
						>
							<DoorOpen class="w-4 h-4" />
							Salles
						</a>
						<a
							href="/calendar"
							class="flex items-center gap-3 px-3 py-2 transition-all rounded-lg hover:text-primary"
							class:text-muted-foreground={$page.url.pathname !== '/calendar'}
							class:text-primary={$page.url.pathname === '/calendar'}
							class:bg-muted={$page.url.pathname === '/calendar'}
						>
							<Calendar class="w-4 h-4" />
							Calendrier
						</a>
					</nav>
					<div class="mt-auto">
						<!-- <Card.Root>
							<Card.Header>
								<Card.Title>Upgrade to Pro</Card.Title>
								<Card.Description>
									Unlock all features and get unlimited access to our support team.
								</Card.Description>
							</Card.Header>
							<Card.Content>
								<Button size="sm" class="w-full">Upgrade</Button>
							</Card.Content>
						</Card.Root> -->
					</div>
				</Sheet.Content>
			</Sheet.Root>
			<div class="flex-1 w-full">
				<SearchBar className="md:w-2/3 lg:w-1/3"></SearchBar>
			</div>
			<DropdownMenu.Root>
				<DropdownMenu.Trigger asChild let:builder>
					<Button builders={[builder]} variant="secondary" size="icon" class="rounded-full">
						<CircleUser class="w-5 h-5" />
						<span class="sr-only">Toggle user menu</span>
					</Button>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content align="end">
					<DropdownMenu.Label>My Account</DropdownMenu.Label>
					<DropdownMenu.Separator />
					<DropdownMenu.Item>Settings</DropdownMenu.Item>
					<DropdownMenu.Item>Support</DropdownMenu.Item>
					<DropdownMenu.Separator />
					<DropdownMenu.Item>Logout</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</header>
		<slot />
	</div>
</div>
