<template>
    <main
        v-if="result && result?.data !== null"
        class="flex flex-col justify-center max-w-xs m-auto min-h-screen gap-6"
    >
        <p class="text-center text-2xl font-light text-gray-500">
            Welcome back,
            <span class="text-gray-700 font-normal">
                {{ result!.data.username }}
            </span>
        </p>

        <a
            href="/"
            class="w-full text-center text-lg font-medium text-white py-2 bg-blue-500 rounded"
        >
            Back
        </a>
    </main>
    <form
        v-else
        method="POST"
        class="flex flex-col justify-center max-w-xs m-auto min-h-screen gap-6"
        @submit.prevent="signIn"
    >
        <div class="flex flex-col gap-1">
            <label for="username" class="text-sm text-gray-400">Username</label>
            <input
                id="username"
                name="username"
                v-model="form.username"
                placeholder="username"
                class="text-lg bg-gray-100 rounded px-3 py-1.5"
                required
            />
        </div>

        <div class="flex flex-col gap-1">
            <label for="password" class="text-sm text-gray-400">Password</label>
            <input
                id="password"
                name="password"
                type="password"
                v-model="form.password"
                placeholder="password"
                class="text-lg bg-gray-100 rounded px-3 py-1.5"
                required
            />
        </div>

        <p v-if="error" class="text-red-500">
            {{ error }}
        </p>
        <p v-if="result?.error" class="text-red-500">
            {{ result.error }}
        </p>

        <button
            type="submit"
            class="text-white text-lg font-medium py-2 bg-blue-500 rounded"
        >
            Sign in
        </button>
    </form>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import { z, type ZodError, type ZodIssue } from 'zod'
import { api } from 'libs'

const signInSchema = z.object({
    username: z.string().min(5),
    password: z.string().min(5)
})

const formatError = ({ path, message }: ZodIssue) =>
    `${path} ${message.slice(message.indexOf(' '))}`

const result = ref<Awaited<ReturnType<(typeof api)['sign-in']['post']>> | null>(
    null
)

const form = ref({
    username: '',
    password: ''
})
const error = ref('')

const signIn = async () => {
    try {
        result.value = await api['sign-in'].post(signInSchema.parse(form.value))
    } catch (err) {
        error.value = formatError((err as ZodError).issues[0])
    }
}
</script>
