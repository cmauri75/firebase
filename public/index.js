import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";
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
const db = getFirestore(app);

const inputField = document.getElementById("input-field");
const addButton = document.getElementById("add-button");
const statusMessage = document.getElementById("status-message");

const setStatus = (message, isError = false) => {
    statusMessage.textContent = message;
    statusMessage.classList.toggle("error", isError);
};

const saveInputValue = async () => {
    const value = inputField.value.trim();
    if (!value) {
        setStatus("Please type an item before saving.", true);
        inputField.focus();
        return;
    }

    addButton.disabled = true;
    setStatus("Saving...");

    try {
        await addDoc(collection(db, "cartItems"), {
            text: value,
            createdAt: serverTimestamp()
        });

        console.log(`Saved to Firestore: ${value}`);
        inputField.value = "";
        setStatus("Saved successfully.");
        inputField.focus();
    } catch (error) {
        console.error("Error saving to Firestore:", error);
        setStatus("Save failed. Check Firestore rules/config.", true);
    } finally {
        addButton.disabled = false;
    }
};

addButton.addEventListener("click", saveInputValue);

inputField.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        saveInputValue();
    }
});
