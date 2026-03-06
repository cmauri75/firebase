import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";
import {
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithPopup,
    signOut
} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyC5NFl5o7A_toRx6DhdiwhVW6AdhRIucJI",
    authDomain: "frontend-cf896.firebaseapp.com",
    projectId: "frontend-cf896",
    storageBucket: "frontend-cf896.firebasestorage.app",
    messagingSenderId: "46858029237",
    appId: "1:46858029237:web:9e555c69cf889d74ee96fc",
    measurementId: "G-3ZKHMQX90F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

const inputField = document.getElementById("input-field");
const addButton = document.getElementById("add-button");
const cartForm = document.getElementById("cart-form");
const statusMessage = document.getElementById("status-message");
const signInButton = document.getElementById("sign-in-button");
const signOutButton = document.getElementById("sign-out-button");
const userInfo = document.getElementById("user-info");

// Keep the sign-in button hidden while we wait for the auth state to resolve
// so the user never sees a flash of the wrong UI.
signInButton.hidden = true;

const setStatus = (message, isError = false) => {
    statusMessage.textContent = message;
    statusMessage.classList.toggle("error", isError);
};

const updateAuthUI = (user) => {
    const signedIn = Boolean(user);
    cartForm.hidden = !signedIn;
    signInButton.hidden = signedIn;
    signOutButton.hidden = !signedIn;
    userInfo.textContent = signedIn
        ? `Signed in as ${user.displayName || user.email || user.uid}`
        : "Not signed in";

    // Only set the prompt when not signed in; leave any transient message
    // (e.g. "Signed out." set by logout()) visible if it is already shown.
    if (!signedIn) {
        setStatus("Sign in to save items.");
    }
    if (signedIn) {
        setStatus("");
    }
};

const login = async () => {
    try {
        await signInWithPopup(auth, provider);
    } catch (error) {
        console.error("Sign-in failed:", error);
        setStatus("Sign-in failed: " + error.message, true);
    }
};

const logout = async () => {
    try {
        await signOut(auth);
        // Clear status so the auth-state handler can show the sign-in prompt.
        setStatus("");
    } catch (error) {
        console.error("Sign-out failed:", error);
        setStatus("Sign-out failed. Try again.", true);
    }
};

const saveInputValue = async () => {
    const user = auth.currentUser;
    if (!user) {
        setStatus("Please sign in first.", true);
        return;
    }

    const value = inputField.value.trim();
    if (!value) {
        setStatus("Please type an item before saving.", true);
        inputField.focus();
        return;
    }

    addButton.disabled = true;
    setStatus("Saving...");

    try {
        let docToSave = {
            text: value,
            uid: user.uid,
            email: user.email || null,
            createdAt: serverTimestamp()
        };
        await addDoc(collection(db, "cartItems"), docToSave);

        console.log(`Saved to Firestore: ${JSON.stringify(docToSave)}`);
        inputField.value = "";
        setStatus("Saved successfully.");
        inputField.focus();
    } catch (error) {
        console.error("Error saving to Firestore:", error);
        setStatus("Save failed. Check auth and Firestore rules.", true);
    } finally {
        addButton.disabled = false;
    }
};

signInButton.addEventListener("click", login);
signOutButton.addEventListener("click", logout);
addButton.addEventListener("click", saveInputValue);

inputField.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        saveInputValue();
    }
});

onAuthStateChanged(auth, (user) => {
    updateAuthUI(user);
});
