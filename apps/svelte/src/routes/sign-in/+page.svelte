<script lang="ts">
    import { z, ZodError, type ZodIssue } from 'zod'

    import { page } from '$app/stores'
    import { applyAction, enhance } from '$app/forms'
    import type { ActionData } from './$types'

    const signInSchema = z.object({
        username: z.string().min(5),
        password: z.string().min(5)
    })

    const formatError = ({ path, message }: ZodIssue) =>
        `${path} ${message.slice(message.indexOf(' '))}`

    export let form: ActionData
</script>

{#if form?.success}
    <main class="flex flex-col justify-center max-w-xs m-auto min-h-screen gap-6">
        <p class="text-center text-2xl font-light text-gray-500">
            Welcome back,{' '}
            <span class="text-gray-700 font-normal">
                {form.username}
            </span>
        </p>

        <a
            href="/"
            class="w-full text-center text-lg font-medium text-white py-2 bg-blue-500 rounded"
        >
            Back
        </a>
    </main>
{:else}
    <form
        method="POST"
        use:enhance={({ data, form, cancel }) => {
            const body = {
                username: data.get('username'),
                password: data.get('password')
            }

            try {
                signInSchema.parse(body)
            } catch (error) {
                applyAction({
                    type: 'success',
                    status: 200,
                    data: {
                        ...body,
                        success: false,
                        // @ts-ignore
                        error: formatError(error.issues[0])
                    }
                })
                cancel()
            }
        }}
        class="flex flex-col justify-center max-w-xs m-auto min-h-screen gap-6"
    >
        <div class="flex flex-col gap-1">
            <label for="username" class="text-sm text-gray-400">Username</label>
            <input
                id="username"
                name="username"
                value={form?.username ?? ''}
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
                value={form?.password ?? ''}
                placeholder="password"
                class="text-lg bg-gray-100 rounded px-3 py-1.5"
                required
            />
        </div>

        {#if form?.error}
            <p class="text-red-500">
                {form.error}
            </p>
        {/if}

        <button type="submit" class="text-white text-lg font-medium py-2 bg-blue-500 rounded">
            Sign in
        </button>
    </form>
{/if}
