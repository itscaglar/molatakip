<script lang="ts">
	import './layout.css';
	import favicon from '#lib/assets/favicon.svg';
	import type { LayoutProps } from './$types';
	import { ModeWatcher } from 'mode-watcher';

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<title>MolaTakip</title>
	<link rel="icon" href={favicon} />
</svelte:head>

<ModeWatcher defaultMode="system" />
{@render children()}
