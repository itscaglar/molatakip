<script lang="ts">
	import { Button } from '#lib/components/shadcn/ui/button/index.ts';
	import * as Card from '#lib/components/shadcn/ui/card/index.ts';
	import { Input } from '#lib/components/shadcn/ui/input/index.ts';
	import { Label } from '#lib/components/shadcn/ui/label/index.ts';
</script>

<div class="flex size-full items-center justify-center">
	<Card.Root class="w-full max-w-sm">
		<Card.Header>
			<Card.Title>Giriş Yapın</Card.Title>
			<Card.Action>
				<Button variant="link" href="/sign-up">Kayıt Ol</Button>
				<Button variant="link" href="/">Ana Sayfa</Button>
			</Card.Action>
		</Card.Header>
		<Card.Content>
			<form>
				<div class="flex flex-col gap-6">
					<div class="grid gap-2">
						<Label for="email">Email</Label>
						<Input id="email" type="email" placeholder="m@example.com" required />
					</div>
					<div class="grid gap-2">
						<div class="flex items-center">
							<Label for="password">Şifre</Label>
							<a href="##" class="ml-auto inline-block text-sm underline-offset-4 hover:underline">
								Şifrenizi mi unuttunuz?
							</a>
						</div>
						<Input id="password" type="password" required />
					</div>
				</div>
			</form>
		</Card.Content>
		<Card.Footer class="flex-col gap-2">
			<Button type="submit" class="w-full">Giriş Yap</Button>
			<Button variant="outline" class="w-full" disabled>Google ile Giriş Yap</Button>
		</Card.Footer>
	</Card.Root>
</div>
