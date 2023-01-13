<script lang="ts">
	import HostCard from './HostCard.svelte';
	import HostInfo from './HostInfo.svelte';
	import ApiPost from '../post';

	import type { ZabbixHost, ApiLoadedData } from '../types';
	import { get_deviceCounters, get_filteredHostsByGroup } from './utils';

	const PRE_APIKEY: string = '712d00c487267e61984018e1528fa4b735819c9666a3d2cf3d628eee66a1185b';

	let loadedData: ApiLoadedData = {
		hosts: [],
		groups: [],
		counters: {
			total: 0,
			available: 0,
			unavailable: 0
		}
	};
	let shallShowModal: boolean = false;
	let currentHost: ZabbixHost;
	ApiPost.login().then((_response) => {
		//let auth = response.data.result; //Use this on production environment
		ApiPost.getHosts(PRE_APIKEY)
			.then((response) => {
				loadedData.hosts = response.data.result;
				loadedData.counters = get_deviceCounters(response.data.result);
			})
			.catch((error) => {
				console.log('error:', error);
			});
		ApiPost.getHostGroups(PRE_APIKEY)
			.then((response) => {
				loadedData.groups = response.data.result;
			})
	});

	function on__hostCardClicked(host: ZabbixHost): void {
		shallShowModal = true;
		currentHost = host;
	}

	function on__selectOptionChanged(): void {
		let select: HTMLSelectElement = document.getElementById('group-selector') as HTMLSelectElement;
		let selected: string = select!.options[select.selectedIndex].value;
		if(selected == 'all'){
			ApiPost.getHosts(PRE_APIKEY)
			.then((response) => {
				loadedData.hosts = response.data.result;
				loadedData.counters = get_deviceCounters(loadedData.hosts);
			})
			.catch((error) => {
				console.log('error:', error);
			});
		}else{
			ApiPost.getHosts(PRE_APIKEY)
			.then((response) => {
				loadedData.hosts = get_filteredHostsByGroup(response.data.result, selected);
				loadedData.counters = get_deviceCounters(loadedData.hosts);
			})
			.catch((error) => {
				console.log('error:', error);
			});
		}
	}

</script>
<svelte:head>
	<meta name="description" content="Trison Zabbix" />
</svelte:head>
<section id="page">
	<div id="modal">
		{#if shallShowModal}
			<HostInfo zabbixHost={currentHost} />
		{/if}
	</div>
	<div id="head-data">
		<div id="device-count">Devices: {loadedData.counters.total}</div>
		<div id="select-filter-hostgroup">
			Filter by group:
			<select id="group-selector" on:change={on__selectOptionChanged}>
				<option value="all">All</option>
				{#each loadedData.groups as group}
					<option value={group.name}>{group.name}</option>
				{/each}
			</select>
		</div>
		<div id="status-count">
			<span class="offline-bg">{loadedData.counters.unavailable}</span>
			<span class="online-bg">{loadedData.counters.available}</span>
		</div>
	</div>
	<div id="hosts">
		{#each loadedData.hosts as host}
			<div class="host" on:click={() => on__hostCardClicked(host)} on:keydown={() => on__hostCardClicked(host)}>
				<HostCard zabbixHost={host} />
			</div>
		{/each}
	</div>
</section>
<style lang="css" scoped>
	#page {
		display: flex;
		flex-direction: column;
	}
	#head-data {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 2rem;
	}
	#select-filter-hostgroup {
		display: flex;
		align-items: center;
	}
	#select-filter-hostgroup select {
		margin-left: 1rem;
	}
	#device-count {
		font-size: 1.5rem;
		font-weight: 600;
	}
	#status-count {
		display: flex;
	}
	#status-count span {
		display: flex;
		align-items: center;
		font-size: 1.2rem;
		font-weight: 600;
		text-align: center;
		padding: 0.5rem 0.5rem;
	}
	#hosts {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		padding: 0 2rem;
	}
	.host {
		width: 30%;
		margin-bottom: 1rem;
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
