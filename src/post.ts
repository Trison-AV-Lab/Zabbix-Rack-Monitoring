import axios from 'axios';

const API_url = 'http://20.229.182.95:9080//api_jsonrpc.php';
const PRO_API_url = 'http://localhost/api_jsonrpc.php';

const post = {
    login: () => {
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
    },
    getHosts: (token: string) => {
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
}

export default post;