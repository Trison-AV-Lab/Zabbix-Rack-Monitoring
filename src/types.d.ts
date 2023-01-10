export type HostType = {
    name: string;
    active_available: string;
    interfaces: Array<IPType>;
    items: Array<ItemType>;
    groups: Array<GroupType>;
};

export type ItemType = {
    name: string;
    lastvalue: string;
};

export type GroupType = {
    name: string;
};

export type IPType = {
    ip: string;
}