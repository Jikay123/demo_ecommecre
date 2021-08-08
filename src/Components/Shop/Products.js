import { IconButton } from '@material-ui/core';
import { Apps, Search, ViewComfy } from '@material-ui/icons';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function Products({ value }) {

    const history = useHistory();
    const [listProduct, setListProduct] = useState([])
    const [readmore, setReadMore] = useState(true);
    const [length, setLength] = useState(6);
    const options = ["A -> Z", "Z -> A", "price ascing", "price descing"];
    const [style, setStyle] = useState(true)
    const [find, setFind] = useState('');
    const [sort, setSort] = useState('ALL');

    const timeFindRef = useRef(null);
    const numberRef = useRef(6);

    const filterBrand = useSelector(state => state.smartphone.brand);



    useEffect(() => {
        if (style) {
            setLength(6);
            numberRef.current = 6;
        } else {
            setLength(8);
            numberRef.current = 8;
        }
    }, [style])

    useEffect(() => {
        if (window.screen.availWidth < 767) {
            setLength(4);
            numberRef.current = 4;
        }
    }, [])

    const lengthList = (data) => {

        if (filterBrand.length === 0) {
            if (length <= data.length) {
                setListProduct(data.slice(0, length));
                setReadMore(true)
            } else {
                setListProduct(data);
                setReadMore(false);
            }
        } else {
            let listFilter = data.filter((item) => (filterBrand.includes(item.brand)))
            if (length <= data.length) {
                setListProduct(listFilter.slice(0, length));
                setReadMore(true)
            } else {
                setListProduct(listFilter);
                setReadMore(false);
            }
        }

    }



    const handleOnchangeFind = (e) => {
        const data = e.target.value;
        setFind(data)

        if (timeFindRef.current) {
            clearTimeout(timeFindRef.current);
        }

        timeFindRef.current = setTimeout(() => {
            productFind(data)
        }, 300)

    }

    const productFind = (name) => {
        const productFind = value.filter((item) => (
            item.title.toUpperCase().includes(name.toUpperCase())
        ))
        lengthList(productFind)
    }


    useEffect(() => {
        lengthList(value);
    }, [value, filterBrand, length])


    useEffect(() => {
        switch (sort) {
            case "A -> Z":
                const list = value.slice().sort((a, b) => (a.title > b.title) ? 1 :
                    ((b.title > a.title) ? -1 : 0))
                lengthList(list)
                break;
            case "Z -> A":
                let list1 = value.slice().sort((a, b) => (a.title > b.title) ? 1 :
                    ((b.title > a.title) ? -1 : 0))
                list1 = list1.reverse();
                lengthList(list1)
                break;

            case "PRICE ASCING":
                let list2 = value.slice().sort((a, b) => (a.price - b.price))
                lengthList(list2)
                break;
            case "PRICE DESCING":
                let list3 = value.slice().sort((a, b) => (a.price - b.price))
                list3 = list3.reverse();
                lengthList(list3)
                break;
            default:
                lengthList(value)
                break;
        }
    }, [sort, value])

    const readMore = () => {
        setLength(length + numberRef.current)
    }

    const changeViewDetail = (id) => {
        history.push(`/smartphone/${id}`);
    }

    const handleActiveSelect = () => {
        const item = document.querySelector('.option__container');
        item.classList.toggle('active');
    }
    const handleChangeValueSelect = (value) => {
        const selected = document.querySelector('.selected');
        const optionContainer = document.querySelector('.option__container');

        selected.innerHTML = value.toUpperCase();
        optionContainer.classList.remove('active');
        setSort(value.toUpperCase());
    }
    const handleChangeSearch = () => {
        const search = document.querySelector('.search');
        search.classList.toggle('active')
    }

    return (
        <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
            <div className="filter__product">
                <div className="search ">
                    <input placeholder="product name" className="input__search" value={find} onChange={handleOnchangeFind} />
                    <IconButton onClick={handleChangeSearch} className="button__search"><Search /></IconButton>
                </div>
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
                            choose item
                        </div>
                    </div>
                </div>
                <div className="style__products">
                    <IconButton onClick={() => setStyle(true)} className={"" + (style === true ? "active" : "")}>
                        <Apps />
                    </IconButton>
                    <IconButton onClick={() => setStyle(false)} className={"" + (style === false ? "active" : "")}>
                        <ViewComfy />
                    </IconButton>
                </div>

            </div>
            {listProduct.length > 0 ?
                (
                    <>
                        <div className={"ListProducts " + (style === false ? "active" : "unactive")}>
                            {
                                listProduct.map((item) => (

                                    <div key={item.id} className="item">
                                        <img style={{ cursor: "pointer" }} onClick={() => changeViewDetail(item.id)} className="item__img" src={item.images[0]} alt="img_product" />
                                        <div className="list__img">
                                            <h3 style={{ cursor: "pointer" }} onClick={() => changeViewDetail(item.id)} ><strong>{item.title}</strong></h3>
                                            <p><strong>$ {Math.round(item.price * 100) / 100}</strong></p>
                                            <div className="stars">
                                                {Array(item.stars).fill('_').map((star, index) => (
                                                    <p key={index}>⭐</p>
                                                ))}
                                            </div>
                                            <button onClick={() => changeViewDetail(item.id)} className="item__button">View Detail</button>

                                        </div>
                                    </div>
                                ))}
                        </div>
                        {readmore && (<button className="readMore" onClick={readMore}>ReadMore</button>)}
                    </>
                ) : (<div>
                    <h2>
                        Không tìm thấy sản phẩm
                    </h2>
                    <img width="800px" src="../Assets/notfound.png" alt="notfound" />
                </div>)}

        </div>
    )
}

export default Products
