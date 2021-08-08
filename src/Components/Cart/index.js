import { IconButton } from '@material-ui/core';
import { Add, ArrowLeft, Close, Remove } from '@material-ui/icons';
import firebase from 'firebase';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import db from '../../Firebase';
import { ChangeQuantity, RemoveError, RemoveToCart } from '../../Redux/cartSlice';
import Nav from '../Home/Nav';
import './style.scss';


function Cart({ user }) {
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();
    console.log({ cart });
    const [total, setTotal] = useState(0);
    const history = useHistory();
    const [city, setCity] = useState('');

    const options = ["City 1", "City 2", "City 3", "City 4"];

    const handleChangeValueSelect = (value) => {
        const selected = document.querySelector('.selected');
        const optionContainer = document.querySelector('.option__container');

        selected.innerHTML = value.toUpperCase();
        optionContainer.classList.remove('active');
        setCity(selected.innerHTML);
    }

    const handleActiveSelect = () => {
        const item = document.querySelector('.option__container');
        item.classList.toggle('active');
    }

    const handleRemoveProduct = (id) => {
        console.log(id)
        const action = RemoveToCart(id);
        dispatch(action)
    }

    const handleChangeQuantity = (id, type) => {
        const action = ChangeQuantity({
            id: id,
            type: type
        });
        dispatch(action);
    }

    useEffect(() => {

        if (cart.data) {
            setTotal(
                cart.data.reduce((a, b) => {
                    return a + b.product.price * b.quantity;
                }, 0)
            )
        }
        if (cart.data.length <= 0) {

            const timeOut = () => setTimeout(() => {
                alert("Giỏ hàng trống! Chúng tôi sẽ chuyển đến trang shopping!");
                history.push('/smartphone');
            }, 500)
            timeOut();
        }
        if (cart.error) {
            if (cart.error === "max") {
                alert("Số lượng bạn nhập quá số lượng còn của sản phẩm");
                dispatch(RemoveError());
            }
            if (cart.error === "min") {
                const check = window.confirm("Bạn muốn xóa sản phẩm khỏi giỏ hàng? ")
                console.log({ check })
                if (check === true) {
                    dispatch(RemoveToCart(cart.remove));
                    dispatch(RemoveError());
                }
                dispatch(RemoveError());
            }
        }



    }, [cart, dispatch])

    const handleCheckout = () => {
        if (!user) {
            const check = window.confirm("Vui lòng đăng nhập để đặt hàng");
            check && history.push('/login')
        } else {
            if (city === '') {
                alert("Vui lòng chọn thành phố!")
            } else {

                db.collection('historis').add({
                    email: user.email,
                    cartList: cart.data,
                    timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
                    total: total,
                    city: city,
                    note: 'confirm',
                });
                alert("Đơn hàng đang chờ xác nhận");

            }

        }

    }

    const handleMoveDetail = (id) => {
        history.push(`/smartphone/${id}`);
    }
    return (
        <div className="cart">
            <Nav />
            <div className="cart__list">
                <div className="cart__title">
                    <h2>Shopping </h2>
                    <h3>{cart.data.length} items </h3>
                </div>
                <div className="main__content">

                    <div className="item title">
                        <h3>Sản phẩm</h3>
                        <h3>Số lượng</h3>
                        <h3>Đơn giá</h3>
                        <h3>Thành tiền</h3>
                        <h3>Thao tác</h3>
                    </div>
                    {
                        (cart.data.length > 0) ? (

                            cart.data.map(item => (
                                <div className="item" key={item.product.id}>
                                    <div className="item__info">
                                        <img onClick={() => handleMoveDetail(item.product.id)} src={item.product?.images[0]} alt="img" />
                                        <h3 onClick={() => handleMoveDetail(item.product.id)}>{item.product.title}</h3>
                                    </div>
                                    <div className="quantity">

                                        <IconButton onClick={() => handleChangeQuantity(item.product.id, "remove")} className="control__quantity remove"><Remove /></IconButton>
                                        <p>
                                            {item.quantity}
                                        </p>
                                        <IconButton onClick={() => handleChangeQuantity(item.product.id, "add")} className="control__quantity add"><Add /> </IconButton>

                                    </div>
                                    <div className="price" style={{ marginTop: "8px" }}>
                                        $ <strong>{Math.round(item.product.price * 100) / 100}</strong>
                                    </div>
                                    <div className="price__total" style={{ marginTop: "8px" }}>
                                        $ <strong>{Math.round(item.quantity * item.product.price * 100) / 100}</strong>
                                    </div>
                                    <div>
                                        <IconButton className="button__remove" onClick={() => handleRemoveProduct(item.product.id)} ><Close /></IconButton>
                                    </div>
                                </div>
                            ))

                        ) : (
                            <img style={{ margin: "0 auto" }} width="500px" src="./Assets/empty.png" alt="empty" />
                        )
                    }


                </div>
            </div>

            <div className="total">
                <div className="cart__title">
                    <h2>Order summary </h2>
                </div>
                <div className="cart__totalPrice">
                    <h3>{cart.data.length} items</h3>

                    <h2>
                        Tổng tiền: $ {Math.round(total * 100) / 100}
                    </h2>
                </div>
                <div className="content">
                    <label><strong>Thành phố:</strong></label>
                    <div className="custom-select">
                        <div className="select__box">
                            <div className="option__container ">
                                {options.map((item, index) => (
                                    <div onClick={() => handleChangeValueSelect(item)} className="option" key={index}>
                                        <input type="radio" className="radio" id={item} name="sort" />
                                        <label for={item.toUpperCase()} >{item.toUpperCase()}</label>
                                    </div>
                                ))}
                            </div>
                            <div className="selected" onClick={handleActiveSelect}>
                                choose city
                            </div>
                        </div>
                    </div>
                    <label><strong>Mã khuyến mãi:</strong></label>
                    <input className="input__code" style={{ display: "block" }} type="text" placeholder="Mã khuyến mãi:" />
                    <button className="apply__code">Apply</button>
                </div>
                <div style={{ display: "flex" }}>

                    <button onClick={handleCheckout} className="button__checkout">Checkout</button>
                </div>

            </div>

            <Link className="goback" to="/smartphone"><ArrowLeft /> Continue shopping</Link>
        </div>
    )
}

export default Cart
