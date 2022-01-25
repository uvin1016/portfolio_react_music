import axios from "axios";
import { useEffect, useState } from "react";
import Btns from "./Btns";

function Main(){
    const path = process.env.PUBLIC_URL;
    const [musicBox, setMusicBox] = useState([]);

    useEffect(()=>{
        axios.get(`${path}/dbs/players.json`).then(json=>{
            setMusicBox(json.data.data);
        })
    },[])

    return (
        <main>
            <div className="inner">
                <Btns />

                <div className="container">
                    {
                        musicBox.map((music, index)=>{
                            return (
                                <article key={index}>
                                    <div className="wrap">
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
                        })
                    }
                </div>
            </div>
        </main>
    )
}

export default Main;