<script lang="ts" caches="false" context="module">
	import Header from './Header.svelte';
	import './styles.css';
</script>

<div class="app">
	<div class="header"><Header /></div>
	<main>
		<div id="main" class="blur-bg" />
		<slot />
	</main>
	<footer>
		<p>AV Monitoring Dashboard by <a href="/support"> TRISON </a></p>
	</footer>
</div>

<style>
	.header {
		position: sticky;
		top: 0;
		width: 100%;
		height: 100px;
		background-color: var(--color-bg-1);
	}
	main {
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: var(--color-bg-1);
	}
	.blur-bg {
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		top: 100px;
		left: 0;
		width: 100%;
		height: 100%;
		background-repeat: no-repeat;
		background-position-x: center;
		background-size: 50%;
		filter: blur(4px);
		z-index: -1;
	}
	footer {
		position: sticky;
		bottom: 0;
		width: 100%;
		height: 20px;
		background-color: var(--color-bg-1);
		display: flex;
		justify-content: center;
		align-items: center;
		font-family: 'Montserrat', sans-serif;
	}
	footer p {
		font-size: 0.8rem;
		font-weight: 400;
		letter-spacing: 3px;
	}
	footer a {
		color: var(--color-theme-1);
		font-weight: 700;
	}
</style>
