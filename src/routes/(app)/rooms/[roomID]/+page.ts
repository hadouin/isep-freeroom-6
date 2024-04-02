export function load({ params }: { fetch: any; params: { roomID: string } }) {
	return { roomID: params.roomID };
}
