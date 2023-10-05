import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBkXWy4u_INzv9tqyPfoAQUUy88i0zU-7E",
    authDomain: "vue-chat-37dbb.firebaseapp.com",
    projectId: "vue-chat-37dbb",
    storageBucket: "vue-chat-37dbb.appspot.com",
    messagingSenderId: "704058236348",
    appId: "1:704058236348:web:dd4a1d6718a10d23681fb9"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase;
