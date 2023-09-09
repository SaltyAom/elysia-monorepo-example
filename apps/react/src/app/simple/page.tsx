import { api } from 'libs'

export default async function Page() {
    const { data, error } = await api.simple.get()

    if (error) return <h1>Error</h1>

    return (
        <main className="flex flex-col justify-center items-center w-full min-h-screen">
            <h1 className="text-4xl">
                {data.id}
            </h1>
        </main>
    )
}
