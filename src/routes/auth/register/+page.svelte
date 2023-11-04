<main class="flex relative flex-col items-center w-full h-full">
	<div class="flex flex-col items-center p-2 m-5 w-1/2 bg-pink-100 rounded-lg">
		<h1 class="text-2xl font-semibold">Register</h1>
		<form action="?/register" method="POST" class="flex flex-col gap-5 auth-form">
			<label for="email" class="mb-1">Email</label>
			<input type="text" name="email" class="p-1 rounded border" id="email" />
			<label for="password" class="mb-1">Password</label>
			<input type="password" name="password" class="p-1 rounded border" id="password" />
			<button type="submit" class="p-1 text-white bg-pink-400 rounded-lg">Register</button>
		</form>
	</div>
	<a href="/auth/login" > Are have an account ? <span class="font-semibold text-pink-400 capitalize">login</span> here </a>

</main>
