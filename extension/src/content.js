import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously } from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getFirestore,
  onSnapshot,
  serverTimestamp,
  Timestamp,
  updateDoc
} from "firebase/firestore";
import QRCode from "qrcode";
import { firebaseConfig } from "./firebase-config.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
let rightClickedField = null;

document.addEventListener("contextmenu", event => {
  const el = event.target.closest("textarea,input,[contenteditable='true']");
  rightClickedField = el && !el.disabled && !el.readOnly ? el : null;
}, true);

function randomSecret() {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  return btoa(String.fromCharCode(...bytes))
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replaceAll("=", "");
}

function insertNote(field, note) {
  if (!field?.isConnected) throw new Error("The original EMR field is no longer available.");
  if (field.isContentEditable) {
    field.textContent = note;
  } else {
    const proto = field instanceof HTMLTextAreaElement
      ? HTMLTextAreaElement.prototype
      : HTMLInputElement.prototype;
    Object.getOwnPropertyDescriptor(proto, "value").set.call(field, note);
  }
  field.dispatchEvent(new InputEvent("input", { bubbles: true, inputType: "insertText", data: note }));
  field.dispatchEvent(new Event("change", { bubbles: true }));
  field.focus();
}

function modal() {
  const dialog = document.createElement("dialog");
  dialog.style.cssText = [
    "padding:20px",
    "max-width:440px",
    "font:14px system-ui",
    "z-index:2147483647",
    "border:0",
    "border-radius:14px",
    "box-shadow:0 18px 60px rgba(0,0,0,.28)"
  ].join(";");
  dialog.innerHTML = `<h2 style="margin:0 0 12px;">Transfer Nurse Voice Note</h2>
    <img width="300" height="300" alt="Transfer QR" style="display:block;margin:auto;">
    <p data-status>Creating secure transfer...</p>
    <button data-cancel style="width:100%;padding:10px;border-radius:10px;border:1px solid #ddd;background:#fff;">Cancel</button>`;
  document.documentElement.appendChild(dialog);
  dialog.querySelector("[data-cancel]").onclick = () => dialog.close();
  dialog.addEventListener("close", () => dialog.remove(), { once: true });
  dialog.showModal();
  return dialog;
}

chrome.runtime.onMessage.addListener(message => {
  if (message.type !== "START_NOTE_TRANSFER") return;
  startTransfer(rightClickedField).catch(error => alert(error.message));
});

async function startTransfer(field) {
  if (!field) throw new Error("Right-click directly inside the visit-note field.");
  const dialog = modal();
  const user = auth.currentUser || (await signInAnonymously(auth)).user;
  const secret = randomSecret();
  const expiresAt = Timestamp.fromMillis(Date.now() + 90_000);
  const session = await addDoc(collection(db, "noteTransfers"), {
    ownerUid: user.uid,
    claimSecret: secret,
    status: "waiting",
    createdAt: serverTimestamp(),
    expiresAt
  });
  const qrUrl = `https://transfer.nurse.woyz.in/?session=${encodeURIComponent(session.id)}&secret=${encodeURIComponent(secret)}`;
  dialog.querySelector("img").src = await QRCode.toDataURL(qrUrl, { width: 600, margin: 2 });
  dialog.querySelector("[data-status]").textContent = "Scan in Nurse Voice. Expires in 90 seconds.";

  const stop = onSnapshot(doc(db, "noteTransfers", session.id), async snapshot => {
    const data = snapshot.data();
    if (data?.status !== "received" || !data.note) return;
    stop();
    dialog.querySelector("[data-status]").textContent = "Note received. Review before saving the EMR.";
    insertNote(field, data.note);
    await updateDoc(snapshot.ref, { status: "inserted" });
    setTimeout(async () => {
      dialog.close();
      await deleteDoc(snapshot.ref);
    }, 1200);
  });
  dialog.addEventListener("close", async () => {
    stop();
    await deleteDoc(session).catch(() => {});
  }, { once: true });
  setTimeout(() => {
    if (dialog.open) dialog.close();
  }, 90_000);
}
