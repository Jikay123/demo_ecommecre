import React, { useEffect, useState } from "react";
import { phones } from "../../Data/phones";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SimpleSlider = () => {
    const [listProduct, setListProduct] = useState([]);

    useEffect(() => {
        setListProduct(
            phones.filter((item, index) => (
                item.note
            ))
        );
    }, [])
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4
    };
    return (
        <Slider className="scroll" {...settings} >
            {listProduct.map((item) => (
                <div className="item" key={item.id}>
                    <img src={item.images[0]} alt="img" />
                </div>
            ))}


        </Slider>
    );
}
export default SimpleSlider;