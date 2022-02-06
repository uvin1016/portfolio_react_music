import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from "../FirebaseConfig";

export default function Main() {
    const [albums, setAlbums] = useState([]);

    useEffect(()=>{
        const albumRef = collection(db, "articles");
        const q = query(albumRef, orderBy("createAt","desc"));
        onSnapshot(q,(snapshot)=>{
            const albums = snapshot.docs.map((doc)=>({
                id: doc.id,
                ...doc.data(),
            }))
            setAlbums(albums);
        })
    },[]);

    return (
        albums.map(({id,title,artist,janre,imgurl,createAt})=>{
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
    )
}