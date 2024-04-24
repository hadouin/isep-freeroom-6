import type { PageLoad } from './$types'

export const load: PageLoad = async ({ params }) => {
	const { roomID } = params
	return {
		title: 'Salle ' + roomID,
		roomID,
	}
}
