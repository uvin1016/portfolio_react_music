import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Btns from "./Btns";

function Panels(){
    const path = process.env.PUBLIC_URL;
    const [albums, setAlbums] = useState([]);
    const deg = 360/12;
    const frame = useRef(null);

    const playMusic = e=>{
        let isPlay = e.currentTarget.classList.contains('play');

        if(isPlay){
            e.currentTarget.classList.remove('play');
            e.currentTarget.closest("article").querySelector("audio").pause();
            e.currentTarget.closest("article").classList.remove('play');
        }else{
            initMusic();
            e.currentTarget.classList.add('play');
            e.currentTarget.closest("article").querySelector("audio").play();
            e.currentTarget.closest("article").classList.add('play');
        }
    }

    const initMusic = ()=>{
        let playBoxes = document.querySelectorAll(".album");
        
        for(let playBox of playBoxes){
            playBox.querySelector('audio').pause();
            playBox.querySelector('audio').load();
            playBox.querySelector('.playBtn').classList.remove('play');
            playBox.closest("article").classList.remove('play');
        }
    }

    useEffect(()=>{
        axios.get(`${path}/dbs/albums.json`).then(data=>{
            setAlbums(data.data.data);
        })
    },[])

    return (
        <main>
            <Btns frame={frame} />
            <div className="panel" ref={frame}>
                {
                    albums.map((music, index)=>{
                        let style = {transform: `rotate(${deg*index}deg) translateY(-100vh)`}
                        return (
                            <article key={index} className="album" style={style}>
                                <div className="wrap">
                                    <div className="pic" style={{backgroundImage: "url("+`${path}`+music.img+")"}}>
                                        <div className="dot"></div>
                                    </div>
                                    <div className="txt">
                                        <h2 >{music.title}</h2>
                                        <h3>{music.artist}</h3>
                                        <p>{music.janre}</p>
                                        <audio src={`${path}`+music.mp3}></audio>
                                    </div>
                                    <button className="playBtn" onClick={e=>playMusic(e)}><i className="las la-play"></i><i className="las la-pause"></i></button>
                                </div>
                            </article>
                        )
                    })
                }
            </div>
        </main>
    )
}

export default Panels;