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
	@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');

	.host {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: left;
		width: 280px;
		height: 20px;
		margin: 10px;
		padding: 20px;
		border: 1px solid var(--color-theme-1);
		border-radius: 10px;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
		cursor: pointer;
		background-color: var(--color-bg-1);
	}

	.host-name {
		font-size: 12px;
		font-weight: 700;
	}

	.status {
		font-size: 14px;
	}

	.offline {
		color: red;
	}

	.online {
		color: green;
	}

	.unknown {
		color: gray;
	}

</style>
