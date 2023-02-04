import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { initializeApp } from 'firebase/app';
import { getAuth, signOut, signInWithRedirect, signInWithPopup,getRedirectResult, GoogleAuthProvider, createUserWithEmailAndPassword, FacebookAuthProvider, signInWithEmailAndPassword } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyCzrlIabEokYvSyrozbvDDcynaOJwUhp-s",
  authDomain: "amigaapp-f2f93.firebaseapp.com",
  databaseURL: "https://amigaapp-f2f93-default-rtdb.firebaseio.com",
  projectId: "amigaapp-f2f93",
  storageBucket: "amigaapp-f2f93.appspot.com",
  messagingSenderId: "975832123305",
  appId: "1:975832123305:web:46c7d2a3557b2d604ce6b8",
  measurementId: "G-8Y02QZTNJ2"
};


const app = initializeApp(firebaseConfig);

function App() {

  const auth = getAuth(app);

  const provider = new GoogleAuthProvider();
  const providerFacebook = new FacebookAuthProvider();

  const [count, setCount] = useState(0)

  useEffect(() => {

    onRegister()
  }, []);


  const onLogin = () => {

    signInWithEmailAndPassword(auth, "crishernandez08@hotmail.com", "123456@")
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  const onRegister = () => {

    createUserWithEmailAndPassword(auth, "camilort08@hotmail.com", "123456@")
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }

  const onLoginGoogle = () => {
    //signInWithRedirect(auth, provider);
    signInWithPopup(auth, provider)
    .then((result) => {
      // The signed-in user info.
      const user = result.user;

      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const accessToken = credential.accessToken;
      console.log(accessToken);
      document.getElementById('info_usuario').innerHTML=JSON.stringify(user)

      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = FacebookAuthProvider.credentialFromError(error);

      // ...
    });

  }

  const onLoginFacebook = () => {
    /* signInWithRedirect(auth, providerFacebook); */
    signInWithPopup(auth, providerFacebook)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
        document.getElementById('info_usuario').innerHTML=JSON.stringify(user)
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
        console.log(accessToken);
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);

        // ...
      });

  }

  const onGetUserLogin = () => {
    getRedirectResult(auth)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access Google APIs.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        // The signed-in user info.
        const user = result.user;
        document.getElementById('info_usuario').innerHTML=JSON.stringify(user)
        
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        //const email = error.customData.email;
        // The AuthCredential type that was used.
        //const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

  const onLogout = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }

  return (
    <div className="App">
      <button onClick={onLogin}>LOGIN</button>
      <button onClick={onLoginGoogle}>LOGIN-GOOGLE</button>
      <button onClick={onLoginFacebook}>LOGIN-FACEBOOK</button>
      <button onClick={onGetUserLogin}>GET USER LOGIN</button>
      <div id="info_usuario">

      </div>
    </div>
  )
}

export default App
