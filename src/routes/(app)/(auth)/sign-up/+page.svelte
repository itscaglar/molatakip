<script lang="ts">
	import { Button } from '#lib/components/shadcn/ui/button/index.ts';
	import * as Card from '#lib/components/shadcn/ui/card/index.ts';
	import { Input } from '#lib/components/shadcn/ui/input/index.ts';
	import { Label } from '#lib/components/shadcn/ui/label/index.ts';
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
			<form>
				<div class="flex flex-col gap-6">
					<div class="grid gap-2">
						<Label for="name">Ad</Label>
						<Input id="name" type="text" placeholder="Adınız" required />
					</div>
					<div class="grid gap-2">
						<Label for="email">Email</Label>
						<Input id="email" type="email" placeholder="m@example.com" required />
					</div>
					<div class="grid gap-2">
						<Label for="password">Şifre</Label>
						<Input id="password" type="password" required />
					</div>
				</div>
			</form>
		</Card.Content>
		<Card.Footer class="flex-col gap-2">
			<Button type="submit" class="w-full">Kayıt Ol</Button>
			<Button variant="outline" class="w-full" disabled>Google ile Kayıt Ol</Button>
		</Card.Footer>
	</Card.Root>
</div>
