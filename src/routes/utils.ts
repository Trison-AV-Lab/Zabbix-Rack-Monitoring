import type { ZabbixHost, HostItem, DeviceCounters } from 'src/types';

function get_deviceCounters(hosts: Array<ZabbixHost>): DeviceCounters {
	return {
		total: hosts.length,
		available: hosts.filter((host) => check_pingStatus(host, '1').length > 0).length,
		unavailable: hosts.filter((host) => check_pingStatus(host, '0').length > 0).length
	};
}
function get_filteredHostsByGroup(hosts: Array<ZabbixHost>, groupName: string): Array<ZabbixHost> {
	const filteredHosts: Array<ZabbixHost> = [];
	hosts.forEach((host) => {
		host.groups.forEach((group) => {
			if (group.name === groupName) {
				filteredHosts.push(host);
			}
		});
	});
	return filteredHosts;
}
function catch_error(error: Error) {
	console.log(error);
}
export { get_deviceCounters, get_filteredHostsByGroup, catch_error };

//#region Auxiliary functions
function check_pingStatus(host: ZabbixHost, condition: string): Array<HostItem> {
	return host.items.filter(
		(item) =>
			(item.name === 'Zabbix agent ping' && item.lastvalue === condition) ||
			(item.name === 'ICMP ping' && item.lastvalue === condition)
	);
}
//#endregion
