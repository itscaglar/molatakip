<script lang="ts">
	import { onMount } from 'svelte';
	import { Button } from '#lib/components/shadcn/ui/button/index.ts';
	import * as Card from '#lib/components/shadcn/ui/card/index.ts';
	import { Skeleton } from '#lib/components/shadcn/ui/skeleton/index.ts';
	import { Input } from '#lib/components/shadcn/ui/input/index.ts';
	import { Label } from '#lib/components/shadcn/ui/label/index.ts';

	interface QrPoint {
		id: string;
		name: string;
		code: string;
		isActive: boolean;
		createdAt: string;
	}

	let qrDataUrl = $state('');
	let currentPayload = $state('');
	let points = $state<QrPoint[]>([]);
	let loading = $state(true);
	let submitting = $state(false);
	let errorMsg = $state('');

	// Form state
	let name = $state('');
	let code = $state('');

	async function fetchQR(customCode?: string) {
		loading = true;
		errorMsg = '';
		try {
			const url = customCode ? `/api/qr?code=${encodeURIComponent(customCode)}` : '/api/qr';
			const res = await fetch(url);
			if (!res.ok) throw new Error('Failed to fetch');
			const data = await res.json();
			qrDataUrl = data.qrDataUrl;
			currentPayload = data.payload;
			points = data.points ?? [];
		} catch (error) {
			console.error(error);
			errorMsg = 'Could not load QR data.';
		} finally {
			loading = false;
		}
	}

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		if (!name.trim()) return;

		submitting = true;
		loading = true;
		errorMsg = '';

		try {
			const res = await fetch('/api/qr', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ name, code })
			});

			const data = await res.json();
			if (!res.ok) {
				errorMsg = data.error || 'Failed to save QR point';
				return;
			}

			qrDataUrl = data.qrDataUrl;
			currentPayload = data.payload;
			points = data.points ?? [];

			// Reset form inputs
			name = '';
			code = '';
		} catch (error) {
			console.error(error);
			errorMsg = 'Network error while saving QR point.';
		} finally {
			submitting = false;
			loading = false;
		}
	}

	function fillRandomCode() {
		code = crypto.randomUUID();
	}

	onMount(() => {
		fetchQR();
	});
</script>

<div class="mx-auto flex min-h-dvh max-w-5xl items-center justify-center p-6">
	<div class="grid w-full grid-cols-1 items-start gap-8 md:grid-cols-2">
		<div class="flex min-w-0 flex-col gap-8">
			<Card.Root class="w-full">
				<Card.Header>
					<Card.Title>Create QR Point</Card.Title>
				</Card.Header>
				<Card.Content>
					<form id="qr-form" onsubmit={handleSubmit}>
						<div class="flex flex-col gap-6">
							<div class="grid gap-2">
								<Label for="name">Point Name</Label>
								<Input id="name" placeholder="e.g. Main Entrance" bind:value={name} required />
							</div>

							<div class="grid gap-2">
								<div class="flex items-center">
									<Label for="code">Payload / Code</Label>
									<button
										type="button"
										onclick={fillRandomCode}
										class="ml-auto inline-block text-sm underline-offset-4 hover:underline"
									>
										Generate UUID
									</button>
								</div>
								<Input id="code" placeholder="Leave empty for random UUID" bind:value={code} />
							</div>

							{#if errorMsg}
								<p class="text-sm text-destructive">{errorMsg}</p>
							{/if}
						</div>
					</form>
				</Card.Content>
				<Card.Footer class="flex-col gap-2">
					<Button type="submit" form="qr-form" disabled={submitting || loading} class="w-full">
						{submitting ? 'Saving & Generating...' : 'Save & Generate QR'}
					</Button>
					<Button
						type="button"
						variant="outline"
						onclick={() => fetchQR()}
						disabled={loading}
						class="w-full"
					>
						Test Random QR (No Save)
					</Button>
				</Card.Footer>
			</Card.Root>

			<Card.Root class="w-full">
				<Card.Header>
					<Card.Title>QR Preview</Card.Title>
				</Card.Header>
				<Card.Content class="flex flex-col items-center gap-4">
					<div class="flex h-64 w-64 items-center justify-center rounded-lg border bg-white p-2">
						{#if loading}
							<Skeleton class="h-full w-full rounded-lg" />
						{:else if qrDataUrl}
							<img
								src={qrDataUrl}
								alt="Generated QR Code"
								class="h-full w-full object-contain transition-opacity duration-200"
							/>
						{/if}
					</div>
					<code class="max-w-full truncate text-xs text-muted-foreground">
						{currentPayload || '...'}
					</code>
				</Card.Content>
			</Card.Root>
		</div>

		<Card.Root class="flex max-h-[calc(100dvh-3rem)] w-full min-w-0 flex-col">
			<Card.Header>
				<Card.Title>Saved QR Points (Latest 10)</Card.Title>
			</Card.Header>
			<Card.Content class="flex-1 overflow-y-auto">
				{#if points.length === 0 && !loading}
					<p class="py-8 text-center text-sm text-muted-foreground">No QR points saved yet.</p>
				{:else}
					<div class="divide-y rounded-md border">
						{#each points as point (point.id)}
							<div class="flex items-center justify-between gap-4 p-3 text-sm">
								<div class="min-w-0 space-y-1">
									<div class="flex items-center gap-2 font-medium">
										<span class="truncate">{point.name}</span>
										<span
											class="shrink-0 rounded-full px-2 py-0.5 text-[10px] {point.isActive
												? 'bg-green-500/10 text-green-600'
												: 'bg-muted text-muted-foreground'}"
										>
											{point.isActive ? 'Active' : 'Inactive'}
										</span>
									</div>
									<p class="truncate font-mono text-xs text-muted-foreground">{point.code}</p>
								</div>
								<Button
									variant="ghost"
									size="sm"
									class="shrink-0"
									onclick={() => fetchQR(point.code)}
									disabled={loading}
								>
									Show QR
								</Button>
							</div>
						{/each}
					</div>
				{/if}
			</Card.Content>
		</Card.Root>
	</div>
</div>
