import { error } from '@sveltejs/kit'
import { api } from 'libs'

export const csr = false

export async function load() {
    const { data, error: fetchedError } = await api.nendoroid.skadi.get()

    if (fetchedError) throw error(500, fetchedError)

    return data
}
