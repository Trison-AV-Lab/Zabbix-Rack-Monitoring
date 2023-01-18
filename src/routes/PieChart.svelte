<script lang="ts">

    import type { DeviceCounters } from "src/types";
	import { onMount } from "svelte";

    export let devices: DeviceCounters;

    let onlinePercentage = Math.round((devices.available / devices.total) * 100);
    let offlinePercentage = Math.round((devices.unavailable / devices.total) * 100);
    let onlineColor = "#a7c957";
    let offlineColor = "#e63946";

    console.log(onlinePercentage, offlinePercentage);

    onMount(() => {
        let clickRedirect = document.getElementById("click-redirect-root");
        clickRedirect!.addEventListener("click", () => {
            window.location.href = "/#/";
        });
    });

</script>

<div id="chart">
    <svg viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="15" fill="transparent" stroke-width="30" stroke={offlineColor} id="click-redirect-root" /> 
        <circle cx="16" cy="16" r="15" fill="transparent" stroke-width="30" stroke={onlineColor} stroke-dasharray={onlinePercentage + " " + offlinePercentage} />
    </svg>
    <div id="legend">
            <div class="online_"></div><div class="online_text">{devices.available}</div>
            <div class="offline_"></div><div class="offline_text">{devices.unavailable}</div>
    </div>
</div>


<style>
    #chart {
        width: 20%;
        height: 20%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    #chart svg {
        width: 70%;
        height: 70%;
        border-radius: 50%;
    }

    #chart svg circle {
        transition: stroke-dasharray 1s ease;
    }

    #legend {
        display: grid;
        grid-template-columns: 1fr 1fr;
        padding: 1em;
        font-size: 1em;
    }

    .online_ {
        background-color: var(--online-color);
        color: var(--color-bg-2);
        font-size: 0.5rem;
        padding: 0.2rem;
        margin-left: 5px;
        margin-right: 5px;
        border-radius: 20%;
        width: 1em;
        height: 1em;
        border: 1px dashed black;
    }

    .offline_ {
        background-color: var(--offline-color);
        color: var(--color-bg-2);
        font-size: 0.5rem;
        padding: 0.2rem;
        margin-left: 5px;
        margin-right: 5px;
        border-radius: 20%;
        width: 1em;
        height: 1em;
        border: 1px dashed black;
    }
</style>