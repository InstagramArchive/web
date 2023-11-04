<main class="flex relative flex-col items-center w-full h-full">
	<div class="flex flex-col items-center p-2 m-5 w-1/2 bg-pink-100 rounded-lg">
		<h1 class="text-2xl font-semibold">Login</h1>
		<form action="?/login" method="POST" class="flex flex-col gap-5 p-5">
			<div class="flex flex-col">
				<label for="email">Email</label>
				<input type="text" name="email" class="p-1 rounded border" id="email" />
			</div>
			<div class="flex flex-col">
				<label for="password">Password</label>
				<input
					type="password"
					name="password"
					class="p-1 rounded border"
					id="password"
				/>
			</div>
			<button type="submit" class="p-1 text-white bg-pink-400 rounded-lg">Login</button>
		</form>
	</div>

	<a href="/auth/register" > Are you new ? <span class="font-semibold text-pink-400 capitalize">register</span> here </a>

	<a href="/explore" class="absolute top-0 right-0 px-2"> back </a>
</main>
