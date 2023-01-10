<script lang="ts">
    export let host: any;
</script>
<section>
    <button class="btn-link btn" on:click={() => window.location.reload()}>X</button>
    <h1>{host.name}</h1>
    <div class="host-ping">
        {#each host.items as item}
            {#if item.name === 'Zabbix agent ping'}
                {#if item.lastvalue === '0'}
                    Status: <span class="offline">Offline</span>
                {:else if item.lastvalue === '1'}
                    Status: <span class="online">Online</span>
                {:else}
                    Status: <span class="unknown">{item.lastvalue}</span>
                {/if}
            {/if}
        {/each}
    </div>
    <div class="host-uptime">
        {#each host.items as item}
            {#if item.name === 'Uptime'}
                Uptime: {item.lastvalue}s
            {/if}
        {/each}
    </div>
    <div class="host-memory">
        {#each host.items as item}
            {#if item.name === 'Memory utilization'}
                Memory usage: {item.lastvalue.slice(0,4)}%
            {/if}
        {/each}
    </div>
    <div class="host-cpu">
        {#each host.items as item}
            {#if item.name === 'CPU utilization'}
                CPU usage: {item.lastvalue.slice(0,4)}%
            {/if}
        {/each}
    </div>
    <div class="host-disk">
        {#each host.items as item}
            {#if item.name.includes('Space utilization')}
                Disk space usage: {item.lastvalue.slice(0,4)}%
            {/if}
        {/each}
    </div>
    <div class="OS">
        {#each host.items as item}
            {#if item.name === 'Operating system'}
                {item.lastvalue.split(' ')[0]}
            {/if}
        {/each}
    </div>
    <div class="Screen resolution">
        {#each host.items as item}
            {#if item.name === 'Screen resolution'}
                {item.lastvalue}
            {/if}
        {/each}
    </div>

</section>
<style>
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');
    section {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 600px;
        height: 350px;
        margin: 10px;
        padding: 20px;
        border: 1px solid var(--color-theme-2);
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        background-color: var(--color-bg-2);
    }


    h1 {
        font-family: 'Montserrat', sans-serif;
        font-size: 18px;
        font-weight: 700;
        color: var(--color-theme-1);
    }
    .host-ping {
        font-family: 'Montserrat', sans-serif;
        font-size: 14px;
        font-weight: 700;
        color: var(--color-theme-1);
    }
    .host-uptime {
        font-family: 'Montserrat', sans-serif;
        font-size: 14px;
        font-weight: 700;
        color: var(--color-theme-1);
    }
    .host-memory {
        font-family: 'Montserrat', sans-serif;
        font-size: 14px;
        font-weight: 700;
        color: var(--color-theme-1);
    }
    .host-cpu {
        font-family: 'Montserrat', sans-serif;
        font-size: 14px;
        font-weight: 700;
        color: var(--color-theme-1);
    }

    .host-disk {
        font-family: 'Montserrat', sans-serif;
        font-size: 14px;
        font-weight: 700;
        color: var(--color-theme-1);
    }

    .OS {
        font-family: 'Montserrat', sans-serif;
        font-size: 14px;
        font-weight: 700;
        color: var(--color-theme-1);
    }

    .offline {
        color: var(--offline);
    }
    .online {
        color: var(--online);
    }
    .unknown {
        color: var(--unknown);
    }

    button {
        position: absolute;
        top: 20px;
        right: 370px;
        border-radius: 10px;
    }
</style>