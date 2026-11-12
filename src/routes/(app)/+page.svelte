<script lang="ts">
	import { authClient, signOut } from '#lib/client/auth/index.ts';
	import { Button } from '#lib/components/shadcn/ui/button/index.ts';
	import { LogOut, UserRoundPlus } from '@lucide/svelte';

	const session = authClient.useSession();
</script>

<div class="m-16 flex flex-col items-center justify-center gap-4">
	{#if $session.data}
		<p class="text-lg">Merhaba, {$session.data.user.name}</p>
		<Button variant="destructive" onclick={async () => await signOut()}>
			<LogOut />
			Çıkış Yap
		</Button>
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
