<template>
    <main class="flex justify-center items-center w-full min-h-screen">
        <article class="flex gap-6 max-w-xs mx-auto">
            <header class="flex flex-col justify-between">
                <div class="flex flex-col items-end gap-1">
                    <small class="text-gray-400 text-sm font-light">
                        Nendoroid: {{ id }}
                    </small>
                    <h1 class="text-5xl text-gray-600">{{ name }}</h1>
                </div>
                <div class="relative">
                    <p class="text-right text-gray-500 font-light">
                        {{ license.from }}
                    </p>
                    <h4
                        class="z-[-10] text-[24em] absolute bottom-[-6rem] left-[-18rem] text-white font-semibold pointer-events-none outline-text"
                    >
                        {{ id }}
                    </h4>
                </div>
            </header>
            <img
                :src="cover"
                alt="{{ name }} {{ type }}"
                class="z-10 rounded-2xl shadow-2xl object-fit object-contain"
            />
        </article>
    </main>
</template>

<script lang="ts" setup>
import { api } from 'libs'

const { data, error } = await api.nendoroid.skadi.get()

if (error) throw error

const { id, name, cover, type, license } = data
</script>

<style>
.outline-text {
    text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
        1px 1px 0 #000;
}
</style>
