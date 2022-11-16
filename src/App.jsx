import { useState } from 'react'
import './App.css'

import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'

import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'

import { AuthButtons, SignOut } from './components/AuthButtons'
import { Dashboard, Message } from './components/Dashboard'
import Header from './components/Header'
import Home from './components/Home'

import { auth, firestore } from './firebase'

// https://www.youtube.com/watch?v=zQyrwxMPm88&t=40s

function App() {
    const [user] = useAuthState(auth)

    return (
        <div className="App">
            <header>
                <h1>BeMind</h1>
                <SignOut />
            </header>
            { user ? <Dashboard /> : <Home /> }
        </div>
    )
}

export default App
