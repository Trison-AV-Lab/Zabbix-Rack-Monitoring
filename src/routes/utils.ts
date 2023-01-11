import type { ZabbixHost, HostItem, DeviceCounters } from 'src/types';

export function getDevicesCount(hosts: Array<ZabbixHost>): DeviceCounters {
	return {
		total: hosts.length,
		available: hosts.filter((host) => getAvailability(host, '1').length > 0).length,
		unavailable: hosts.filter((host) => getAvailability(host, '0').length > 0).length
	};
}
function getAvailability(host: ZabbixHost, condition: string): Array<HostItem> {
	return host.items.filter(
		(item) =>
			(item.name === 'Zabbix agent ping' && item.lastvalue === condition) ||
			(item.name === 'ICMP ping' && item.lastvalue === condition)
	);
}
