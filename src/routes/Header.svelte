<script lang="ts" context="module">
	import { page } from '$app/stores';
	import logo from '$lib/images/Zabbix.png';
	import customer from '$lib/images/RR.svg';
</script>

<header id="header">
	<div class="space" />
	<div class="corner">
		<a href="http://localhost/zabbix">
			<img src={logo} alt="Zabbix-Logo" />
		</a>
	</div>
	<nav id="nav-links">
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z" />
		</svg>
		<ul id="nav-list">
			<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
				<a href="/">Dashboard</a>
			</li>
			<li aria-current={$page.url.pathname === '/support' ? 'page' : undefined}>
				<a href="/support">Support</a>
			</li>
		</ul>
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z" />
		</svg>
	</nav>
	<div class="corner">
		<a href="http://localhost/zabbix">
			<img src={customer} alt="logo" />
		</a>
	</div>
	<div class="space" />
</header>

<style lang="css" scoped>
	#header {
		display: flex;
		justify-content: space-between;
		margin: 0;
		padding: 0;
		margin-bottom: 1.3em;
		padding-bottom: 1.8em;
		box-shadow: 0 0 0 1px var(--color-bg-2);
	}
	.space {
		width: 1em;
		height: 1em;
	}
	.corner {
		width: 10em;
		height: 4em;
	}
	.corner a {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 200%;
	}
	.corner img {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}
	#nav-links {
		display: flex;
		justify-content: center;
		--background: var(--color-bg-2);
	}
	svg {
		width: 2em;
		height: 3em;
		display: block;
	}
	path {
		fill: var(--background);
	}
	#nav-list {
		position: relative;
		padding: 0;
		margin: 0;
		height: 3em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background: var(--background);
		background-size: contain;
	}
	#nav-list li {
		position: relative;
		height: 100%;
	}
	#nav-list li[aria-current='page']::before {
		--size: 6px;
		content: '';
		width: 0;
		height: 0;
		position: absolute;
		top: 0;
		left: calc(50% - var(--size));
		border: var(--size) solid transparent;
		border-top: var(--size) solid var(--optional-color-5a);
	}
	#nav-links a {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 0.5rem;
		color: var(--optional-color-5a);
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: color 0.2s linear;
	}
</style>
