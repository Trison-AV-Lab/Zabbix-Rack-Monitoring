<script lang="ts">
	import type { HostType } from '../types';
	export let host: HostType;
</script>

<section id="host-card">
	<div id="host-name">
		{host.name}
	</div>
	<div id="status-section">
		{#each host.items as item}
			{#if item.name === 'Zabbix agent ping'}
				{#if item.lastvalue === '0'}
					Network Status: <span class="offline">Offline</span>
				{:else if item.lastvalue === '1'}
					Network Status: <span class="online">Online</span>
				{:else}
					Network Status: <span class="unknown">{item.lastvalue}</span>
				{/if}
			{/if}
		{/each}
		{#if host.items.filter((item) => item.name === 'Zabbix agent ping').length === 0}
			Network Status: <span class="unknown">Unknown</span>
		{/if}
	</div>
	<div id="device-icon"></div>
	<div id="host-groups">
		{#each host.groups as group}
			<div class="group">
				{group.name}
			</div>
		{/each}
	</div>
</section>

<style>
	#host-card {
		width: 28vw;
		height: 8vh;
		background: radial-gradient(
			circle,
			var(--optional-color-4a) 0%,
			var(--optional-color-4) 100%
		);
		border-radius: 10px;
		box-shadow: 0px 0px 6px var(--shadow-color);
		padding: 8px;
		margin: 8px;
	}
	#host-name {
		font-size: 0.8rem;
		font-weight: 600;
		font-family: var(--primary-font);
		color: var(--optional-color-1a);
		text-align: center;
	}
	#status-section {
		font-size: 0.8rem;
		font-weight: 600;
		font-family: var(--primary-font);
		color: var(--optional-color-1a);
	}

</style>
