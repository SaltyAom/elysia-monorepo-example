import { api } from 'libs'

export default async function Page() {
    const { data, error } = await api.nendoroid.skadi.get()

    if (error) return <h1>Something went wrong</h1>

    const { id, name, cover, type, license } = data

    return (
        <main className="flex justify-center items-center w-full min-h-screen">
            <article className="flex gap-6 max-w-xs mx-auto">
                <header className="flex flex-col justify-between">
                    <div className="flex flex-col items-end gap-1">
                        <small className="text-gray-400 text-sm font-light">
                            Nendoroid: {id}
                        </small>
                        <h1 className="text-5xl text-gray-600">{name}</h1>
                    </div>
                    <div className="relative">
                        <p className="text-right text-gray-500 font-light">
                            {license.from}
                        </p>
                        <h4
                            className="z-[-10] text-[24em] absolute bottom-[-6rem] left-[-18rem] text-white font-semibold pointer-events-none"
                            style={{
                                textShadow: `
                                -1px -1px 0 #000,
                                1px -1px 0 #000,
                                -1px 1px 0 #000,
                                1px 1px 0 #000`
                            }}
                        >
                            {id}
                        </h4>
                    </div>
                </header>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={cover}
                    alt={`${name} ${type}`}
                    className="z-10 rounded-2xl drop-shadow-2xl object-fit object-contain"
                />
            </article>
        </main>
    )
}
