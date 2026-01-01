<script lang="ts">
    import { ArrowSquareOut } from "phosphor-svelte";
    import Logo from "$lib/icons/Logo.svelte";
</script>

<div class="flex justify-center w-dvw">
    <div class="flex justify-center items-center flex-col w-7/8 max-w-lg">
        <div
            class="mt-4 font-fira-sans font-light flex w-full h-24 items-center justify-between"
        >
            <div>
                <Logo class="size-8"/>
            </div>
            <div class="flex flex-row">
                <button class="mr-4 hover:underline">about</button>
                <button class="flex items-center gap-2 hover:underline">
                    launch
                    <ArrowSquareOut/>
                </button>
            </div>
        </div>
        <div class="mt-8 font-montserrat w-full">
            <h1 class="font-thin text-5xl">shiitake</h1>
            <h2 class="mt-4 font-thin text-3xl text-gray-500">
                experimental sandbox for music
            </h2>
        </div>
        <div class="mt-16 w-full h-64 border-[0.5px] border-gray-500"></div>
        <div class="mt-16 font-fira-sans font-light text-gray-500 w-full">
            <p class="font-regular text-lg">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum
            </p>
        </div>
    </div>
</div>
