
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyBwtKmyzJdDcx7Iq0jzaBkTI2Lcx9zdf28",
  authDomain: "project-1-3b86d.firebaseapp.com",
  projectId: "project-1-3b86d",
  storageBucket: "project-1-3b86d.appspot.com",
  messagingSenderId: "734221581782",
  appId: "1:734221581782:web:4ea8426bdd5399c6547877",
  measurementId: "G-YEWYGCRF1T"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(firebaseApp);
export default firebaseApp;
