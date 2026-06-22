# Nurse Woyz Firebase Demo Website

This folder is a static demo website for Nurse Woyz.

It supports:

- Separate Ward Device page.
- Separate Desktop Admin dashboard page.
- Separate OT Command page.
- Separate Cath Lab Command page.
- Firestore sync for notes and transfer requests.
- Local demo mode if Firebase config is still blank.
- PWA/TWA support files for Android installation.

This is not the final production build. It is for demonstrating the workflow.

## Demo Logins

- Ward Device PIN: `2222`.
- Admin: `manager` / `1234`.
- OT / Cath command: choose either demo staff card.

## Firebase Demo Setup

1. Go to Firebase Console.
2. Create a Firebase project.
3. Create a Web app.
4. Copy the Firebase web config into `firebase-config.js`.
5. Open **Authentication > Sign-in method**.
6. Enable **Anonymous** sign-in.
7. Open **Firestore Database**.
8. Create a Firestore database.
9. Open Firestore **Rules**.
10. Paste the contents of `firestore.rules`.
11. Publish the rules.
12. Deploy the files with GitHub Pages or Firebase Hosting.

The demo writes to:

```text
demoShifts/ward-3-night-demo/notes
demoShifts/ward-3-night-demo/transferRequests
```

## GitHub Pages

Upload all files in this folder to a GitHub repository.

Main links after deployment:

```text
https://nurse.woyz.in/
https://nurse.woyz.in/ward.html
https://nurse.woyz.in/manager.html
https://nurse.woyz.in/ot.html
https://nurse.woyz.in/cathlab.html
```

Include these folders also:

- `icons/`
- `.well-known/`
- `twa/`

In GitHub:

1. Go to **Settings > Pages**.
2. Choose the branch and folder containing `index.html`.
3. Save.
4. Open the Pages URL.

## Android TWA

After GitHub Pages is working, see:

```text
twa/README-TWA.md
```

The app is prepared with:

- `manifest.webmanifest`
- `service-worker.js`
- `offline.html`
- PNG app icons
- `.well-known/assetlinks.json` placeholder

Before building the final Android TWA, replace the SHA-256 placeholder in `.well-known/assetlinks.json`.

## Testing The Demo

1. Open `manager.html` on a desktop browser.
2. Login as manager using `manager / 1234`.
3. Open `ward.html` on a mobile browser.
4. Use the Ward Device flow with PIN `2222`.
5. Open `ot.html` or `cathlab.html` on another browser.
6. Send a transfer request.
7. Confirm the nurse screen and admin dashboard update through Firestore.

## Important Safety Notes

- These rules are demo rules only.
- Anonymous Firebase Auth is used only to prevent completely unauthenticated public writes.
- This is not sufficient for real patient data.
- Do not use real patient identifiers, names, diagnoses, or sensitive clinical details in this demo.
- Before production, add real Firebase Authentication, role-based access, server-side transcription, and production Firestore rules.
