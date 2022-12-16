# Elysia / Eden Turborepo
Example of using mono-repo to sync data between Elysia and frontend framework using Eden connector.

Backend:
- apps/backend (port: 3000) - Elysia

Frontend:
- apps/react (port: 3001) - Next
- apps/svelte (port: 3002) - SvelteKit
- apps/vue (port: 3003) - Nuxt

Utility:
- packages/libs - Eden connector

Path:
The following are available paths for frontend:

- / - fetch data from Elysia: [GET] `/nendoroid/skadi`
- /sign-in - simulate sign in: [POST] `/sign-in`
