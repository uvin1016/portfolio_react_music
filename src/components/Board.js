import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from "../FirebaseConfig";

export default function Board() {
    const [albums, setAlbums] = useState([]);

    const playMusic = e=>{
        let isActive = e.currentTarget.closest("article").classList.contains('play');

        if(isActive){
            e.currentTarget.closest("article").classList.remove('play');
            e.currentTarget.querySelector("audio").pause();
        }else{
            initMusic();
            e.currentTarget.closest("article").classList.add('play');
            e.currentTarget.querySelector("audio").play();
        }
    }

    const initMusic = ()=>{
        let playBoxes = document.querySelectorAll("article");

        for(let playBox of playBoxes){
            playBox.querySelector('audio').pause();
            playBox.querySelector('audio').load();
            playBox.classList.remove('play');
        }
    }

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
                <article key={id} onClick={e=>playMusic(e)}>
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