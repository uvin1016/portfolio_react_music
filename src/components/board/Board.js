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
                    <h1>Can you recommend an album?</h1>
                    <AddBoard />
                </div>
                <div className="boardList">    
                    {
                        list.map(({id,title,artist,janre,imgurl,createAt,comment})=>{
                            return(
                                <article key={id}>
                                    <div className="wrap">
                                        <div className="pic" style={{width: 300, height: 300, position: 'relative', overflow: 'hidden'}}>
                                            <img src={imgurl} alt={title} style={{position: 'absolute', width: '100%', height: '100%', top: 0, left: 0}} />
                                        </div>
                                        <div className="txt">
                                            <p>{createAt.toDate().toDateString()}</p>
                                            <h1>{title}</h1>
                                            <h2>{artist}</h2>
                                            <p>{janre}</p>
                                            <p>{comment}</p>
                                        </div>
                                    </div>
                                </article>
                            )
                        })
                    }
                </div>
            </div>
        </main>
    )
}