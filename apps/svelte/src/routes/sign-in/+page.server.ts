import { fail, type Actions } from '@sveltejs/kit'

import { api } from 'libs'

export const actions: Actions = {
    default: async ({ request }) => {
        const data = await request.formData()

        const username = data.get('username') as string
        const password = data.get('password') as string

        if (!username)
            fail(400, {
                success: false,
                error: 'username is requried'
            })

        if (!password)
            fail(400, {
                success: false,
                error: 'password is required'
            })

        const res = await api.signIn.post({
            username,
            password
        })

        return {
            ...res,
            success: true,
            error: ''
        }
    }
}
