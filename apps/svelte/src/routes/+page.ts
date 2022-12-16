import { api } from 'libs'

export const csr = false

export function load() {
    return api.nendoroid.skadi.GET()
}
