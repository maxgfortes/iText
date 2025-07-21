import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import { getFirestore, collection, doc, setDoc, query, where, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD1mLsKEpVUvsOsnzaoNmaEHzsNM6ORGqc",
  authDomain: "itext-realme.firebaseapp.com",
  projectId: "itext-realme",
  storageBucket: "itext-realme.firebasestorage.app",
  messagingSenderId: "540414487794",
  appId: "1:540414487794:web:3dca30a050d6b5e131746b",
  measurementId: "G-E9DL66RH8G"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);
const db = getFirestore(app);

const VAPID_KEY = 'BKME6bg7J6l8ocnSAS8aMzpafAX__Q4Lpq6FO5UMW8yGnFTlyignOSAL4X-UogWk-eG6OV3K8hPrsXYT0UAI4po';

async function saveToken(token) {
  if (!token) return;
  const tokensRef = collection(db, 'tokens');
  const q = query(tokensRef, where('token', '==', token));
  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) {
    await setDoc(doc(db, 'tokens', token), { token });
    console.log('Token salvo no Firestore');
  } else {
    console.log('Token já existe no Firestore');
  }
}

export async function requestNotificationPermission() 
  try 
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      console.log('Permissão negada para notificações');
      return;
    }
    const token = await getToken
