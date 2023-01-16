<script lang="ts" caches="false" context="module">
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';
	import './styles.css';
</script>

<div>
	<div id="header"><Header /></div>
	<main>
		<slot />
	</main>
	<div id="footer"><Footer /></div>
</div>

<style lang="css" scoped>
	* {
		background-color: var(--color-bg-1);
	}
	#header,
	#footer {
		position: -webkit-sticky;
		position: sticky;
	}
	#header {
		top: 0;
		height: 100px;
	}
	main {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	#footer {
		bottom: 0;
	}
</style>
