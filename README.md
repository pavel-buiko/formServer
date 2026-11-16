# Form Server

Express API for the [Form Client](https://github.com/pavel-buiko/formClient). It lists project entries and handles create, detail, and update requests.

## Source and local development

The server, handlers, Dockerfile, and tests are on the [dev branch](https://github.com/pavel-buiko/formServer/tree/dev).

```sh
git switch dev
npm ci
npm run server
```

The default port is `5000`. Use `npm test` for the Jest and Supertest suite.

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/items` | List project entries. |
| GET | `/api/items/:id` | Read an entry. |
| POST | `/api/items` | Create an entry. |
| PATCH | `/api/items/:id` | Update an entry. |

See [index.js](https://github.com/pavel-buiko/formServer/blob/dev/index.js) for server setup and [route.js](https://github.com/pavel-buiko/formServer/blob/dev/routes/route.js) for the routes.
