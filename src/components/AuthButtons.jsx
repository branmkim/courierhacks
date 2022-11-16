import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth";
import { useState } from "react";
import { CourierClient } from "@trycourier/courier";
import "./AuthButtons.css";
import fetch from 'node-fetch';

function CreateUser() {
    const [ error, setError ] = useState(null);

    async function sendWelcomeEmail(e, email) {
        e.preventDefault();
        console.log("called sendWelcomeEmail");
        
        const options = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "message": {
            "template": "M5WXTFQS6W4SYFQ962BTDYMTJ16C"
            }
        })
        };

        fetch('https://api.courier.com/send', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
    }
      

    const createUser = (e) => {
        e.preventDefault();
        const auth = getAuth();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        console.log(email, password);

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                const email = user.email;
                console.log(user);
            })
            .then((email) => {
                sendWelcomeEmail(email);
            })
            .catch((error) => {
                setError(e.message);
            });
    }

    return (
        <>
        <button type="submit" className='form-button' onClick={(e) => {createUser(e)}}>Create account</button>
        <button onClick={(e) => {sendWelcomeEmail(e, "bran.mkim@gmail.com")}}>test button</button>
        <p>{ error }</p>
        </>
    )
}

function SignIn() {
    const [ error, setError ] = useState(null);

    const signIn = (e) => {
        e.preventDefault();
        const auth = getAuth();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
            })
            .catch((e) => {
                setError(e.message);
            });
    }

    return (
        <>
        <button type="submit" className='form-button' onClick={(e) => {signIn(e)}}>Sign in</button>
        <p>{ error }</p>
        </>
    )
}

function SignOut() {
    const auth = getAuth();

    return auth.currentUser && (
        <button className='signout' onClick={() => auth.signOut()}>Sign out</button>
    )
}

function AuthButtons() {
    const [isSigningIn, setIsSigningIn] = useState(0);

    return (
        <>
        <form>
            { isSigningIn ? <h1>Sign in here.</h1> : <h1>Join here.</h1> }
            <input id="email" type="email" placeholder="email" />
            <input id="password" type="password" placeholder="password" />
            { isSigningIn ? 
                <>
                <SignIn />
                <p>Don't have an account? <span className="auth-link" onClick={() => { setIsSigningIn(0) }}>Join here.</span></p>
                </>
            : 
                <>
                <CreateUser />
                <p>Already have an account? <span className="auth-link" onClick={() => { setIsSigningIn(1) }}>Sign in here.</span></p>
                </>
            }
        </form>
        </>
    )
}

export { AuthButtons, SignOut };