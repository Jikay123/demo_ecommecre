import React from 'react'
import { Button, TextField } from '@material-ui/core'

function Contact() {
    return (
        <div className="contact" >
            <div className="title" >
                <h1>Contact Us</h1>
            </div>
            <div className="content">
                <div className="content__left">
                    <div className="item">

                        <h2>Hà nội</h2>
                        <h3>Address: xx-xxx-xxx-xxxx</h3>
                        <h3>PhoneNumber: (+84)xxx xxx xxx</h3>
                        <h3><strong>infor123@gmail.com</strong></h3>
                    </div>
                    <div className="item">

                        <h2>Đà nẵng</h2>
                        <h3>Address: xx-xxx-xxx-xxxx</h3>
                        <h3>PhoneNumber: (+84)xxx xxx xxx</h3>
                        <h3><strong>infor123@gmail.com</strong></h3>

                    </div>
                    <div className="item">
                        <h2>TP.Hồ Chí Minh</h2>
                        <h3>Address: xx-xxx-xxx-xxxx</h3>
                        <h3>PhoneNumber: (+84)xxx xxx xxx</h3>
                        <h3><strong>infor123@gmail.com</strong></h3>

                    </div>
                </div>
                <div className="content__right">

                    <h2>Get in touch </h2>
                    <p>Góp ý của bạn là động lực của chúng tôi</p>
                    <TextField label="Name" />
                    <TextField label="Email address" />
                    <TextField label="Message" />
                    <Button className="button__send" variant="contained">
                        Send
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Contact
