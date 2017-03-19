import firebase from 'firebase';

try {

  var config = {
      apiKey: "AIzaSyAT5a076p6NKBKgtyH79mGzNRJY5mQ-C3c",
      authDomain: "research-data-app.firebaseapp.com",
      databaseURL: "https://research-data-app.firebaseio.com",
      storageBucket: "research-data-app.appspot.com",
      messagingSenderId: "335357834988"
    };

  firebase.initializeApp(config);
} catch(e) {
  console.log('Firebase error:', e);
}

export var firebaseRef = firebase.database().ref();
export var firebaseStorageRef = firebase.storage().ref();
export default firebase;
