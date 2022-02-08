import { useState } from "react";
const deg = 30;

function Btns(props){
    let [index, setIndex] = useState(0);

    const plus = ()=>{
        initMusic();
        setIndex(++index);
        props.frame.current.style.transform=`rotate(${index*deg}deg)`;
    }

    const minus = ()=>{
        initMusic();
        setIndex(--index);
        props.frame.current.style.transform=`rotate(${index*deg}deg)`;
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

    return (
        <>
            <div className="btnPrev" onClick={plus}><span>PREV</span></div>
            <div className="btnNext" onClick={minus}><span>NEXT</span></div>
        </>
    )
}

export default Btns;