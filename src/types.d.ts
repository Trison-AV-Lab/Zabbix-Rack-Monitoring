export interface ZabbixHost {
	name: string;
	active_available: string;
	interfaces: Array<HostIP>;
	items: Array<HostItem>;
	groups: Array<HostGroup>;
}

export type HostItem = {
	name: string;
	lastvalue: string;
};

export type HostGroup = {
	name: string;
};

export type HostIP = {
	ip: string;
};

export interface DeviceCounters {
	total: number;
	available: number;
	unavailable: number;
}
export interface ApiLoadedData {
	hosts: Array<ZabbixHost>;
	groups: Array<HostGroup>;
	counters: DeviceCounters;
}

export type PostMethods = {
	login: () => PostResponse;
	getHosts: (token: string) => PostResponse;
	getHostGroups: (token: string) => PostResponse;
};

export type PostResponse = Promise<AxiosResponse<unknown, unknown>>;
