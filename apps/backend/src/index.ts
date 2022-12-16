import { Elysia, t } from 'elysia'
import { cors } from '@elysiajs/cors'

const app = new Elysia()
    .use(cors())
    .get('/', () => 'Hello Elysia')
    .get('/nendoroid/skadi', () => ({
        id: 1895,
        name: 'Skadi',
        type: 'Nendoroid',
        manufacture: 'Goodsmile',
        cover: 'https://inwfile.com/s-dv/mt1la9.jpg',
        license: {
            type: 'approved',
            holder: 'Hypergraph',
            from: 'Arknights'
        }
    }))
    .post('/sign-in', ({ body }) => body, {
        schema: {
            body: t.Object({
                username: t.String(),
                password: t.String()
            })
        }
    })
    .listen(3001)

export type App = typeof app

console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)
