// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js';
import { getFirestore, collection, addDoc } from 'https://www.gstatic.com/firebasejs/9.1.0/firebase-firestore.js';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCFz9T99rmgpumFBg78ooDqjxZSkb0so6c",
    authDomain: "power-cable.firebaseapp.com",
    projectId: "power-cable",
    storageBucket: "power-cable.appspot.com",
    messagingSenderId: "507939210203",
    appId: "1:507939210203:web:a78a997d5daf112b955dfe",
    measurementId: "G-3P0DG292WK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const colRef = collection(db, 'orders');

// Price data for watts
const priceData = {
    "7": 12.00,
    "9": 15.00,
    "12": 20.00,
    "15": 25.00,
    "20": 40.00,
    "30": 50.00
};

// DOM elements
const wattsSelect = document.getElementById('watts');
const quantityInput = document.getElementById('quantity');
const totalPriceElement = document.getElementById('totalPrice');

// Function to calculate total price
function calculateTotalPrice() {
    const watts = wattsSelect.value;
    const quantity = parseInt(quantityInput.value, 10) || 0;
    const pricePerUnit = priceData[watts] || 0;
    const totalPrice = pricePerUnit * quantity;

    totalPriceElement.textContent = `GHC ${totalPrice.toFixed(2)}`;
}

// Add event listeners for real-time price calculation
wattsSelect.addEventListener('change', calculateTotalPrice);
quantityInput.addEventListener('input', calculateTotalPrice);

// Form submission handler
document.getElementById('orderForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const watts = wattsSelect.value;
    const type = document.getElementById('type').value;
    const quantity = quantityInput.value;
    const location = document.getElementById('location').value;
    const name = document.getElementById('name').value;
    const telephone = document.getElementById('telephone').value;

    // Ensure all fields are filled before submission
    if (!name || !telephone || !location || !quantity || !watts || !type) {
        alert('Please fill in all required fields.');
        return;
    }

    const pricePerUnit = priceData[watts] || 0;
    const totalPrice = pricePerUnit * parseInt(quantity, 10);

    const orderData = {
        watts,
        type,
        quantity: parseInt(quantity, 10),
        location,
        contact: {
            name,
            telephone
        },
        totalPrice: totalPrice.toFixed(2), // Save total price
        orderDate: new Date()
    };

    try {
        await addDoc(colRef, orderData);

        const orderComplete = document.getElementById('orderComplete');
        orderComplete.style.display = 'block';

        // Reset form and hide success message after 3 seconds
        document.getElementById('orderForm').reset();
        setTimeout(() => {
            orderComplete.style.display = 'none';
        }, 3000);

        // Reset total price display
        totalPriceElement.textContent = 'GHC 0.00';
    } catch (error) {
        console.error("Error submitting order: ", error);
        alert('Failed to submit the order. Please try again.');
    }
});
