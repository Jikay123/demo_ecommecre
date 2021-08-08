import React from 'react'
import { useHistory } from 'react-router-dom'

function Category() {
    const history = useHistory();
    return (
        <div className="category" style={{ paddingTop: "2.8rem" }}>
            <div className="item">
                <img src="Assets/lp1.jpg" alt="laptop__brand" className="category__lap" />
                <div className="item__hover">
                    <h3>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat, recusandae ratione. Esse officiis sunt mollitia! Fuga assumenda officia expedita inventore!</h3>
                    <button variant="contained" className="item__button">View All Product</button>
                </div>
            </div>
            <div className="item">
                <img src="Assets/1.jpeg" alt="smartphone__brand" className="category__smartphone" />
                <div className="item__hover">
                    <h3>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat, recusandae ratione. Esse officiis sunt mollitia! Fuga assumenda officia expedita inventore!</h3>
                    <button onClick={() => history.push('/smartphone')} variant="contained" className="item__button">View All Product</button>
                </div>
            </div>

        </div>
    )
}

export default Category
