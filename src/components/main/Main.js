import axios from "axios";
import { useEffect, useRef, useState } from "react";

const body = document.querySelector("body");

function Main(){
    const path = process.env.PUBLIC_URL;
    const [isPop, setIsPop] = useState(false);
    const crudBtn = useRef(null);
    const isTitle = useRef(null);
    const isArtist = useRef(null);
    const isJanre = useRef(null);
    const editTitle = useRef(null);
    const editArtist = useRef(null);
    const editJanre = useRef(null);

    const getLocalItems = ()=>{
        let data = localStorage.getItem('albums');

        if(data){
            return JSON.parse(data);
        }else{
            return [
                {
                    "title" : "Walking in the Sky",
                    "artist" : "Nico Staf",
                    "janre" : "dance/electronic",
                    "img" : "/img/alexandra-uivarasan-Ox4INNL89GA-unsplash.jpg",
                    "mp3" : "/mp3/Walking in the Sky.mp3"
                },
                {
                    "title" : "A Fool's Theme",
                    "artist" : "Brian Bolger",
                    "janre" : "film",
                    "img" : "/img/alexey-demidov-BWY6amisY7Q-unsplash.jpg",
                    "mp3" : "/mp3/A Fool's Theme.mp3"
                },
                {
                    "title" : "Erev Shel Shoshanim",
                    "artist" : "E's Jammy Jams",
                    "janre" : "folk/country",
                    "img" : "/img/alexey-demidov-J8HMJPXMoiM-unsplash.jpg",
                    "mp3" : "/mp3/Erev Shel Shoshanim.mp3"
                },
                {
                    "title" : "First Dream",
                    "artist" : "Brian Bolger",
                    "janre" : "film",
                    "img" : "/img/anna-tarazevich-HX3MOurRLPE-unsplash.jpg",
                    "mp3" : "/mp3/First Dream.mp3"
                },
                {
                    "title" : "Fractal of Light",
                    "artist" : "Chris Haugen",
                    "janre" : "folk/country",
                    "img" : "/img/batuhan-dogan-kaNOnw3gWT0-unsplash.jpg",
                    "mp3" : "/mp3/Fractal of Light.mp3"
                },
                {
                    "title" : "In Memory of Jean Talon",
                    "artist" : "Mini Vandals",
                    "janre" : "classic",
                    "img" : "/img/dynamic-wang-5B5wue4KcoQ-unsplash.jpg",
                    "mp3" : "/mp3/In Memory of Jean Talon.mp3"
                },
                {
                    "title" : "Interstellar Mood",
                    "artist" : "Nico Staf",
                    "janre" : "Ambient",
                    "img" : "/img/emma-ou-koDAA9HIZRw-unsplash.jpg",
                    "mp3" : "/mp3/Interstellar Mood.mp3"
                },
                {
                    "title" : "Nineties Pad",
                    "artist" : "Brian Bolger",
                    "janre" : "film",
                    "img" : "/img/grant-beirute-wopUieljzNI-unsplash.jpg",
                    "mp3" : "/mp3/Nineties Pad.mp3"
                },
                {
                    "title" : "Oman Groomer",
                    "artist" : "Mini Vandals",
                    "janre" : "classic",
                    "img" : "/img/wolfgang-hasselmann-j3WkLUUCS1w-unsplash.jpg",
                    "mp3" : "/mp3/Oman Groomer.mp3"
                },
                {
                    "title" : "Simple",
                    "artist" : "Patrick Patrikios",
                    "janre" : "Ambient",
                    "img" : "/img/igor-savelev-M8SJYb4ROSY-unsplash.jpg",
                    "mp3" : "/mp3/Simple.mp3"
                },
                {
                    "title" : "Two Moons",
                    "artist" : "Bobby Richards",
                    "janre" : "Ambient",
                    "img" : "/img/tatiana-pavlova-31BMBwL9Iqw-unsplash.jpg",
                    "mp3" : "/mp3/Two Moons.mp3"
                },
                {
                    "title" : "Yoga Style",
                    "artist" : "Chris Haugen",
                    "janre" : "film",
                    "img" : "/img/tatiana-pavlova-HpZGMWcMGiY-unsplash.jpg",
                    "mp3" : "/mp3/Yoga Style.mp3"
                }
            ];
        }
    }

    const [albums, setAlbums] = useState(getLocalItems);

    const createAlbum = ()=>{
        alert("이미지와 음악파일 업로드 시키는 것은 수정하는 중입니다.");
        
        setAlbums([
            {
                title: isTitle.current.value,
                artist: isArtist.current.value,
                janre: isJanre.current.value
            }
            ,...albums
        ]);

        isTitle.current.value =  "";
        isArtist.current.value = "";
        isJanre.current.value = "";
    }

    const deleteAlbum = index=>{
        setAlbums(albums.filter((_,albumIndex)=> albumIndex !== index));
    }

    const enableUdate = index=>{
        setAlbums(
            albums.map((music, albumIndex)=>{
                if(albumIndex === index) music.enableUdate = true;
                return music;
            })
        )
    }

    const disableUpdate = index=>{
        setAlbums(
            albums.map((music, albumIndex)=>{
                if(albumIndex === index) music.enableUdate = false;
                return music;
            })
        )
    }

    const updateAlbum = index=>{
        setAlbums(
            albums.map((music,albumIndex)=>{
                if(albumIndex === index){
                    music.title = editTitle.current.value;
                    music.artist = editArtist.current.value;
                    music.janre = editJanre.current.value;
                    music.enableUdate = false;
                }
                return music;
            })
        )
    }
    
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

    const Popup = ()=>{
        return (
            <aside className="popup">
                <div className="inner">
                    <input type="text" placeholder="제목을 입력하세요." ref={isTitle} />
                    <input type="text" placeholder="아티스트를 입력하세요." ref={isArtist} />
                    <input type="text" placeholder="음악 장르를 입력하세요." ref={isJanre} />
                    <ul className="btns">
                        <li onClick={createAlbum}>업로드</li>
                        <li onClick={()=>{
                            isTitle.current.value =  "";
                            isArtist.current.value = "";
                            isJanre.current.value = "";
                            setIsPop(false);
                        }}>취소</li>
                    </ul>
                </div>
            </aside>
        )
    }

    useEffect(()=>{
        localStorage.setItem('albums', JSON.stringify(albums));
    },[])

    return (
        <main>
            <div className="inner">
                <button className="createBtn" ref={crudBtn} onClick={()=>setIsPop(true)}>create</button>

                <div className="container">
                    {
                        albums.map((music, index)=>{
                            if(index < 12){
                                return (
                                    <article key={index}>
                                            {
                                                music.enableUdate
                                                ?
                                                <>
                                                    <div className="wrap">
                                                        <div className="pic">
                                                            <img src={`${path}`+music.img} />
                                                        </div>
                                                        <div className="txt editTxt">
                                                            <input type="text" placeholder="제목을 입력하세요." defaultValue={music.title} ref={editTitle} />
                                                            <input type="text" placeholder="아티스트를 입력하세요." defaultValue={music.artist} ref={editArtist} />
                                                            <input type="text" placeholder="음악 장르를 입력하세요." defaultValue={music.janre} ref={editJanre} />
                                                            <audio src={`${path}`+music.mp3}></audio>
                                                        </div>
                                                    </div>
                                                    <ul className="enableBtns">
                                                        <li onClick={()=>updateAlbum(index)}>입력</li>
                                                        <li onClick={()=>disableUpdate(index)}>취소</li>
                                                    </ul>
                                                </>
                                                :
                                                <>
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
                                                    <ul className="enableBtns">
                                                        <li onClick={()=>enableUdate(index)}>수정</li>
                                                        <li onClick={()=>deleteAlbum(index)}>삭제</li>
                                                    </ul>
                                                </>
                                            }
                                    </article>
                                )
                            }
                        })
                    }
                </div>
            </div>
            {isPop ? <Popup /> : null}
        </main>
    )
}

export default Main;