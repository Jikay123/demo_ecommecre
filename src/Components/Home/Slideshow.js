import { Button, IconButton } from '@material-ui/core'
import { ChevronLeft, ChevronRight } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { slideData } from '../../Data/slide'

function Slideshow() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const length = slideData.length;

    useEffect(() => {
        const loop = setInterval(() => {
            setCurrentSlide(currentSlide === length - 1 ? 0 : currentSlide + 1);
        }, 10000);
        return () => clearInterval(loop);
    }, [currentSlide, length])

    if (!Array.isArray(slideData) || slideData.length <= 0) {
        return null;
    }

    const handlePrev = () => {
        // clearTimeout(timeslide);
        setCurrentSlide(currentSlide === 0 ? length - 1 : currentSlide - 1);
        // clearTimeout(timeslide);

    }
    const handleNext = () => {
        // clearTimeout(timeslide);
        setCurrentSlide(currentSlide === length - 1 ? 0 : currentSlide + 1);

    }

    const handleClickDot = (index) => {
        setCurrentSlide(index);
    }



    return (
        <div className="slide">
            <div className="slide__list">
                {slideData.map((item, index) => (
                    <div className={index === currentSlide ? 'slide__item active' : 'slide__item'} key={index}>
                        {index === currentSlide && (
                            <div>
                                <img src={item} alt="slideImage" className="imgSlide" />
                                <div className="text">
                                    <h1>Welcome to website</h1>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis reiciendis ducimus dignissimos iure aliquam exercitationem necessitatibus assumenda unde consectetur tempora.</p>
                                    <Button href="#hot" className="button__view" variant="contained" >View</Button>
                                </div>
                            </div>

                        )}

                    </div>
                ))}

                <div className="slide__button">
                    <IconButton onClick={handlePrev} className="button__left">
                        <ChevronLeft />
                    </IconButton>
                    <IconButton onClick={handleNext} className="button__right">
                        <ChevronRight />
                    </IconButton>
                </div>
                <ul className="dot">
                    {slideData.map((item, index) => (
                        <IconButton key={index} onClick={() => handleClickDot(index)}>
                            <li className={index === currentSlide ? 'dot__item active' : 'dot__item'} key={index}
                                alt={item}>
                            </li>
                        </IconButton>


                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Slideshow
