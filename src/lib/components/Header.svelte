<script lang="ts">
	import { page } from '$app/stores';
	$: isActive = (path: string) => $page.url.pathname === path;
</script>

<header class="bg-base-100">
	<nav>
		<ul class="menu menu-horizontal">
			<li>
				<a class="text-xl {isActive('/') ? 'border-b-1 border-black' : ''}" href="/">Home</a>
			</li>
			<li>
				<a class="text-xl {isActive('/search') ? 'border-b-1 border-black' : ''}" href="/search"
					>Search</a
				>
			</li>
			<li>
				<a class="text-xl {isActive('/sweet') ? 'border-b-1 border-black' : ''}" href="/sweet"
					>Sweet</a
				>
			</li>
			<li>
				<a
					class="text-xl {$page.url.pathname.includes('/profile') ? 'border-b-1 border-black' : ''}"
					href="/profile">Profile</a
				>
			</li>
		</ul>
	</nav>
</header>
