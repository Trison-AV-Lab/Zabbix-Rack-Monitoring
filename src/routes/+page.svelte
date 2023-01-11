<script lang="ts">
	/* Modules */
	import Host from './Host.svelte';
	import HostInfo from './HostInfo.svelte';
	/* Types */
	import type { HostType } from '../types';
	/* Functions */
	import postFunctions from '../post';

	const devonly_ApiTokenKey = '712d00c487267e61984018e1528fa4b735819c9666a3d2cf3d628eee66a1185b';

	let hosts: Array<HostType> = [];
	
	postFunctions.login().then((response: any) => {
			//let auth = response.data.result; //Use this on production environment
			postFunctions.getHosts(devonly_ApiTokenKey).then((response) => {
					hosts = response.data.result;
					console.log(hosts);
					devices = {
						count: hosts.length,
						online: hosts.filter(
							(host) =>
								host.items.filter(
									(item) => (item.name === 'Zabbix agent ping' && item.lastvalue === '1') || (item.name === 'ICMP ping' && item.lastvalue === '1')
								).length > 0
						).length,
						offline: hosts.filter(
							(host) =>
								host.items.filter(
									(item) => (item.name === 'Zabbix agent ping' && item.lastvalue === '0') || (item.name === 'ICMP ping' && item.lastvalue === '0')
								).length > 0
						).length
					};
				})
				.catch((error) => {
					console.log('error:', error);
				});
		});

	let shallShowModal = false;
	let currentHost: HostType | null = null;

	function showModal(host: HostType) {
		shallShowModal = true;
		currentHost = host;
	}
	let devices = {
		count: 0,
		online: 0,
		offline: 0
	};
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Trison Zabbix" />
</svelte:head>

<section>
	<div id="modal">
		{#if shallShowModal}
			<HostInfo host={currentHost} />
		{/if}
	</div>
	<div class="head-data">
		<div class="device-count">Devices: {devices.count}</div>
		<div class="status-count">
			<span class="offline-bg">{devices.offline}</span>
			<span class="online-bg">{devices.online}</span>
		</div>
	</div>
	<div class="hosts">
		{#each hosts as host}
			<div class="host" on:click={() => showModal(host)} on:keydown={() => showModal(host)}>
				<Host {host} />
			</div>
		{/each}
	</div>
</section>

<style>
	.head-data {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 2rem;
	}

	.device-count {
		font-size: 1.5rem;
		font-weight: 600;
	}

	.status-count {
		display: flex;
	}
	.status-count span {
		display: flex;
		align-items: center;
		font-size: 1.2rem;
		font-weight: 600;
		text-align: center;
		padding: 0.5rem 0.5rem;
	}

	.hosts {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		padding: 0 2rem;
	}

	#modal {
		position: sticky;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 100;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
