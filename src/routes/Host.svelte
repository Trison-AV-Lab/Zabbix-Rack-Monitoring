<script lang="ts">
	export let host: any;
</script>

<section>
	<div class="host">
		<div class="host-name">
			{host.name}
		</div>
		<div class="status">
			{#each host.items as item}
				{#if item.name === 'Zabbix agent ping'}
					{#if item.lastvalue === '0'}
						Status: <span class="offline">Offline</span>
					{:else if item.lastvalue === '1'}
						Status: <span class="online">Online</span>
					{:else}
						Status: <span class="unknown">{item.lastvalue}</span>
					{/if}
				{/if}
			{/each}
		</div>
	</div>
</section>

<style>

</style>
