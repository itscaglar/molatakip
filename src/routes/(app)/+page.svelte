<script lang="ts">
	import { authClient, signOut } from '#lib/client/auth/index.ts';
	import * as CodeBlock from '#lib/components/shadcn/ui/code-block/index.ts';
	import { Button } from '#lib/components/shadcn/ui/button/index.ts';
	import { LogOut, User, UserRoundPlus } from '@lucide/svelte';
	import { useHighlightedCode } from '#lib/components/shadcn/hooks/use-highlighted-code.svelte.ts';

	const session = authClient.useSession();

	const sessionCodeLines = useHighlightedCode(
		() => JSON.stringify($session?.data, null, 2),
		() => 'json'
	);
</script>

<div class="m-16 flex flex-col items-center justify-center gap-4">
	{#if $session.data}
		<p class="text-lg">Merhaba, {$session.data.user.name}</p>
		<Button variant="destructive" onclick={async () => await signOut()}>
			<LogOut />
			Çıkış Yap
		</Button>

		<CodeBlock.Root>
			<CodeBlock.Header>
				<CodeBlock.Title>
					<User />
					session
				</CodeBlock.Title>
			</CodeBlock.Header>
			<CodeBlock.Content>
				{#each sessionCodeLines.current as line, i (i)}
					<CodeBlock.Line code={line} />
				{/each}
			</CodeBlock.Content>
		</CodeBlock.Root>
	{:else}
		<p class="text-lg">Lütfen giriş yapın veya kayıt olun.</p>
		<div class="flex gap-4">
			<div class="flex gap-2">
				<Button href="sign-in" variant="outline">
					<UserRoundPlus />
					Giriş Yap
				</Button>
				<Button href="sign-up" variant="outline">
					<UserRoundPlus />
					Kayıt Ol
				</Button>
			</div>
		</div>
	{/if}
</div>
