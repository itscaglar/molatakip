<script lang="ts">
	import { Button } from '#lib/components/shadcn/ui/button/index.ts';
	import * as Card from '#lib/components/shadcn/ui/card/index.ts';
	import { Input } from '#lib/components/shadcn/ui/input/index.ts';
	import { Label } from '#lib/components/shadcn/ui/label/index.ts';
	import { signUpWithEmailAndPassword } from '#lib/client/auth/index.ts';

	let name = $state('');
	let email = $state('');
	let password = $state('');
	let errorMessage = $state('');
	let isLoading = $state(false);

	async function handleSubmit(event: Event) {
		event.preventDefault();
		errorMessage = '';
		isLoading = true;

		try {
			const { error } = await signUpWithEmailAndPassword(name, email, password);
			if (error) errorMessage = error.message ?? 'Kayıt olurken bir hata oluştu.';
		} finally {
			isLoading = false;
		}
	}
</script>

<div class="flex size-full items-center justify-center">
	<Card.Root class="w-full max-w-sm">
		<Card.Header>
			<Card.Title>Hesap Oluşturun</Card.Title>
			<Card.Action>
				<Button variant="link" href="/sign-in">Giriş Yap</Button>
				<Button variant="link" href="/">Ana Sayfa</Button>
			</Card.Action>
		</Card.Header>
		<Card.Content>
			<!-- Forma id eklendi -->
			<form id="register-form" onsubmit={handleSubmit}>
				<div class="flex flex-col gap-6">
					<!-- Hata mesajı alanı -->
					{#if errorMessage}
						<div class="text-sm font-medium text-destructive">
							{errorMessage}
						</div>
					{/if}

					<div class="grid gap-2">
						<Label for="name">Ad</Label>
						<Input
							id="name"
							type="text"
							placeholder="Adınız"
							required
							bind:value={name}
							disabled={isLoading}
						/>
					</div>
					<div class="grid gap-2">
						<Label for="email">Email</Label>
						<Input
							id="email"
							type="email"
							placeholder="m@example.com"
							required
							bind:value={email}
							disabled={isLoading}
						/>
					</div>
					<div class="grid gap-2">
						<Label for="password">Şifre</Label>
						<Input
							id="password"
							type="password"
							required
							bind:value={password}
							disabled={isLoading}
						/>
					</div>
				</div>
			</form>
		</Card.Content>
		<Card.Footer class="flex-col gap-2">
			<!-- Butona form="register-form" özelliği eklendi -->
			<Button type="submit" form="register-form" class="w-full" disabled={isLoading}>
				{isLoading ? 'Kayıt Olunuyor...' : 'Kayıt Ol'}
			</Button>
			<Button variant="outline" class="w-full" disabled>Google ile Kayıt Ol</Button>
		</Card.Footer>
	</Card.Root>
</div>
