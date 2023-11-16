<script lang="ts">
	import { page } from '$app/stores';
</script>

<header>
	<nav>
		<ul>
			<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
				<a href="/">Home</a>
			</li>
			<!-- <li aria-current={$page.url.pathname.startsWith('/conversations') ? 'page' : undefined}>
				<a href="/conversations">Conversations</a>
			</li> -->
			<li aria-current={$page.url.pathname.startsWith('/profile') ? 'page' : undefined}>
				<a href="/profile">Profile</a>
			</li>
			<li aria-current={$page.url.pathname.startsWith('/sweet') ? 'page' : undefined}>
				<a href="/sweet">Sweet</a>
			</li>
			<li aria-current={$page.url.pathname.startsWith('/search') ? 'page' : undefined}>
				<a href="/search">Search</a>
			</li>
		</ul>
	</nav>
</header>
