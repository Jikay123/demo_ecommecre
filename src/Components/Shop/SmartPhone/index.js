import React, { useEffect, useState } from 'react'
import Nav from '../../Home/Nav';
import Products from '../Products';
import SlideBar from '../SlideBar';
import './style.scss';
import { phones } from '../../../Data/phones';
import Footer from '../../Footer/index';

function SmartPhone() {
    const [value, setValue] = useState([]);
    const [brand, setBrand] = useState([]);


    useEffect(() => {
        setValue(phones)
        setBrand(removeDuplicate(phones.map((item) => (item.brand))))
    }, [])

    const removeDuplicate = (arr) => {
        return arr.filter((value, index) =>
            arr.indexOf(value) === index
        );
    }



    return (
        <div className="smartphone">
            <Nav />
            <div className="contentMain">
                <SlideBar brand={brand} />
                <Products value={value} />
            </div>
            <Footer />
        </div>
    )
}

export default SmartPhone
