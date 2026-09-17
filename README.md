# Treat-Swagger API

A mock healthcare REST API for testing/demo purposes. It has login authentication,
and endpoints for hospitals, patients, and encounters — all backed by a handful of
**in-memory test records** (see `data.js`). No database required.

## What's inside

```
treat-swagger/
├── server.js       # Express app + routes + JWT auth
├── swagger.yaml    # OpenAPI 3.0 spec (drives the Swagger UI)
├── data.js         # Mock/test data (edit this to add more records)
├── package.json
└── render.yaml      # One-click config for hosting on Render
```

## Endpoints

| Method | Path                  | Auth required | Description              |
|--------|-----------------------|:--------------:|---------------------------|
| POST   | `/api/login`          | No             | Get a JWT token           |
| GET    | `/api/hospitals`      | Yes            | List hospital names       |
| GET    | `/api/patients`       | Yes            | List patients             |
| GET    | `/api/patients/{id}`  | Yes            | Get one patient           |
| GET    | `/api/encounters`     | Yes            | List encounters           |
| GET    | `/api/encounters/{id}`| Yes            | Get one encounter         |

Swagger UI: **`/api-docs`**

### Test login credentials
| username | password    |
|----------|-------------|
| admin    | password123 |
| testuser | test@123    |

## Run it locally

```bash
npm install
npm start
```

Then open: http://localhost:3000/api-docs

### Try it with curl

```bash
# 1. Login and grab the token
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"password123"}'

# 2. Use the token on protected routes
curl http://localhost:3000/api/hospitals \
  -H "Authorization: Bearer <PASTE_TOKEN_HERE>"
```

### Authorizing inside Swagger UI

1. Open `/api-docs`.
2. Call `POST /login` via "Try it out", copy the `token` value from the response.
3. Click the **Authorize** button (top right, padlock icon).
4. Paste the token (just the token, no need to type "Bearer") and click Authorize.
5. Now "Try it out" works on the protected endpoints too.

## Adding more test records

Just edit the arrays in `data.js` (`hospitals`, `patients`, `encounters`, `users`) —
no schema migrations, no database setup.

## Hosting it (free options)

See the step-by-step guide provided separately, or in short:
- **Render.com** — connect your GitHub repo, it auto-detects `render.yaml`.
- **Railway.app** — similar one-click deploy from GitHub.
- Any Node host works since this is a plain Express app (`npm start`).
