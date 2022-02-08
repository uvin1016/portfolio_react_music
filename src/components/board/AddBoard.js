import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useState } from 'react';
import { db, storage } from '../../FirebaseConfig';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddBoard() {
    const [formData, setFormData] = useState({
        title: "",
        artist: "",
        janre: "",
        comment: "",
        image: "",
        createAt: Timestamp.now().toDate()
    });

    const handleChange = e=>{
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleImageChange = e=>{
        setFormData({...formData, image: e.target.files[0]});
    }

    const handleSubmit = e=>{
        if(!formData.title || !formData.artist || !formData.janre || !formData.image){
            alert('필수사항을 입력해주세요.');
            return;
        }
        const storageRef = ref(storage,`images/${Date.now()}${formData.image.name}`);
        const uploadImage =  uploadBytesResumable(storageRef, formData.image);
        uploadImage.on("state_changed", ()=>{
            setFormData({
                title: "",
                artist: "",
                janre: "",
                comment: "",
                image: ""
            });

            getDownloadURL(uploadImage.snapshot.ref)
            .then((url)=>{
                const albumRef = collection(db, "articles");
                addDoc(albumRef,{
                    title: formData.title,
                    artist: formData.artist,
                    janre: formData.janre,
                    comment: formData.comment,
                    imgurl: url,
                    createAt: Timestamp.now().toDate() 
                })
                .then(()=>{
                    toast.success("업로드에 성공했습니다.");
                })
                .catch(()=>{
                    toast.error("업로드에 실패했습니다.");
                });
            })
        });

    }

    return (
        <div className='createBox'>
            <label htmlFor="">Title</label>
            <input type="text" name='title' value={formData.title} onChange={e=>handleChange(e)} />
            <label htmlFor="">Artist</label>
            <input type="text" name='artist' value={formData.artist} onChange={e=>handleChange(e)} />
            <label htmlFor="">Janre</label>
            <input type="text" name='janre' value={formData.janre} onChange={e=>handleChange(e)} />
            <label htmlFor="">Comment</label>
            <textarea name='comment' value={formData.comment} onChange={e=>handleChange(e)} />
            <label htmlFor="">Image</label>
            <input type="file" name="image" accept='image/*' onChange={e=>handleImageChange(e)} />
            <button onClick={handleSubmit}>create</button>
        </div>
    )
}