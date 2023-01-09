<script lang="ts">
	import axios from 'axios';
	import Host from './Host.svelte';
	import HostInfo from './HostInfo.svelte';
	const zabbixApiUrl = 'http://20.229.182.95:9080//api_jsonrpc.php';

	let hosts: Array<any> = [];

	axios
		.post(zabbixApiUrl, {
			jsonrpc: '2.0',
			method: 'user.login',
			params: {
				user: 'Admin',
				password: 'zabbix'
			},
			id: 1,
			auth: null
		})
		.then((response: any) => {
			let auth = response.data.result;
			axios
				.post(zabbixApiUrl, {
					jsonrpc: '2.0',
					method: 'host.get',
					params: {
						output: ['active_available', 'name'],
						selectInterfaces: ['ip'],
						selectItems: ['name', 'lastvalue'],
						selectTriggers: 'extend',
						selectGraphs: 'extend',
						selectApplications: 'extend',
						selectInventory: 'extend',
						selectHttpTests: 'extend',
						selectDiscoveries: 'extend',
						selectScreens: 'extend',
						selectTags: 'extend',
						selectParentTemplates: 'extend'
					},
					auth: '712d00c487267e61984018e1528fa4b735819c9666a3d2cf3d628eee66a1185b',
					id: 1
				})
				.then((response) => {
					hosts = response.data.result;
					console.log('hosts:', hosts);
				})
				.catch((error) => {
					console.log('error:', error);
				});
		});
		let shallShowModal = false;
		let currentHost: any = null;
		function showModal(host:any) {
			shallShowModal = true;
			currentHost = host;
		}
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
		<div class="device-count">Devices: {hosts.length}</div> <div class="status-count"><span class="unavailable">{hosts.filter((host) => host.items.filter((item) => item.name === 'Zabbix agent ping' && item.lastvalue === '0').length > 0).length}</span> <span class="available">{hosts.filter((host) => host.items.filter((item) => item.name === 'Zabbix agent ping' && item.lastvalue === '1').length > 0).length}</span></div>
	</div>
	<div class="hosts">
		{#each hosts as host}
			<div class="host" on:click={() => showModal(host)} on:keydown={() => showModal(host)}>
				<Host host={host} />
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
		margin-right: 1rem;
	}

	.status-count span::after {
		content: ' ';
		display: inline-block;
		width: 1rem;
		height: 1rem;
		border-radius: 30%;
		margin-left: 0.5rem;
	}

	.status-count .unavailable::after {
		background-color: var(--offline);
	}

	.status-count .available::after {
		background-color: var(--online);
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
