import { Elysia, t } from "elysia"
import { cors } from "@elysiajs/cors"
import { staticPlugin } from "@elysiajs/static"

const app = new Elysia()
  .use(cors())
  .use(
    staticPlugin({
      prefix: "",
    })
  )
  .get("/", () => "Hello Elysia")
  .get("/nendoroid/skadi", () => ({
    id: 1895,
    name: "Skadi",
    type: "Nendoroid",
    manufacture: "Goodsmile",
    cover: `http://localhost:3000/assets/skadi.jpg`,
    license: {
      type: "approved",
      holder: "Hypergraph",
      from: "Arknights",
    },
  }))
  .post("/sign-in", ({ body }) => body, {
    body: t.Object({
      username: t.String(),
      password: t.String(),
    }),
    response: t.Object({
      username: t.String(),
      password: t.String(),
    }),
  })
  .listen(3000)

export type App = typeof app

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)
