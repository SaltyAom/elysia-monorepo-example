'use client'

import Link from 'next/link'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from 'react-query'
import { z } from 'zod'

import { api } from 'libs'
import { useEffect } from 'react'

const signInSchema = z.object({
    username: z.string().min(5),
    password: z.string().min(5)
})

type SignInSchema = z.infer<typeof signInSchema>

export default function Form() {
    const {
        register,
        handleSubmit,
        formState: { errors: formError }
    } = useForm<SignInSchema>({
        resolver: zodResolver(signInSchema)
    })

    const {
        mutate,
        isLoading,
        data: fetched
    } = useMutation(api['sign-in'].post)

    if (fetched?.data) {
        const {
            data: { username }
        } = fetched

        return (
            <main className="flex flex-col justify-center max-w-xs m-auto min-h-screen gap-6">
                <p className="text-center text-2xl font-light text-gray-500">
                    Welcome back,{' '}
                    <span className="text-gray-700 font-normal">
                        {username ?? 'User'}
                    </span>
                </p>

                <Link
                    href="/"
                    className="w-full text-center text-lg font-medium text-white py-2 bg-blue-500 rounded"
                >
                    Back
                </Link>
            </main>
        )
    }

    return (
        <form
            className="flex flex-col justify-center max-w-xs m-auto min-h-screen gap-6"
            onSubmit={handleSubmit((data) => mutate(data))}
        >
            <div className="flex flex-col gap-1">
                <label htmlFor="username" className="text-sm text-gray-400">
                    Username
                </label>
                <input
                    required
                    id="username"
                    placeholder="username"
                    className="text-lg bg-gray-100 rounded px-3 py-1.5"
                    min={5}
                    {...register('username')}
                />
                {formError.username && (
                    <p className="text-red-500">
                        {formError.username?.message}
                    </p>
                )}
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="password" className="text-sm text-gray-400">
                    Password
                </label>
                <input
                    required
                    id="password"
                    type="password"
                    placeholder="password"
                    className="text-lg bg-gray-100 rounded px-3 py-1.5"
                    min={5}
                    {...register('password')}
                />
                {formError.password && (
                    <p className="text-red-500">
                        {formError.password?.message}
                    </p>
                )}
            </div>

            <>
                {fetched?.error && (
                    <p className="text-red-500">{fetched.error.value.error}</p>
                )}
            </>

            <button
                disabled={isLoading}
                type="submit"
                className="text-white text-lg font-medium py-2 bg-blue-500 rounded"
            >
                Sign in
            </button>
        </form>
    )
}
