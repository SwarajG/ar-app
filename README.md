# CeraVe AR App

Express + TypeScript + MongoDB app for serving a mobile WebAR product experience.

## What This Project Does

- Serves a homepage with product/language buttons
- Fetches product content from MongoDB by `name`, `size`, and `lang`
- Renders the AR product page with local 8th Wall self-hosted runtime assets
- Can be tested locally on desktop and on a phone through `ngrok`

## Requirements

- Node.js `14.x`
- npm
- ngrok
- A MongoDB Atlas connection string in `.env`

## Environment

Create a `.env` file in the project root:

```env
MONGO_URL=your-mongodb-connection-string
```

The app expects:

- a reachable MongoDB database
- a `cerave.products` collection containing product documents

## Install

```bash
npm install
```

## Run Locally

The app uses HTTPS locally and reads:

- [`key.pem`](/Users/ashish/_MAC_ALMANAC/EXPERIMENTS/2026/cerave-projects-2026/swaraj-ar-app/key.pem)
- [`cert.pem`](/Users/ashish/_MAC_ALMANAC/EXPERIMENTS/2026/cerave-projects-2026/swaraj-ar-app/cert.pem)

Run on a non-privileged local port:

```bash
PORT=8443 npm run dev
```

Expected output:

```text
HTTPS Application is running on port 8443.
```

Open locally:

```text
https://localhost:8443
```

Your browser will likely show a local certificate warning. Continue to the site.

## Restart Routine

Before starting a new server, check whether something is already using port `8443`:

```bash
lsof -nP -iTCP:8443 -sTCP:LISTEN
```

If a process is already listening, stop it:

```bash
kill <PID>
```

Then start the app again:

```bash
PORT=8443 npm run dev
```

## Test On Mobile

Keep the local server running, then start ngrok in a second terminal:

```bash
ngrok http https://localhost:8443
```

Use the generated `https://...ngrok-free.dev` URL on your phone.

Example product URL pattern:

```text
https://YOUR-NGROK-URL/product?lang=en&name=hydrating-cleanser&size=8oz
```

Notes:

- phone testing requires `https`
- `localhost` will not work directly on the phone
- camera permission must be allowed for the ngrok domain

## Current Homepage Variants

The homepage buttons are hardcoded in [`src/views/index.ejs`](/Users/ashish/_MAC_ALMANAC/EXPERIMENTS/2026/cerave-projects-2026/swaraj-ar-app/src/views/index.ejs).

Current routes exposed by the UI:

- English
  - `/product?lang=en&name=hydrating-cleanser&size=8oz`
  - `/product?lang=en&name=foaming-cleanser&size=8oz`
  - `/product?lang=en&name=moisturizing-lotion&size=8oz`
  - `/product?lang=en&name=moisturizing-cream&size=12oz`
  - `/product?lang=en&name=cream-to-foam-cleanser&size=8oz`
- Arabic
  - `/product?lang=ar&name=hydrating-cleanser&size=8oz`
  - `/product?lang=ar&name=foaming-cleanser&size=8oz`
  - `/product?lang=ar&name=moisturizing-lotion&size=8oz`
  - `/product?lang=ar&name=moisturizing-cream&size=12oz`
  - `/product?lang=ar&name=cream-to-foam-cleanser&size=8oz`
- Spanish
  - `/product?lang=es&name=moisturizing-lotion&size=8oz`
  - `/product?lang=es&name=moisturizing-cream&size=16oz`

## Product Data

Product data is fetched with this query shape:

- `name`
- `size`
- `lang`

That means each UI variant must have a matching MongoDB document.

Mock insert-ready payloads are organized here:

- [`src/routes/__mock__/en`](/Users/ashish/_MAC_ALMANAC/EXPERIMENTS/2026/cerave-projects-2026/swaraj-ar-app/src/routes/__mock__/en)
- [`src/routes/__mock__/ar`](/Users/ashish/_MAC_ALMANAC/EXPERIMENTS/2026/cerave-projects-2026/swaraj-ar-app/src/routes/__mock__/ar)
- [`src/routes/__mock__/es`](/Users/ashish/_MAC_ALMANAC/EXPERIMENTS/2026/cerave-projects-2026/swaraj-ar-app/src/routes/__mock__/es)

Each `.txt` file contains insert-ready JSON for MongoDB.

## Useful Test Links

Local examples:

```text
https://localhost:8443/product?lang=en&name=moisturizing-cream&size=12oz
https://localhost:8443/product?lang=en&name=hydrating-cleanser&size=8oz
```

Replace `https://localhost:8443` with your ngrok URL for phone testing.

## Troubleshooting

- If ngrok shows `connection refused`, the local app is not running on `8443`
- If the phone page loads but camera does not start, check camera permission for the ngrok domain
- If the app boots but a product page fails, verify that MongoDB has a matching document for that `name/size/lang`
- If you change `.env`, restart the server
- If you only change product data in MongoDB, just refresh the page
