import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'

import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'

import { useState } from 'react';

import { auth, firestore } from '../firebase';

import './Dashboard.css'

function Dashboard() {
    const messagesRef = firestore.collection('messages');
    const startToday = new Date();
    startToday.setHours(0, 0, 0, 0);
    const endToday = new Date(startToday);
    endToday.setDate(startToday.getDate() + 1);

    const query = messagesRef
        .where('createdAt', '>=', startToday)
        .where('createdAt', '<=', endToday)
        .orderBy('createdAt').limit(25);

    const [messages] = useCollectionData(query, { idField: 'id' });

    const [formValue, setFormValue] = useState('');

    const sendMessage = async (e) => {
        e.preventDefault(); // stops page refresh
        const { uid, displayName, email } = auth.currentUser;
        console.log(auth.currentUser);
        await messagesRef.add({
            text: formValue,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid,
            displayName,
            email
        })
        setFormValue('');
    }

    return (
        <>
        <main>
            <h2>Chat messages go here</h2>
            <div className="messages">
                { messages && messages.map(msg => <Message key={msg.id} message={msg} />) }
            </div>

            <form onSubmit={sendMessage}>
                <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />
                <button type="submit" disabled={!formValue}>Send</button>
            </form>
        </main>
        </>
    )
}

function Message(props) {
    const { text, uid, displayName, email } = props.message;

    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

    return (
        <>
        <div className={`message ${messageClass}`} key={uid}>
            <h4 className='message-user'>{email}</h4>
            <p className='message-text'>{text}</p>
        </div>
        </>
    )
}

export { Dashboard, Message };