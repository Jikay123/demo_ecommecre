import React from 'react';
import Footer from '../Footer';
import Category from './Category';
import Contact from './Contact';
import Feedback from './Feedback';
import './home.scss';
import HotProduct from './HotProduct';
import Nav from './Nav';
import Slideshow from './Slideshow';

function Home() {

    return (
        <div>
            <Nav />
            <Slideshow />
            <HotProduct />
            <Category />
            <Feedback />
            <div id="contact" style={{ height: "20px" }}></div>
            <Contact />
            <Footer />
        </div>
    )
}

export default Home
