<script>
	import { page } from '$app/stores';
	import logo from '$lib/images/Zabbix.png';
	import customer from '$lib/images/RR.svg';
</script>

<header>
	<div class="space" />
	<div class="corner">
		<a href="http://localhost/zabbix">
			<img src={logo} alt="Zabbix" />
		</a>
	</div>
	<nav>
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z" />
		</svg>
		<ul>
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

<style>
	header {
		display: flex;
		justify-content: space-between;
		padding-bottom: 5vh;
	}
	.corner {
		height: 20vh;
	}
	.corner img {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}
	nav {
		display: flex;
		justify-content: center;
		--background: var(--color-bg-2);
	}
	svg {
		width: 2.7vw;
		height: 7vh;
		display: inline;
	}
	path {
		fill: var(--background);
	}
	ul {
		position: relative;
		padding: 0;
		margin: 0;
		height: 7vh;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background: var(--background);
		background-size: contain;
	}
	li {
		position: relative;
		height: 100%;
	}
	li[aria-current='page']::before {
		--size: 6px;
		content: '';
		width: 0;
		height: 0;
		position: absolute;
		top: 0;
		left: calc(50% - var(--size));
		border: var(--size) solid transparent;
		border-top: var(--size) solid var(--optional-color-5);
	}
	nav a {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 2vw;
		color: var(--optional-color-4a);
		font-weight: 700;
		font-size: 0.7rem;
		text-transform: uppercase;
		letter-spacing: 0.2em;
		text-decoration: none;
		transition: color 0.2s linear;
	}
	a:hover {
		color: var(--optional-color-4);
	}
</style>
