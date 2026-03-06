# Add to Cart Demo

A simple static page with an image header, a text box, and a button that saves the typed value to Firestore with a server timestamp.

## Prerequisites

- Node.js installed
- Firebase CLI installed (`firebase --version`)
- Logged in with `firebase login`

## Run locally

```bash
cd /Users/cesaremauri/Projects/extProjects/firebase
firebase serve --only hosting --project frontend-cf896
```

Open the shown local URL, type text, and click **Add to cart**.

## Deploy to Firebase Hosting

```bash
cd /Users/cesaremauri/Projects/extProjects/firebase
firebase deploy --only hosting --project frontend-cf896
```

Live site: `https://frontend-cf896.web.app`

## Firestore write format

Collection: `cartItems`

Fields per document:
- `text` (string)
- `createdAt` (Firestore server timestamp)
