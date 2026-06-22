# Nurse Woyz Android TWA Setup

This folder contains the website files needed before creating a Trusted Web Activity Android app.

## What You Have Now

The website now includes:

- `manifest.webmanifest`
- `service-worker.js`
- `offline.html`
- Android/PWA icons in `icons/`
- Digital Asset Links placeholder in `.well-known/assetlinks.json`

## Recommended Demo Package Name

```text
com.nursewoyz.demo
```

Use this same package name in:

- Android TWA project
- `.well-known/assetlinks.json`

## Step 1: Upload Website To GitHub Pages

Upload all files in `nurse-woyz-firebase-demo-site` to the GitHub repository root.

Important files:

```text
index.html
firebase-config.js
manifest.webmanifest
service-worker.js
offline.html
icons/
.well-known/assetlinks.json
.nojekyll
README.md
firestore.rules
```

After GitHub Pages is enabled, your URL may look like:

```text
https://YOUR_GITHUB_USERNAME.github.io/YOUR_REPOSITORY_NAME/
```

## Step 2: Test PWA First

Open the GitHub Pages URL in Chrome on Android.

Confirm:

- Page opens over HTTPS.
- Nurse Woyz loads.
- Firebase badge shows `FIREBASE SYNC LIVE`.
- Ward device PIN `2222` works.
- Chrome can install/add the app to home screen.

## Step 3: Install Bubblewrap

On your computer:

```bash
npm install -g @bubblewrap/cli
```

## Step 4: Create Android TWA Project

Run:

```bash
bubblewrap init --manifest https://YOUR_GITHUB_USERNAME.github.io/YOUR_REPOSITORY_NAME/manifest.webmanifest
```

When asked:

- Application ID: `com.nursewoyz.demo`
- App name: `Nurse Woyz`
- Launcher name: `Nurse Woyz`
- Start URL: your GitHub Pages URL
- Theme color: `#003b71`
- Display mode: `standalone`
- Orientation: `portrait`

## Step 5: Build APK

```bash
bubblewrap build
```

Bubblewrap will create an APK for testing.

## Step 6: Get SHA-256 Fingerprint

Bubblewrap will show or generate signing information. You need the SHA-256 certificate fingerprint.

Replace this placeholder in `.well-known/assetlinks.json`:

```text
REPLACE_WITH_YOUR_ANDROID_SIGNING_CERT_SHA256_FINGERPRINT
```

Example format:

```text
AA:BB:CC:DD:EE:FF:11:22:33:44:55:66:77:88:99:00:AA:BB:CC:DD:EE:FF:11:22:33:44:55:66:77:88:99:00
```

Commit and upload the updated `.well-known/assetlinks.json` to GitHub.

## Step 7: Verify TWA

After asset links are uploaded, install the APK on Android.

If verification is correct:

- App opens full screen.
- Browser address bar is hidden.
- Website behaves like a native Android app shell.

If verification fails:

- App may still open, but Chrome address bar may appear.
- Re-check package name.
- Re-check SHA-256 fingerprint.
- Re-check that `.well-known/assetlinks.json` is available publicly at:

```text
https://YOUR_GITHUB_USERNAME.github.io/YOUR_REPOSITORY_NAME/.well-known/assetlinks.json
```

## Demo Limitation

This TWA still uses the demo website and demo Firebase rules. Do not use real patient data.
