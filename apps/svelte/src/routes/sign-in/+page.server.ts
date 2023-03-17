import { fail, type Actions } from '@sveltejs/kit'

import { api } from 'libs'

export const actions: Actions = {
    default: async ({ request }) => {
        const form = await request.formData()

        const username = form.get('username') as string
        const password = form.get('password') as string

        if (!username)
            return fail(400, {
                success: false,
                error: 'username is requried'
            })

        if (!password)
            return fail(400, {
                success: false,
                error: 'password is required'
            })

        const { data, error } = await api['sign-in'].post({
            username,
            password
        })

        if (error)
            fail(400, {
                success: false,
                error: error.value
            })

        return {
            ...data,
            success: true,
            error: ''
        }
    }
}
