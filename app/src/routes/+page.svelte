<script lang="ts">
    import { init } from "$lib/audio/index.ts";

    let api = null;

    async function run() {
        const ret = await init();
        api = ret.api;
    }

    function playA() {
        api.playFrequency(440);
    }

    function playB() {
        api.playFrequency(493.88);
    }

    function playC() {
        api.playFrequency(523.25);
    }

    function playD() {
        api.playFrequency(587.33);
    }

    function playE() {
        api.playFrequency(659.25);
    }

    function playF() {
        api.playFrequency(698.46);
    }

    function playG() {
        api.playFrequency(783.99);
    }
</script>

<button onclick={run}>Run</button>

<button class="bg-red-300 size-8" onclick={playA}>A</button>
<button class="bg-yellow-300 size-8" onclick={playB}>B</button>
<button class="bg-orange-300 size-8" onclick={playC}>C</button>
<button class="bg-green-300 size-8" onclick={playD}>D</button>
<button class="bg-blue-300 size-8" onclick={playE}>E</button>
<button class="bg-purple-300 size-8" onclick={playF}>F</button>
<button class="bg-violet-300 size-8" onclick={playG}>G</button>
