import { IconButton } from '@material-ui/core';
import { Call, CopyrightSharp, Facebook, Instagram, Mail, Map, Twitter } from '@material-ui/icons';
import React from 'react';
import './style.scss';

function Footer() {
    return (
        <div className="footer">
            <div class="content__top">
                <div class="item">
                    <IconButton className="IconButton">
                        <Call />
                    </IconButton>
                    <p>(+84)9035 10314</p>
                </div>
                <div class="item" >
                    <IconButton className="IconButton">
                        <Mail />
                    </IconButton>
                    <p>longnguyenckltk@gmail.com</p>
                </div>
                <div class="item">
                    <IconButton className="IconButton">
                        <Map />
                    </IconButton>
                    <p>xxx-xxx-xxx</p>
                </div>
            </div>

            <div class="content__center">
                <div class="item">
                    <IconButton>
                        <Instagram />
                    </IconButton>
                    <IconButton>
                        <Twitter />
                    </IconButton>
                    <IconButton>
                        <Facebook />
                    </IconButton>
                </div>
                <div class="item">
                    <h3>Categorys</h3>
                    <p>Laptop</p>
                    <p>Smart Phone</p>
                </div>
                <div class="item">
                    <h3>Subscribe</h3>
                    <input placeholder="Email" variant="outlined" className="input_mail" />
                </div>

            </div>
            <div class="content__bottom">
                <p>CoppyRight 2021</p>
                <p> <CopyrightSharp /></p>
            </div>
        </div>
    )
}

export default Footer
