import { useState, useRef, useEffect } from 'react';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/analytics';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
    apiKey: "AIzaSyBg19jzJVqt4WBI3_aZRnR39HzrREi9tZo",
    authDomain: "portfolio-react-music.firebaseapp.com",
    projectId: "portfolio-react-music",
    storageBucket: "portfolio-react-music.appspot.com",
    messagingSenderId: "894678094695",
    appId: "1:894678094695:web:9a645ee036818aa3c055c2",
    measurementId: "G-82MKME9LT5"
});

const auth = firebase.auth();
const db = firebase.firestore();
const analytics = firebase.analytics();

const SignIn = ()=>{
    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);
    }
    return (
        <>
            <button className="signIn" onClick={signInWithGoogle}>Log in with Google</button>
        </>
    )
}

const SignOut = ()=>{
    return auth.currentUser && (
        <button className="signOut" onClick={() => auth.signOut()}>Log Out</button>
    )
}

const ChatRoom = ()=>{
    const dummy = useRef();
    const messagesRef = db.collection('messages');
    const query = messagesRef.orderBy('createdAt').limit(25);
    const [messages] = useCollectionData(query, { idField: 'id' });
    const [formValue, setFormValue] = useState('');

    const sendMessage = async (e) => {
        e.preventDefault();
        const { uid, photoURL } = auth.currentUser;

        await messagesRef.add({
            text: formValue,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid,
            photoURL
        });

        setFormValue('');
        dummy.current.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <>
            <div className='inner'>
                {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
                <span ref={dummy}></span>
            </div>

            <form onSubmit={sendMessage}>
                <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />
                <button type="submit" disabled={!formValue}><i className="las la-sms"></i></button>
            </form>
        </>
    )
}
const ChatMessage = (props)=>{
    const { text, uid, photoURL } = props.message;
    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

    return (
        <>
            <div className={`message ${messageClass}`}>
                <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} />
                <p>{text}</p>
            </div>
        </>
    )
}

function Chat(){
    const [isOn, setIsOn] = useState(false);
    const toggleChat = ()=>setIsOn(!isOn);
    const [user] = useAuthState(auth);

    return(
        <>
            <button onClick={toggleChat} className="chatBtn">Chat</button>
            <aside className={isOn ? 'on' : null}>
                <div className="chatBox">
                    <SignOut />
                    {user ? <ChatRoom /> : <SignIn />}
                </div>
            </aside>
        </>
    )
}

export default Chat;