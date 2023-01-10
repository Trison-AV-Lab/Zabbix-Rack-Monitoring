<script lang="ts">
	import axios from 'axios';
	import Host from './Host.svelte';
	import HostInfo from './HostInfo.svelte';
	import type { HostType } from '../types';

	const zabbixApiUrl = 'http://20.229.182.95:9080//api_jsonrpc.php';
	const devonly_ApiTokenKey = '712d00c487267e61984018e1528fa4b735819c9666a3d2cf3d628eee66a1185b';

	let hosts: Array<HostType> = [];

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
			//let auth = response.data.result; //Use this on production environment
			axios
				.post(zabbixApiUrl, {
					jsonrpc: '2.0',
					method: 'host.get',
					params: {
						output: ['active_available', 'name'],
						selectInterfaces: ['ip'],
						selectItems: ['name', 'lastvalue'],
						selectGroups: ['name'],
					},
					auth: devonly_ApiTokenKey /*auth*/,
					id: 1
				})
				.then((response) => {
					hosts = response.data.result;
					devices = {
						count: hosts.length,
						online: hosts.filter(
							(host) =>
								host.items.filter(
									(item) => item.name === 'Zabbix agent ping' && item.lastvalue === '1'
								).length > 0
						).length,
						offline: hosts.filter(
							(host) =>
								host.items.filter(
									(item) => item.name === 'Zabbix agent ping' && item.lastvalue === '0'
								).length > 0
						).length
					};
					console.log('Hosts:', hosts);
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
