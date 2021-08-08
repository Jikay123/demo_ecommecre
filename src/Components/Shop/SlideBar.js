import { ChevronRight } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterByBrand } from '../../Redux/filterSlice';

function SlideBar({ brand }) {
    const brands = useSelector(state => state.smartphone.brand);
    let phones_ = useSelector(state => state.smartphone.phoneList);
    const [listBrand, setListBrand] = useState([]);
    const [open, setOpen] = useState(true);

    const dispatch = useDispatch();
    console.log(brands, "12")
    console.log(phones_, "22")

    const clickCheckbox = (index, value) => {
        const check = document.getElementById(index);
        if (check.checked === true) {
            setListBrand([...listBrand, value])
            check.checked = true;
        } else {
            const newList = listBrand?.filter((item) => !value?.includes(item))
            if (newList) {
                setListBrand(newList);
            }
        }

    }
    const clickCheckboxAll = () => {
        const checkAll = document.getElementById("all");

        brand.map((item, index) => (document.getElementById(index).checked = false))
        if (checkAll.checked === true) {
            setListBrand([]);
        }
    }

    useEffect(() => {
        setOpen(false)
    }, [])
    useEffect(() => {
        const action = filterByBrand(listBrand);
        dispatch(action);
    }, [dispatch, listBrand])


    return (
        <div className={"slidebar " + (open ? 'active' : '')}  >
            <div className="brand">
                <h2 className="title">Brand</h2>
                <div className="item">
                    <input readOnly onClick={() => clickCheckboxAll()} checked={brands.length === 0} id="all" type="checkbox" value="all" />
                    <label className="label__checkbox" htmlFor="all" >ALL</label>
                </div>

                {brand.map((item, index) => (
                    <div className="item" key={index}>
                        <input readOnly onClick={() => clickCheckbox(index, item)} id={index} type="checkbox" value={item} />
                        <label className="label__checkbox" htmlFor={index}>{item} </label>
                    </div>
                ))}
                <div className="filter" onClick={() => setOpen(!open)}><ChevronRight className={"iconBack " + (open ? "active" : "")} /></div>
            </div>
        </div>
    )

}

export default SlideBar
