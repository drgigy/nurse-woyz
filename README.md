# Nurse Woyz Firebase Demo Website

This folder is a static demo website for Nurse Woyz.

It supports:

- Mobile Ward Device flow only.
- Desktop Ward Manager dashboard.
- Firestore sync for notes and transfer requests.
- Local demo mode if Firebase config is still blank.

This is not the final production build. It is for demonstrating the workflow.

## Demo Logins

- Ward Device PIN: `2222`.
- Ward Manager: `manager` / `1234`.
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

In GitHub:

1. Go to **Settings > Pages**.
2. Choose the branch and folder containing `index.html`.
3. Save.
4. Open the Pages URL.

## Testing The Demo

1. Open the website on a desktop browser.
2. Login as manager using `manager / 1234`.
3. Open the website on a mobile browser.
4. Use the Ward Device flow with PIN `2222`.
5. On another desktop browser, open OT / Cath command.
6. Send a transfer request.
7. Confirm the nurse screen and manager dashboard update through Firestore.

## Important Safety Notes

- These rules are demo rules only.
- Anonymous Firebase Auth is used only to prevent completely unauthenticated public writes.
- This is not sufficient for real patient data.
- Do not use real patient identifiers, names, diagnoses, or sensitive clinical details in this demo.
- Before production, add real Firebase Authentication, role-based access, server-side transcription, and production Firestore rules.
