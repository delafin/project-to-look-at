import React from 'react';
import '../logIn/login.css';
import {Link} from 'react-router-dom';
import logo from '../../images/logo2.png';

export default function Verify() {

    const email = localStorage.getItem('email')

    return (
        <div className='login__container'>
            <div className="verification-content">
                <h3>Check your inbox</h3>
                <h5>Verification link has been sent to your <br/> email <span>{email}</span>. Click the <br/> link to activate your account.</h5>
                <button>Re-send link to my email</button>

                <div className="change-email">
                    <h4>Want to register with another email? <br/><Link to="/register"><span>Go back to registration</span></Link></h4>
                </div>
            </div>

            <div className='login-hero'>
                <div className="login-hero-content">
                    <div className='logo'>
                        <img src={logo} alt="logo" />
                    </div>

                    <div className='content-container'>
                        <h4>WRITING SERVICE AT YOUR CONVENIENCE</h4>
                        <h2>Top Essay Writing Service <br/> with Professional Essay Writers</h2>
                    </div>
                </div>
            </div>

        </div>
    )
}