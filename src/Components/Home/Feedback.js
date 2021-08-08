import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import { feedback } from '../../Data/feedback';

function Feedback() {
    const [value, setValue] = useState([])


    useEffect(() => {
        setValue(feedback);
    }, [])

    var settings = {
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
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
                    slidesToShow: 1.35,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 320,
                settings: {
                    slidesToShow: 1.3,
                    slidesToScroll: 1,
                }
            }

        ]
    };


    return (
        <div className="feedback">
            <Slider {...settings}>
                {value.map((item, index) => (
                    <div className="item" key={index} >
                        <p className="item__text">{item?.text}</p>
                        <img src={item?.logo} alt="logo__feedback" className="item__logo" />
                    </div>
                ))}

            </Slider>

        </div>
    )
}

export default Feedback
