import { Button } from '@material-ui/core';
import { TrendingFlat } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Slider from "react-slick";
import { phones } from '../../Data/phones';

function HotProduct() {
    const [listProduct, setListProduct] = useState([]);
    const [number, setNumber] = useState(0);
    const history = useHistory();

    useEffect(() => {
        setListProduct(
            phones.filter((item, index) => (
                item.note
            ))
        );
        if (window.screen.availWidth < 767) {
            setNumber(2);
        } else {
            setNumber(4);
        }

    }, [number])

    var settings = {
        infinite: false,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 4,
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
                    slidesToShow: 1.95,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 375,
                settings: {
                    slidesToShow: 1.68,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 320,
                settings: {
                    slidesToShow: 1.38,
                    slidesToScroll: 1,
                }
            }

        ]
    };
    const handleViewDetail = (id) => {
        history.push(`/smartphone/${id}`)
    }
    return (
        <div className="hotprd" id="hot">
            <div className="hotprd__top">
                <h2>Hot Product</h2>

            </div>
            <Slider {...settings} >
                {listProduct.map((item) => (
                    <div className="item" key={item.id}>
                        <img src={item.images[0]} alt="img" className="item__img" />
                        <div className="info">
                            <h3>{item.title}</h3>
                            <div className="stars">
                                {Array(item.stars).fill('_').map((star, index) => (

                                    <p key={index}>⭐</p>

                                ))}
                            </div>
                            <p className="price">
                                $ {Math.round(item.price * 100) / 100}
                            </p>
                            <Button onClick={() => handleViewDetail(item.id)} className="button__view" variant="contained">View detail</Button>

                        </div>
                    </div>
                ))}


            </Slider>

            <Button onClick={() => history.push('/smartphone')} variant="contained" className="goto">Goto shop <TrendingFlat /></Button>
        </div>
    )
}

export default HotProduct