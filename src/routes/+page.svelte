<script lang="ts">
	import HostCard from './HostCard.svelte';
	import HostInfo from './HostInfo.svelte';
	import ZabbixAPI from '../post';

	import { getDevicesCount } from './utils';

	import type { ZabbixHost, DeviceCounters } from '../types';

	const PRE_APIKEY: string = '712d00c487267e61984018e1528fa4b735819c9666a3d2cf3d628eee66a1185b';

	let loadedHosts: Array<ZabbixHost> = [];
	let shallShowModal: boolean = false;
	let currentHost: ZabbixHost = {
		name: '',
		active_available: '',
		interfaces: [],
		items: [],
		groups: []
	};
	let devices: DeviceCounters = {
		total: 0,
		available: 0,
		unavailable: 0
	};
	ZabbixAPI.login().then((_response) => {
		//let auth = response.data.result; //Use this on production environment
		ZabbixAPI.getHosts(PRE_APIKEY)
			.then((response) => {
				loadedHosts = response.data.result;
				devices = getDevicesCount(loadedHosts);
			})
			.catch((error) => {
				console.log('error:', error);
			});
	});

	function showModal(host: ZabbixHost) {
		shallShowModal = true;
		currentHost = host;
	}
</script>

<svelte:head>
	<meta name="description" content="Trison Zabbix" />
</svelte:head>

<section>
	<div id="modal">
		{#if shallShowModal}
			<HostInfo zabbixHost={currentHost} />
		{/if}
	</div>
	<div class="head-data">
		<div class="device-count">Devices: {devices.total}</div>
		<div class="status-count">
			<span class="offline-bg">{devices.unavailable}</span>
			<span class="online-bg">{devices.available}</span>
		</div>
	</div>
	<div class="hosts">
		{#each loadedHosts as host}
			<div class="host" on:click={() => showModal(host)} on:keydown={() => showModal(host)}>
				<HostCard zabbixHost={host} />
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
