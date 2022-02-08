import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from "../../FirebaseConfig";
import AddBoard from './AddBoard';
import { ToastContainer } from 'react-toastify';

export default function Board() {
    const [list, setList] = useState([]);

    useEffect(()=>{
        const listRef = collection(db, "articles");
        const q = query(listRef, orderBy("createAt","desc"));
        onSnapshot(q,(snapshot)=>{
            const list = snapshot.docs.map((doc)=>({
                id: doc.id,
                ...doc.data(),
            }))
            setList(list);
        })
    },[]);

    return (
        <main className='board'>
            <ToastContainer />
            <div className="inner">
                <div className="createBoard">
                    <AddBoard />
                </div>
                <div className="board">    
                    {
                        list.map(({id,title,artist,janre,imgurl,createAt})=>{
                            return(
                                <article key={id}>
                                    <h1>{title}</h1>
                                    <h2>{artist}</h2>
                                    <div className="pic" style={{width: 300, height: 300, position: 'relative', overflow: 'hidden'}}>
                                        <img src={imgurl} alt={title} style={{position: 'absolute', width: '100%', height: '100%', top: 0, left: 0}} />
                                    </div>
                                    <p>{createAt.toDate().toDateString()}</p>
                                    <p>{janre}</p>
                                </article>
                            )
                        })
                    }
                </div>
            </div>
        </main>
    )
}