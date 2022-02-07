import axios from "axios";
import { useEffect, useState } from "react";

function Panels(){
    const path = process.env.PUBLIC_URL;
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
        let playBoxes = document.querySelectorAll(".album");
        
        for(let playBox of playBoxes){
            playBox.querySelector('audio').pause();
            playBox.querySelector('audio').load();
            playBox.classList.remove('play');
        }
    }

    useEffect(()=>{
        axios.get(`${path}/dbs/albums.json`).then(data=>{
            setAlbums(data.data.data);
        })
    },[])

    return (
        <div className="panelWrap">
            {
                albums.map((music, index)=>{
                    if(index < 12){
                        return (
                            <article key={index} className="album">
                                <div className="wrap" onClick={e=>{
                                    playMusic(e);
                                }}>
                                    <div className="pic">
                                        <img src={`${path}`+music.img} />
                                    </div>
                                    <div className="txt">
                                        <h2>{music.title}</h2>
                                        <h3>{music.artist}</h3>
                                        <p>{music.janre}</p>
                                        <audio src={`${path}`+music.mp3}></audio>
                                    </div>
                                </div>
                            </article>
                        )
                    }
                })
            }
        </div>
    )
}

export default Panels;