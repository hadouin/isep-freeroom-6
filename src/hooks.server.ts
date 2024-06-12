// src/hooks.server.ts
import { sessionHook } from "@macfja/sveltekit-session"
import { casHandler } from "@macfja/sveltekit-cas"
import type { Handle } from "@sveltejs/kit"
import { sequence } from "@sveltejs/kit/hooks"

export const handle: Handle = sequence(
	sessionHook(),
	casHandler(
		"https://portail-ovh.isep.fr",
		3,
		(event: any) => event.url.pathname.startsWith("/admin") || event.url.pathname.startsWith("/account"),
		(event:any , user: any) => {
      return false
		}
	)
)
