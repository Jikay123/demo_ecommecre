import React, { useEffect, useRef, useState } from 'react';
import { auth, storage } from '../../Firebase';

function Profile({ user }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [progress, setProgress] = useState(0);
    const [urlImg, setUrlImg] = useState('');
    const fileRef = useRef(null)


    useEffect(() => {
        setName(user.displayName);
        setEmail(user.email);
        setPhone(user.phoneNumber ? user.phoneNumber : '');
        setUrlImg(user.photoURL);
    }, [user])

    const handleChangeFile = (e) => {
        let link = '';
        if (e.target.files[0]) {
            link = e.target.files[0];
            if (user) {
                const uploadTask = storage.ref(`images/${link.name}`).put(link);
                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        const tmp = Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        setProgress(tmp);
                    },
                    (error) => {

                        console.error(error.message);
                    },
                    () => {
                        storage.ref('images')
                            .child(link.name)
                            .getDownloadURL()
                            .then(url => {
                                setUrlImg(url);
                            })
                    }
                )
            }
        }

    }

    const handleSave = () => {
        auth.onAuthStateChanged((userAuth) => (
            userAuth.updateProfile({
                displayName: name,
                email: email,
                phoneNumber: phone,
                photoURL: urlImg,
            })
        ))

    }

    const handleClickTrigger = () => {
        fileRef.current.click();
    }


    return (
        <div className="profile__content">
            <div className="profile__content--top">
                <h2>Hồ sơ của tôi</h2>
            </div>
            <div className="profile__content--main">
                <form className="profile__content--form">
                    <div className="form__item">
                        <label>Tên đăng nhập:</label>
                        <input value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="form__item">
                        <label>Email:</label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="form__item">
                        <label>Số điện thoại:</label>
                        <input value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </div>

                </form>
                <div className="profile__form--image">
                    <img src={urlImg ? urlImg : user.photoURL} alt="" onClick={handleClickTrigger} />

                    <input id="file" ref={fileRef} type="file" onChange={handleChangeFile} />
                    <p>Dung lượng file tối đa 1MB</p>
                    <p>Định dạng: .JPEG, .PNG </p>
                    <progress style={{ display: 'block', width: '200px' }} value={progress} max={100} />
                </div>
                <button className="button" onClick={handleSave} disabled={(name && email) ? false : true}>Save</button>

            </div>

        </div>
    )
}

export default Profile
