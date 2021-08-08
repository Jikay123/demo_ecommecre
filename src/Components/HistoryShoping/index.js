import { IconButton } from '@material-ui/core';
import { AccountCircle, ChevronRight, ListAlt, LocalAtm, Search } from '@material-ui/icons';
import { formatRelative } from 'date-fns';
import firebase from 'firebase';
import React, { useEffect, useState } from 'react';
import db from '../../Firebase';
import ScrollTop from '../../ScrollTop';
import Footer from '../Footer';
import Nav from '../Home/Nav';
import Profile from './Profile';
import './style.scss';

function HistoryShoping({ user }) {
    const [listValue, setListValue] = useState([]);
    const [item, setItem] = useState('order');
    const [tabs, setTabs] = useState(false);
    const [chooseTab, setChooseTab] = useState('all');
    const [open, setOpen] = useState(false);


    useEffect(() => {
        if (user) {
            db.collection('historis').orderBy('timeStamp', 'desc').onSnapshot((snapshot) => {
                let listNew = [...snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))];

                switch (chooseTab) {
                    case 'all':
                        window.scrollTo(0, 0);
                        listNew = listNew.filter((value) => (value.data?.email === user.email))
                        setListValue(listNew)
                        break;
                    case 'confirm':
                        window.scrollTo(0, 0);
                        listNew = listNew.filter((value) => {
                            if (value.data?.note) {

                                return (value.data?.email === user.email && value.data?.note === 'Đang chờ duyệt')
                            }
                            return false;
                        })

                        setListValue(listNew)
                        break;
                    case 'pickup':
                        window.scrollTo(0, 0);
                        listNew = listNew.filter((value) => {
                            if (value.data?.note) {
                                return (value.data?.email === user.email && value.data?.note === 'Chờ lấy hàng')
                            }
                            return false;
                        })
                        setListValue(listNew)
                        break;
                    case 'delivered':
                        window.scrollTo(0, 0);
                        listNew = listNew.filter((value) => {
                            if (value.data?.note) {
                                return (value.data?.email === user.email && value.data?.note === 'Đang giao')
                            } return false;
                        })
                        setListValue(listNew)
                        break;
                    case 'received':
                        window.scrollTo(0, 0);
                        listNew = listNew.filter((value) => {
                            if (value.data?.note) {
                                return (value.data?.email === user.email && value.data?.note === 'Đã nhận')
                            }
                            return false;
                        })
                        setListValue(listNew)
                        break;
                    case 'canced':
                        window.scrollTo(0, 0);
                        listNew = listNew.filter((value) => {
                            if (value.data?.note) {
                                return (value.data?.email === user.email && value.data?.note === 'Đã hủy')
                            } return false;
                        })
                        setListValue(listNew)
                        break;
                    default:
                        break;
                }


            })
        }

    }, [user, chooseTab])

    const handleAddClass = (name) => {
        setItem(name);

    }

    const handleOrderAgain = (cartlist, city, email, total) => {

        const check = window.confirm("Bạn muốn mua lại đơn hàng này?", "Thông báo");
        if (check) {
            db.collection('historis').add({
                cartList: cartlist,
                city: city,
                email: email,
                total: total,
                note: 'Đang chờ duyệt',
                timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
            })
        }
    }

    const formatDate = (second) => {
        let formated = "";

        if (second) {
            formated = formatRelative(new Date(second * 1000), new Date());
            formated = formated.charAt(0).toUpperCase() + formated.slice(1);
        }

        return formated;
    }
    const handleCancelOrder = (id) => {
        db.collection('historis').doc(id).update({
            note: 'Đã hủy'
        })
        // console.log(id);
    }

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 60) {

                setTabs(true);
            } else {
                setTabs(false);
            }
            return () => {
                window.removeEventListener("scroll");
            }
        })
    }, [])

    return (
        <div className="history">
            <Nav />
            <div className="content">
                <div className={"left " + (open ? 'active' : '')}>
                    <div className="info">
                        <img src={user.photoURL} alt="avatar" />
                        <h3>{user.displayName}</h3>
                    </div>
                    <div className="items">
                        <div className="item" onClick={() => handleAddClass("account")}>
                            <AccountCircle />
                            <p className={"account " + (item === "account" ? "active" : "")} >Tài khoản</p>
                        </div>
                        <div className="item" onClick={() => handleAddClass("order")}>
                            <ListAlt />
                            <p className={"order " + (item === "order" ? "active" : "")} >Đơn hàng</p>
                        </div>

                    </div>
                    <IconButton onClick={() => setOpen(!open)} className="open__tabs">
                        <ChevronRight className={"icon__open " + (open ? 'active' : '')} />
                    </IconButton>
                </div>
                <div className="right">
                    <div className={"listOrder " + (item === 'order' ? 'active' : '')} >
                        <div className={"tabs " + (tabs ? "sticky" : "")}>
                            <ScrollTop />
                            <button onClick={() => setChooseTab('all')} className={(chooseTab === 'all' ? "active" : "")}>Tất cả</button>
                            <button onClick={() => setChooseTab('confirm')} className={(chooseTab === 'confirm' ? "active" : "")}>Chờ xác nhận</button>
                            <button onClick={() => setChooseTab('pickup')} className={(chooseTab === 'pickup' ? "active" : "")}>Chờ lấy hàng</button>
                            <button onClick={() => setChooseTab('delivered')} className={(chooseTab === 'delivered' ? "active" : "")}>Đã giao</button>
                            <button onClick={() => setChooseTab('received')} className={(chooseTab === 'received' ? "active" : "")}>Đã nhận</button>
                            <button onClick={() => setChooseTab('canced')} className={(chooseTab === 'canced' ? "active" : "")}>Đã hủy</button>
                        </div>

                        {chooseTab === 'all' && (
                            <div className="formSearch">
                                <Search />
                                <input className="search__button" placeholder="search for ..." />
                            </div>
                        )}

                        {typeof (listValue) !== "undefined" && (
                            listValue.map((item) => (
                                <div className="item" key={item.id}>
                                    <div className="title">
                                        <p className="title__id">{item.id}</p>
                                        <p className="title__time">{formatDate(item.data?.timeStamp?.seconds)}</p>
                                        <p className="note">{!item.data.note ? "Đang chờ duyệt" : item.data.note}</p>
                                    </div>

                                    {item.data?.cartList?.map((product, index) => (

                                        <div className="content" key={index}>
                                            <img src={product.product?.images[0]} alt="images" />
                                            <div className="info__product">
                                                <p className="info__title">{product.product?.title}</p>
                                                <p className="info__category">{product.product?.category.toUpperCase()}</p>
                                                <p className="info__brand">{product.product?.brand.toUpperCase()}</p>
                                                <p className="info__quantity">X{product.quantity}</p>
                                            </div>
                                            <h3>$ {Math.round(product.product?.price * 100) / 100 * product.quantity} </h3>
                                        </div>

                                    ))}
                                    <div className="total">

                                        <div className="money">
                                            <LocalAtm />
                                            <p>
                                                Tổng tiền:
                                            </p>
                                            <h3>$ {Math.round(item.data?.total * 100) / 100}</h3>
                                        </div>
                                        <div className="buttons">
                                            <h4>{item.data.note}</h4>
                                            <div>
                                                <button onClick={() => handleOrderAgain(item.data.cartList, item.data.city, item.data.email, item.data.total)} className="button__again">Mua lần nữa </button>
                                                {item.data.note === 'confirm' && (<button onClick={() => handleCancelOrder(item.id)} className="button__cancel">hủy đơn</button>)}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            ))
                        )}
                        {
                            (typeof (listValue) === "undefined" || listValue.length === 0) && (
                                <img className="empty" width="910px" src="../Assets/empty.png" alt="img" />
                            )
                        }
                    </div>
                    <div className={"profile " + (item === 'account' ? 'active' : '')}>
                        <Profile user={user} />
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default HistoryShoping
