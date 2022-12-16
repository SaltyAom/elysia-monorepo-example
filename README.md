# Elysia / Eden Turborepo
Example of using mono-repo to sync data between Elysia and frontend framework using Eden connector.

Backend:
- apps/backend - Elysia

Frontend:
- apps/react - Next
- apps/vue - Nuxt
- apps/svelte - SvelteKit

Utility:
- packages/libs - Eden connector

Path:
The following are available paths for frontend:

- / - fetch data from Elysia: [GET] `/nendoroid/skadi`
- /sign-in - simulate sign in: [POST] `/sign-in`
