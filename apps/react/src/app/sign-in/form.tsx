'use client'

import type { FormEvent } from 'react'

import Link from 'next/link'

import { useForm } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import { z, ZodError, type ZodIssue } from 'zod'

import { api } from 'libs'

const signInSchema = z.object({
    username: z.string().min(5),
    password: z.string().min(5)
})

type SignInSchema = z.infer<typeof signInSchema>

const formatError = ({ path, message }: ZodIssue) =>
    `${path} ${message.slice(message.indexOf(' '))}`

export default function Form() {
    const { register, handleSubmit } = useForm<SignInSchema>()
    const {
        mutate,
        isLoading,
        error,
        data: user
    } = useMutation<SignInSchema, Error | ZodError, SignInSchema>((data) =>
        api.signIn.POST(signInSchema.parse(data))
    )

    if (user)
        return (
            <main className="flex flex-col justify-center max-w-xs m-auto min-h-screen gap-6">
                <p className="text-center text-2xl font-light text-gray-500">
                    Welcome back,{' '}
                    <span className="text-gray-700 font-normal">
                        {user?.username ?? 'User'}
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
                    id="username"
                    placeholder="username"
                    className="text-lg bg-gray-100 rounded px-3 py-1.5"
                    required
                    {...register('username')}
                />
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="password" className="text-sm text-gray-400">
                    Password
                </label>
                <input
                    id="password"
                    type="password"
                    placeholder="password"
                    className="text-lg bg-gray-100 rounded px-3 py-1.5"
                    required
                    {...register('password')}
                />
            </div>

            {error && (
                <p className="text-red-500">
                    {error instanceof ZodError
                        ? formatError(error.errors[0])
                        : error.message}
                </p>
            )}

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
