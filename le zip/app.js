import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js';

const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

window.signup = async function () {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    alert('Signup successful');
  } catch (e) {
    alert(e.message);
  }
};

window.login = async function () {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert('Login successful');
  } catch (e) {
    alert(e.message);
  }
};

window.sendMessage = async function () {
  const prompt = document.getElementById('prompt').value;

  document.getElementById('output').innerText = 'Thinking...';

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: prompt })
    });

    const data = await response.json();

    document.getElementById('output').innerText =
      data?.choices?.[0]?.message?.content || 'No response';
  } catch (e) {
    document.getElementById('output').innerText = e.message;
  }
};
