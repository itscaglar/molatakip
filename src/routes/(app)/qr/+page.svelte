<script lang="ts">
	import { onMount } from 'svelte';
	import { Button } from '#lib/components/shadcn/ui/button/index.ts';
	import * as Card from '#lib/components/shadcn/ui/card/index.ts';
	import { Skeleton } from '#lib/components/shadcn/ui/skeleton/index.ts';

	let qrDataUrl = $state('');
	let loading = $state(true);

	async function fetchRandomQR() {
		loading = true;
		try {
			const res = await fetch('/api/qr');
			if (!res.ok) throw new Error('Failed to fetch');
			const data = await res.json();
			qrDataUrl = data.qrDataUrl;
		} catch (error) {
			console.error(error);
		} finally {
			loading = false;
		}
	}

	onMount(() => {
		fetchRandomQR();
	});
</script>

<div class="flex h-dvh items-center justify-center">
	<Card.Root>
		<Card.Header>
			<Card.Title>Server-Side QR Tester</Card.Title>
		</Card.Header>
		<Card.Content>
			{#if loading}
				<Skeleton class="h-full w-full rounded-lg" />
			{:else if qrDataUrl}
				<img
					src={qrDataUrl}
					alt="Generated QR Code"
					class="h-full w-full object-contain transition-opacity duration-200"
				/>
			{/if}
		</Card.Content>
		<Card.Footer>
			<Button onclick={fetchRandomQR} disabled={loading} class="w-full">
				{loading ? 'Generating...' : 'Generate New QR'}
			</Button>
		</Card.Footer>
	</Card.Root>
</div>
