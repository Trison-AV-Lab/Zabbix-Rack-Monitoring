<script lang="ts" context="module">
	import { page } from '$app/stores';
	import trison from '$lib/images/trison.png';
	import customer from '$lib/images/RR.svg';
	import zabbix from '$lib/images/zabbix.svg';
</script>
<div id="zabbix-icon">
	<img src={zabbix} alt="zabbix-icon">
</div>
<header id="header">
	<div class="space" />
	<div class="corner">
		<a href="http://localhost/zabbix">
			<img src={trison} alt="Trison-Logo" />
		</a>
	</div>
	<nav id="nav-links">
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z" />
		</svg>
		<ul id="nav-list">
			<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
				<a href="/">Alerts</a>
			</li>
			<li aria-current={$page.url.pathname === '/devices' ? 'page' : undefined}>
				<a href="/devices">Devices</a>
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
	#zabbix-icon {
		position: absolute;
		top: 0;
		right: 0;
	}
	#zabbix-icon img {
		height: 3vh;
	}
	#header {
		display: flex;
		justify-content: space-between;
		margin-bottom: 5vh;
	}
	.space {
		width: 1em;
		height: 1em;
	}
	.corner {
		height: 20vh;
		width: 20vh;
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
		width: 1.3em;
		height: 2em;
		display: inline;
		z-index: -1;
	}
	path {
		fill: var(--color-bg-2);
	}
	#nav-list {
		position: relative;
		padding: 0;
		margin: 0;
		height: 2em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background: var(--color-bg-2);
		background-size: contain;

	}
	#nav-list li {
		position: relative;
		height: 100%;
	}
	#nav-list li :nth-child(2) {
		border-left: 1px dashed var(--optional-color-5a);
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
		padding: 0 2vw;
		color: var(--optional-color-5a);
		font-weight: 700;
		font-size: 0.7rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: color 0.2s linear;
		font-family: var(--primary-font);
	}
</style>
