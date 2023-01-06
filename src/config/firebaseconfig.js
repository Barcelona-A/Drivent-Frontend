import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyDZLNm4Z4iW0r7eKCs8ZqpJRtLwA30Eh_4',
  authDomain: 'logingit-7248f.firebaseapp.com',
  projectId: 'logingit-7248f',
  storageBucket: 'logingit-7248f.appspot.com',
  messagingSenderId: '630632638252',
  appId: '1:630632638252:web:cdefef2e5011919d61ee89',
  measurementId: 'G-SST9T8850W'
};

initializeApp(firebaseConfig);
getAnalytics();
