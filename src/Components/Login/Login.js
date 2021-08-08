import { IconButton } from '@material-ui/core';
import firebase from 'firebase';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import db, { auth } from '../../Firebase';
import './style.scss';

const providerGmail = new firebase.auth.GoogleAuthProvider();
const providerFB = new firebase.auth.FacebookAuthProvider();
function Login() {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

    const handleChangeMovePage = () => {
        const login = document.querySelector(".login");
        const section = document.querySelector("section");
        login.classList.toggle('active');
        section.classList.toggle('active');
    }

    const loginWithGmail = async () => {
        const data = await auth.signInWithPopup(providerGmail);
        const { additionalUserInfo, user } = data;
        if (additionalUserInfo.isNewUser) {
            db.collection('users').add({
                displayName: user.displayName,
                providerId: additionalUserInfo.providerId,
                photoURL: user.photoURL,
                email: user.email,
                timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
                uid: user.uid,
            })
        }
        if (data) {
            history.push('/')
        }
    }
    const loginWithFB = async () => {
        const data = await auth.signInWithPopup(providerFB);
        const { additionalUserInfo, user } = data;
        if (additionalUserInfo.isNewUser) {
            db.collection('users').add({
                displayName: user.displayName,
                providerId: additionalUserInfo.providerId,
                photoURL: user.photoURL,
                email: user.email,
                timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
                uid: user.uid,
            })
        }
        if (data) {
            history.push('/')
        }
    }

    const handleSignUp = (e) => {
        e.preventDefault();
        auth.createUserWithEmailAndPassword(email, password)
            .then((authUser) => {
                return (
                    db.collection('users').add({
                        displayName: userName,
                        email: email,
                        providerId: "email/password",
                        timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
                        uid: authUser.user.uid
                    }),
                    authUser.user.updateProfile({
                        displayName: userName
                    }),
                    handleChangeMovePage()
                )
            })
            .catch((e) => alert(e.message))

    }
    const handleLogin = (e) => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(email, password)
            .then((authUser) => (

                authUser && (
                    console.log("login success!"),
                    history.push('/')
                )

            ))
            .catch((e) => alert(e.message))
    }

    useEffect(() => {
        auth.onAuthStateChanged((userAuth) => {
            if (userAuth) {
                history.push('/');
            }
        })
    }, [history])

    return (
        <section>
            <div className="login">
                <div className="user signinBx">
                    <div className="imgBx">
                        <img src="Assets/bg1.jpeg" alt="img1" />
                    </div>
                    <div class="formBx">
                        <form onSubmit={handleLogin}>
                            <h2>Sign In</h2>
                            <input onChange={(e) => setEmail(e.target.value)} value={email} type="text" placeholder="email" />
                            <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="password" />
                            <input type="submit" value="Login" />
                            <p className="signup">Bạn chưa có tài khoản? <a href="##" onClick={handleChangeMovePage} >Sign Up.</a></p>
                            <h3 className="text__title" >Đăng nhập với</h3>
                            <div style={{ textAlign: "center" }} className="signin__social">
                                <IconButton onClick={loginWithFB}>
                                    <img width="25px" src="https://cdn3.iconfinder.com/data/icons/capsocial-round/500/facebook-512.png" alt="img" />
                                </IconButton>
                                <IconButton onClick={loginWithGmail}>
                                    <img width="25px" src="https://cdn.iconscout.com/icon/free/png-256/google-2981831-2476479.png" alt="img" />
                                </IconButton>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="user signupBx">

                    <div class="formBx">
                        <form onSubmit={handleSignUp}>
                            <h2>Create an account</h2>
                            <input onChange={(e) => setEmail(e.target.value)} value={email} type="text" placeholder="Email" />
                            <input onChange={(e) => setUserName(e.target.value)} value={userName} type="text" placeholder="User " />
                            <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="Create password" />
                            <input onChange={(e) => setConfirmPass(e.target.value)} value={confirmPass} type="password" placeholder="Confirm password" />
                            <input className="buttonSignUp" type="submit" value="Sign Up" />
                            <p className="signin">Đã có tài khoản <a href="##" onClick={handleChangeMovePage}>Sign In.</a></p>
                        </form>
                    </div>
                    <div className="imgBx">
                        <img src="Assets/bg2.jpeg" alt="img2" />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login
