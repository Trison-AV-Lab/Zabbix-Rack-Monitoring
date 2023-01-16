import axios from 'axios';
import type { PostMethods, PostResponse } from './types';

const API_url = 'http://20.229.182.95:9080//api_jsonrpc.php';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PRO_API_url = 'http://localhost/api_jsonrpc.php';

function login(): PostResponse {
	return axios.post(API_url, {
		jsonrpc: '2.0',
		method: 'user.login',
		params: {
			user: 'Admin',
			password: 'zabbix'
		},
		id: 1,
		auth: null
	});
}

function getHosts(token: string): PostResponse {
	return axios.post(API_url, {
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
}

function getHostGroups(token: string): PostResponse {
	return axios.post(API_url, {
		jsonrpc: '2.0',
		method: 'hostgroup.get',
		params: {
			output: ['name']
		},
		auth: token,
		id: 1
	});
}

const post: PostMethods = {
	login: login,
	getHosts: getHosts,
	getHostGroups: getHostGroups
};

export { login, getHosts, getHostGroups };
export default post;
