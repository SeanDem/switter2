<script lang="ts">
	import { page } from '$app/stores';
</script>

<header class="bg-base-100">
	<nav>
		<ul class="menu menu-horizontal p-0">
			<li class:active={$page.url.pathname === '/'}>
				<a href="/">Home</a>
			</li>
			<li class:active={$page.url.pathname.includes('/search')}>
				<a href="/search">Search</a>
			</li>
			<li class:active={$page.url.pathname.includes('/sweet')}>
				<a href="/sweet">Sweet</a>
			</li>
			<li class:active={$page.url.pathname.includes('/profile')}>
				<a href="/profile">Profile</a>
			</li>
		</ul>
	</nav>
</header>
