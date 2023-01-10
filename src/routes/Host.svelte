<script lang="ts">
	import { serialize } from 'cookie';
	import type { HostType } from '../types';
	export let host: HostType;
</script>

<section id="host-card">
	<div id="host-name">
		{host.name}
	</div>
	<div id="status-section">
		<div class="agent">
			{#each host.items as item}
				{#if item.name === 'Zabbix agent ping'}
					Monitoring:
					{#if item.lastvalue === '0'}
						<span class="offline">Unavailable</span>
					{:else if item.lastvalue === '1'}
						<span class="online">Available</span>
					{:else}
						<span class="unknown">{item.lastvalue}</span>
					{/if}
				{/if}
			{/each}
			{#if host.items.filter((item) => item.name === 'Zabbix agent ping').length === 0}
				Monitoring: <span class="unknown">Unknown</span>
			{/if}
		</div>
		<div class="ping">
			Ping:
			{#if host.active_available === '1'}
				{#if host.items.filter((item) => item.name === 'ICMP ping').length === 0}
					<span class="offline">Offline</span>
				{:else}
					{#each host.items as item}
						{#if item.name === 'ICMP ping'}
							{#if item.lastvalue === '0'}
								<span class="offline">ICMP offline</span>
							{:else if item.lastvalue === '1'}
								<span class="online">ICMP online</span>
							{:else}
								<span class="unknown">{item.lastvalue}</span>
							{/if}
						{/if}
					{/each}
				{/if}
			{:else}
				<span class="online">Online</span>
			{/if}
		</div>
	</div>
	<div class="foots">
		<div id="host-groups">
			{#each host.groups as group}
				{#if group.name !== 'Discovered hosts'}
					<div class="group">
						{group.name}
					</div>
				{/if}
			{/each}
		</div>
	</div>
</section>

<style>
	#host-card {
		width: 28vw;
		height: 12vh;
		background: var(--color-bg-2);
		border-radius: 10px;
		box-shadow: 0px 0px 6px var(--shadow-color);
		padding: 0.6vh 0.3vw;
		margin: 0.6vh 0.6vw;
	}
	#host-name {
		font-weight: 600;
		font-family: var(--primary-font);
		color: var(--primary-color);
		text-align: center;
		border-bottom: 1px solid var(--color-bg-0);
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		font-size: small;
	}
	#status-section {
		font-size: 0.8rem;
		font-weight: 600;
		font-family: var(--primary-font);
		color: var(--secondary-color);
		margin-top: 0.5vh;
		/*space between*/
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
	.online,
	.offline,
	.unknown {
		font-weight: 600;
		font-family: var(--primary-font);
		text-shadow: 1px 0 var(--color-bg-2), -1px 0 var(--color-bg-2), 0 1px var(--color-bg-2),
			0 -1px var(--color-bg-2), 1px 1px var(--color-bg-2), -1px -1px 0 var(--color-bg-2),
			1px -1px 0 var(--color-bg-2), -1px 1px 0 var(--color-bg-2);
	}
	#host-groups {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		margin-top: 1.5vh;
	}
	.group {
		background: var(--secondary-color);
		border-radius: 5px;
		padding: 0.2vh 0.5vw;
		margin: 0 0.2vw;
		color: var(--color-bg-2);
		font-family: var(--primary-font);
		font-weight: 300;
		font-size: 0.7rem;
	}

	.agent {
		margin-left: 1vw;
	}
	.ping {
		margin-right: 1vw;
	}
</style>
