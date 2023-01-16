import axios from 'axios';
import type { PostMethods, PostResponse } from './types';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _PRO_API_url = 'http://20.229.182.95:9080//api_jsonrpc.php';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PRO_API_url = 'http://127.0.0.1/zabbix/api_jsonrpc.php';

function login(): PostResponse {
	const response = axios.post(PRO_API_url, {
		jsonrpc: '2.0',
		method: 'user.login',
		params: {
			user: 'Admin',
			password: 'zabbix'
		},
		id: 1,
		auth: null
	});
	console.log("Login response: ", response);
	return response;
}

function getHosts(token: string): PostResponse {
	const response = axios.post(PRO_API_url, {
		jsonrpc: '2.0',
		method: 'host.get',
		params: {
			output: ['active_available', 'name'],
			selectInterfaces: ['ip'],
			selectItems: ['name', 'lastvalue'],
			selectGroups: ['name']
		},
		auth: token,
		id: 1
	});
	console.log("Hosts response: ", response);
	return response;
}

function getHostGroups(token: string): PostResponse {
	const response = axios.post(PRO_API_url, {
		jsonrpc: '2.0',
		method: 'hostgroup.get',
		params: {
			output: ['name']
		},
		auth: token,
		id: 1
	});
	console.log("HostGroups response: ", response);
	return response;
}

const post: PostMethods = {
	login: login,
	getHosts: getHosts,
	getHostGroups: getHostGroups
};

export { login, getHosts, getHostGroups };
export default post;
