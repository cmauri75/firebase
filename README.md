# Add to Cart Demo

A simple static page with an image header, Google sign-in, a text box, and a button that saves the typed value to Firestore with a server timestamp.

## Prerequisites

- Node.js installed
- Firebase CLI installed (`firebase --version`)
- Logged in with `firebase login`

## Firebase Console setup

1. Open Authentication -> Sign-in method in your Firebase project.
2. Enable the **Google** provider.
3. Ensure your hosting domain (for example `frontend-cf896.web.app`) is in Authentication -> Settings -> Authorized domains.

## Run locally

```bash
cd /Users/cesaremauri/Projects/extProjects/firebase
firebase serve --only hosting --project frontend-cf896
```

Open the shown local URL, sign in with Google, type text, and click **Add to cart**.

## Deploy to Firebase Hosting

```bash
cd /Users/cesaremauri/Projects/extProjects/firebase
firebase deploy --only hosting --project frontend-cf896
```

## Deploy Firestore rules

```bash
cd /Users/cesaremauri/Projects/extProjects/firebase
firebase deploy --only firestore:rules --project frontend-cf896
```

Live site: `https://frontend-cf896.web.app`

## Firestore write format

Collection: `cartItems`

Fields per document:
- `text` (string)
- `uid` (string, authenticated user id)
- `email` (string, authenticated user email)
- `createdAt` (Firestore server timestamp)
