<script lang="ts" caches="false">
	//#region Module imports
	import HostCard from './HostCard.svelte';
	import HostInfo from './HostInfo.svelte';
	//#endregion
	//#region Function imports
	import ZabbixApiPost from '../post';
	import { get_deviceCounters, get_filteredHostsByGroup, catch_error } from './utils';
	//#endregion
	//#region Type imports
	import type { ZabbixHost, ApiLoadedData } from '../types';
	//#endregion
	const PRE_APIKEY: string = '712d00c487267e61984018e1528fa4b735819c9666a3d2cf3d628eee66a1185b';
	//#region Variables
	let currentHost: ZabbixHost;
	let shallShowModal: boolean = false;
	let loadedData: ApiLoadedData = {
		hosts: [],
		groups: [],
		counters: {
			total: 0,
			available: 0,
			unavailable: 0
		}
	};
	//#endregion
	ZabbixApiPost.login().then((_response) => {
		//let auth = _response.data.result; //Use this on production environment
		ZabbixApiPost.getHosts(PRE_APIKEY).then((response) => {
				loadedData.hosts = response.data.result;
				loadedData.counters = get_deviceCounters(response.data.result);
			}).catch(catch_error);
		ZabbixApiPost.getHostGroups(PRE_APIKEY)
			.then((response) => {
				loadedData.groups = response.data.result;
			}).catch(catch_error);
	}).catch(catch_error);
	//#region Event handlers
	function on__hostCardClicked(host: ZabbixHost): void {
		shallShowModal = true;
		currentHost = host;
	}

	function on__selectOptionChanged(): void {
		let select: HTMLSelectElement = document.getElementById('group-selector') as HTMLSelectElement;
		let selected: string = select!.options[select.selectedIndex].value;
		if(selected == 'all'){
			ZabbixApiPost.getHosts(PRE_APIKEY)
			.then((response) => {
				loadedData.hosts = response.data.result;
				loadedData.counters = get_deviceCounters(loadedData.hosts);
			})
			.catch((error) => {
				console.log('error:', error);
			});
		}else{
			ZabbixApiPost.getHosts(PRE_APIKEY)
			.then((response) => {
				loadedData.hosts = get_filteredHostsByGroup(response.data.result, selected);
				loadedData.counters = get_deviceCounters(loadedData.hosts);
			})
			.catch((error) => {
				console.log('error:', error);
			});
		}
	}
	//#endregion
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
	#head-data {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem;
	}
	#select-filter-hostgroup {
		display: flex;
		align-items: center;
		font-family: var(--primary-font);
		letter-spacing: 0.1rem;
	}
	#group-selector {
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		background: transparent;
		border: none;
		border-bottom: 1px solid var(--optional-color-5a);
		color: var(--optional-color-5a);
		font-family: var(--primary-font);
		font-size: 1rem;
		font-weight: 600;
		letter-spacing: 0.1rem;
		margin-left: 0.5rem;
		background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><path fill='%23fff' d='M7 10l5 5 5-5z'/><path fill='none' d='M0 0h24v24H0z'/></svg>");
		background-repeat: no-repeat;
		background-position: right 0.5rem top 50%;
		background-size: 1.5rem;
		text-align: center;
		text-align-last: center;
	}
	#device-count {
		font-size: 1rem;
		font-weight: 600;
		font-family: var(--primary-font);
	}
	#status-count {
		display: flex;
	}
	#status-count span {
		display: flex;
		align-items: center;
		font-size: 1rem;
		font-weight: 600;
		text-align: center;
		padding: 0.5rem 0.5rem;
		font-family: var(--primary-font);
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
