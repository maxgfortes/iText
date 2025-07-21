  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
  import {
    getFirestore,
    collection,
    addDoc,
    serverTimestamp,
  } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

  const firebaseConfig = {
    apiKey: "AIzaSyD1mLsKEpVUvsOsnzaoNmaEHzsNM6ORGqc",
    authDomain: "itext-realme.firebaseapp.com",
    projectId: "itext-realme",
    storageBucket: "itext-realme.appspot.com",
    messagingSenderId: "540414487794",
    appId: "1:540414487794:web:3dca30a050d6b5e131746b",
    measurementId: "G-E9DL66RH8G"
  };

  const app = initializeApp(firebaseConfig);
  getAnalytics(app);
  const db = getFirestore(app);

  const input = document.getElementById('text-input');
  const toggleDevice = document.getElementById('toggle-device');

  async function generateImage() {
    const textContent = input.value.trim();
    if (!textContent) {
      alert('Por favor, digite algo antes de postar!');
      return;
    }

    try {
      const canvas = await html2canvas(document.getElementById('preview'));
      const imageData = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `post-${Date.now()}.png`;
      link.href = imageData;
      link.click();

      if (toggleDevice?.checked) {
        await addDoc(collection(db, 'posts'), {
          texto: textContent,
          data: serverTimestamp(),
          likes: 0,
          comments: []
        });
        alert('Post salvo com sucesso!');
      }
    } catch(error) {
      console.error('Erro ao postar:', error);
      alert('Ocorreu um erro ao postar. Veja console.');
    }
  }

  window.generateImage = generateImage;

    window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-J5L04NE90Y');



  /*NEWWW*/

