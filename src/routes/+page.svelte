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
	//#region Variables
	const uninterestedGroups = [
		'Applications',
		'Databases',
		'Discovered hosts',
		'Hypervisors',
		'Linux servers',
		'Virtual machines',
		'Zabbix servers'
	]
	let currentHost: ZabbixHost;
	let shallShowModal = false;
	let loadedData: ApiLoadedData = {
		hosts: [],
		groups: [],
		counters: {
			total: 0,
			available: 0,
			unavailable: 0
		}
	};
	let authToken = '';
	//#endregion
	ZabbixApiPost.login()
		.then((response) => {
			console.log(response);
			authToken = response.data.result; //Use this on production environment
			console.log('authToken:', authToken);
			ZabbixApiPost.getHosts('712d00c487267e61984018e1528fa4b735819c9666a3d2cf3d628eee66a1185b')
				.then((response) => {
					console.log('hosts loaded!', response.data.result);
					loadedData.hosts = response.data.result;
					loadedData.hosts = filterOffline(loadedData.hosts);
					loadedData.counters = get_deviceCounters(loadedData.hosts);
				})
				.catch(catch_error);
			ZabbixApiPost.getHostGroups('712d00c487267e61984018e1528fa4b735819c9666a3d2cf3d628eee66a1185b')
				.then((response) => {
					console.log('groups loaded!', response.data.result);
					loadedData.groups = response.data.result;
				})
				.catch(catch_error);
		})
		.catch(catch_error);
	//#region Event handlers
	function on__hostCardClicked(host: ZabbixHost): void {
		shallShowModal = true;
		currentHost = host;
	}

	function on__selectOptionChanged(): void {
		let select: HTMLSelectElement = document.getElementById('group-selector') as HTMLSelectElement;
		let selected: string = select!.options[select.selectedIndex].value;
		if (selected == 'all') {
			ZabbixApiPost.getHosts(authToken)
				.then((response) => {
					loadedData.hosts = response.data.result;
					loadedData.hosts = filterOffline(loadedData.hosts);
					loadedData.counters = get_deviceCounters(loadedData.hosts);
				})
				.catch((error) => {
					console.log('error:', error);
				});
		} else {
			ZabbixApiPost.getHosts(authToken)
				.then((response) => {
					loadedData.hosts = get_filteredHostsByGroup(response.data.result, selected);
					loadedData.counters = get_deviceCounters(loadedData.hosts);
				})
				.catch((error) => {
					console.log('error:', error);
				});
		}
	}
	function filterOffline(hosts: Array<ZabbixHost>): Array<ZabbixHost> {
		let filteredHosts: Array<ZabbixHost> = [];
		hosts.forEach((host) => {
			host.items.forEach((item) => {
				if (item.name === 'Zabbix agent ping' && item.lastvalue === '0') {
					filteredHosts.push(host);
				}
				else if (item.name === 'ICMP ping' && item.lastvalue === '0') {
					filteredHosts.push(host);
				}
			});
		});
		return filteredHosts;
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
		<div id="device-count">Offline Devices: {loadedData.counters.total}</div>
	</div>
	<div id="hosts">
		{#if loadedData.hosts.length === 0}
			<div id="no-hosts">No hosts found</div>
		{:else}
			{#each loadedData.hosts as host}
				<div
					class="host"
					on:click={() => on__hostCardClicked(host)}
					on:keydown={() => on__hostCardClicked(host)}
				>
					<HostCard zabbixHost={host} />
				</div>
			{/each}
		{/if}
	</div>
</section>

<style lang="css" scoped>
	#head-data {
		display: flex;
		justify-content: left;
		align-items: center;
		padding: 1rem;
		margin-top: 2rem;
		margin-bottom: 1rem;
	}
	#device-count {
		font-size: 1rem;
		font-weight: 600;
		font-family: var(--primary-font);
	}
	#hosts {
		/* max of columns 2 */
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		margin-left: 0rem;
		margin-right: 2rem;

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
	@media (max-width: 600px) {
		#hosts {
			justify-content: center;
			margin-left: 6rem;
		}
		#head-data {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			padding: 1rem;
			margin-top: 2rem;
			font-size: 0.6rem;
		}
		#device-count {
			font-size: 0.6rem;
		}
		.host {
			width: 100%;
		}
	}

	@media (min-width: 600px) {
		/* the #host show 2 elements for line */
		#hosts {
			display: grid;
			grid-gap: 10px;
			grid-template-columns: 2fr 300px;
		}
		.host {
			width: 100%;
			padding-left: 5rem;
		}
	}
</style>
