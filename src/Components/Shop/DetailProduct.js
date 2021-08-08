import { Button, IconButton } from '@material-ui/core';
import { Add, Dashboard, Facebook, Feedback, Instagram, Pinterest, Remove, Twitter } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import Slider from 'react-slick';
import { AddToCart } from '../../Redux/cartSlice';
import Footer from '../Footer';
import Nav from '../Home/Nav';
import { feedback } from '../../Data/feedback';

function DetailProduct() {
    const value = useSelector(state => state.smartphone.phoneList);
    const [product, setProduct] = useState({});
    const { idproduct } = useParams();
    const [hotproduct, setHotProduct] = useState([]);
    const [number, setNumber] = useState(0);
    const [ofBrand, setOfBrand] = useState([])

    const [length, setLength] = useState(4);
    const [quantity, setQuantity] = useState(1);
    const history = useHistory();
    const [tab, setTab] = useState('info');
    const [addBottom, setAddBottom] = useState(false);
    const dispatch = useDispatch();
    const [readmore, setReadmore] = useState(true);
    const [listFeedback, setListFeedback] = useState([]);
    const [numberFeedback, setNumberFeedback] = useState(3);

    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: length,
        slidesToScroll: length,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    autoplay: true,
                    autoplaySpeed: 5000,
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 425,
                settings: {
                    slidesToShow: 1.5,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 375,
                settings: {
                    slidesToShow: 1.5,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 320,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }

        ]
    };

    var settingsImgProduct = {
        dots: false,
        infinite: false,
        speed: 200,
        slidesToShow: 3,
        slidesToScroll: 1
    };


    useEffect(() => {
        const listProductHot = value.filter((item) => (item.note))

        setHotProduct(
            listProductHot.slice(0, 5)
        )

    }, [value])

    useEffect(() => {
        if (idproduct) {
            const listOfBrand = value.filter((item) => item.brand === product.brand)
            const topProduct = listOfBrand.filter((item) => item.id !== +idproduct)

            if (topProduct.length < 4) {
                setLength(topProduct.length);
            } else {
                setLength(4);
            }
            setOfBrand(topProduct)
            setProduct(
                ...value.filter(item => (item.id) === +idproduct)
            )


        }
    }, [value, idproduct, product])


    const handleAddToCart = () => {
        const action = AddToCart(
            {
                product: product,
                quantity: quantity
            }
        )
        dispatch(action);
        history.push('/cart')
    }
    const handlePlus = () => {
        if (quantity > 100) {
            return;
        } else
            if (quantity < 1) {
                setQuantity(1)
            } else {
                setQuantity(parseInt(quantity) + 1)
            }
    }
    const handleMinus = () => {
        if (quantity <= 1) {
            setQuantity(1)
        } else {
            setQuantity(parseInt(quantity) - 1)
        }
    }
    const handleOnBlur = () => {
        if (quantity <= 1) {
            setQuantity(1);
        }
    }
    const handleMoveDetail = (id) => {
        history.push(`/smartphone/${id}`)
    }

    const random = () => {
        let number = Math.floor(Math.random() * (10000 - 1) + 1);
        return number;
    }

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 700) {
                setAddBottom(true);
            } else {
                setAddBottom(false);
            }
            return () => {
                window.removeEventListener("scroll");
            }
        })
    }, [])

    useEffect(() => {
        let length = feedback.length;
        if (numberFeedback < length) {
            const list = feedback.slice(0, numberFeedback);
            setListFeedback(list)
            setReadmore(true);
        } else {
            setListFeedback(feedback);
            setReadmore(false);
        }
    }, [numberFeedback])

    return (
        <div className="detail">
            <Nav />

            {product !== {} && product.images && (
                <div className="detail__content">
                    <div className="img">
                        <img className="img__main" src={product?.images[number]} alt="imgMain" />
                        <Slider {...settingsImgProduct} >
                            {product.images.map((item, index) => (
                                <div key={item.id + random()} style={{ width: "100%" }}>
                                    <img width="100px" className={"img__item " + (number === index && "active")} onClick={() => setNumber(index)} src={item} alt="img__item" />
                                </div>
                            ))}

                        </Slider>
                    </div>
                    <div className="info">
                        <h2 className="info__title">{product.title}</h2>
                        <div className="stars">
                            {Array(product.stars).fill("_").map((item, index) => (
                                <p key={index + random()}>⭐</p>
                            ))}
                            <p className="quatity-Review">(120 lượt đánh giá)</p>
                        </div>
                        <h3 className="price">$ {Math.round(product.price * 100) / 100}</h3>
                        <p>{product.description}</p>
                        <div className="add__cart">
                            <div className="quantity">
                                <button onClick={handleMinus} className="icon__button remove"><Remove /> </button>
                                <input onBlur={handleOnBlur} className="input__quatity" onChange={(e) => setQuantity(e.target.value)} value={quantity} type="number" min="1" max="200" defaultValue="1" />
                                <button onClick={handlePlus} className="icon__button add"><Add /> </button>
                            </div>
                            <button className="button__add" onClick={handleAddToCart}>Add to card</button>
                        </div>
                        <p style={{ margin: "3px auto" }}><strong>Category: </strong> {product.category.toUpperCase()}</p>
                        <p style={{ margin: "3px auto" }}><strong>Brand: </strong> {product.brand.toUpperCase()}</p>
                        <div className="share">
                            <h4><strong>Share product :</strong></h4>
                            <div className="icon__share" style={{ marginLeft: "6rem" }}>
                                <IconButton className="icon__fb">
                                    <Facebook />
                                </IconButton>
                                <IconButton className="icon__instagram">
                                    <Instagram />
                                </IconButton>
                                <IconButton className="icon__twitter">
                                    <Twitter />
                                </IconButton>
                                <IconButton className="icon__pinterest">
                                    <Pinterest />
                                </IconButton>
                            </div>
                        </div>

                    </div>

                </div>
            )
            }
            <nav className="tabs">
                <Button onClick={(e) => setTab('info')} className={"tabs__label " + (tab === 'info' ? 'detail active' : '')} ><Dashboard /> <span className="text" >Infomation product</span></Button>
                <Button onClick={(e) => setTab('feedback')} className={"tabs__label " + (tab === 'feedback' ? 'review active' : '')} ><Feedback /> <span className="text">Feedback product</span></Button>
            </nav>
            <div style={{ display: "flex", justifyContent: 'center' }}>
                <section className={"detail__info " + (tab === 'info' ? 'active' : '')}>
                    {product !== {} && product.images && (
                        <div className="content__info">
                            <div className="info--detail">
                                <img width="800px" src={product.images[1]} alt="img" />
                                <div className="text">
                                    <h2>Lorem ipsum dolor sit amet consectetur</h2>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus delectus quas rem unde hic iusto officiis, est iure similique rerum accusamus illo odio cum dolore eveniet amet excepturi inventore fugit odit! Harum esse eos reprehenderit doloribus animi rerum distinctio officia. Consequuntur id, eius itaque, quo perferendis aperiam perspiciatis unde vel iure culpa corrupti reiciendis neque voluptatem! Magnam voluptate sapiente aut fugiat repudiandae maiores blanditiis illo inventore omnis quidem fuga, esse temporibus dolorum, nostrum cupiditate laudantium ea expedita ipsum! Laborum temporibus ipsam consequatur repellat ducimus, impedit alias minus neque aliquam omnis facere voluptatum, harum esse fugit optio explicabo fugiat eum suscipit?</p>
                                </div>
                            </div>
                            <div className="info--detail second">
                                <div className="text">
                                    <h2>Lorem ipsum dolor sit amet consectetur</h2>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus delectus quas rem unde hic iusto officiis, est iure similique rerum accusamus illo odio cum dolore eveniet amet excepturi inventore fugit odit! Harum esse eos reprehenderit doloribus animi rerum distinctio officia. Consequuntur id, eius itaque, quo perferendis aperiam perspiciatis unde vel iure culpa corrupti reiciendis neque voluptatem! Magnam voluptate sapiente aut fugiat repudiandae maiores blanditiis illo inventore omnis quidem fuga, esse temporibus dolorum, nostrum cupiditate laudantium ea expedita ipsum! Laborum temporibus ipsam consequatur repellat ducimus, impedit alias minus neque aliquam omnis facere voluptatum, harum esse fugit optio explicabo fugiat eum suscipit?</p>
                                </div>
                                <img src={product.images[2]} alt="img" />
                            </div>
                        </div>
                    )}
                </section>
                <section className={"detail__feedback " + (tab === 'feedback' ? 'active' : '')}>
                    {listFeedback.map((item, index) => (
                        <div className="feedback" key={index + random()}>
                            <img src={item.logo} alt="feedback" className="feedback__img" />
                            <p>{item.text}</p>
                        </div>
                    ))}

                    {readmore && (<button onClick={() => setNumberFeedback(parseInt(numberFeedback + 3))}>Read more</button>)}

                </section>

                <div className="product__top">
                    <h2>Top sản phẩm bán chạy</h2>
                    {hotproduct.map((item) => {
                        return (<div className="hotproduct" key={item.id + random()}>
                            <img className="hotproduct__img" src={item.images[0]} alt="img" />
                            <div onClick={() => handleMoveDetail(item.id)} className="hotproduct__info">
                                <h2>{item.title}</h2>
                                <div className="star">

                                    {Array(item.stars).fill(1).map((value, index) => (
                                        <p key={index + random()}>⭐</p>
                                    ))}
                                </div>
                                <h3>$ <strong>{Math.round(item.price * 100) / 100}</strong></h3>
                                <button className="brand__viewDetail">View Detail</button>
                            </div>
                        </div>);
                    })}
                </div>
            </div>
            {ofBrand.length > 0 && (
                <div className="product__brand">
                    <h2>Sản phẩm cùng hãng trong cửa hàng:</h2>
                    <Slider {...settings} >
                        {ofBrand.map(item => (
                            <div onClick={() => handleMoveDetail(item.id)} className="slide__brand" key={item.id + random()} style={{ width: "100%" }}>

                                <img className="brand__img" src={item.images[0]} alt="img" />
                                <div className="slide__brand--hover">
                                    <h2>{item.title}</h2>
                                    <div className="star">

                                        {Array(item.stars).fill(1).map((value, index) => (
                                            <p key={index + random()} >⭐</p>
                                        ))}
                                    </div>
                                    <h3>$ <strong>{Math.round(item.price * 100) / 100}</strong></h3>
                                    <button className="brand__viewDetail">View Detail</button>
                                </div>

                            </div>
                        ))}
                    </Slider>
                </div>
            )
            }
            {
                addBottom && (<div className="AddCartBottom">
                    <h3>{product.title}</h3>
                    <p>$<strong>{Math.round(product.price * 100) / 100}</strong></p>
                    <button onClick={handleAddToCart}>add to card</button>
                </div>)
            }

            <Footer />
        </div>
    )
}
export default DetailProduct
