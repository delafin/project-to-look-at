import React, {useEffect, useState} from 'react';
import '../logIn/login.css';
import {useNavigate} from 'react-router-dom';
import logo from '../../images/logo2.png';

export default function EmailVerifyLogin() {

    const [details, setDetails] = useState({
        email: '',
        password: ''
    });

    const [valid, setValid] = useState(0);
    const [emailToken, setEmailToken] = useState('');

    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        const url = window.location.pathname
        const field = url.split('/')
        const token = field[2]

        if (token) {
            setEmailToken(token)
        }

        fetch('https://tothemoonexperts-api.herokuapp.com/profile/validate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({email_token: emailToken})
        }).then(
            res => res.json()
        ).then(
            res => {
                if (res.status === 'success') {
                    setValid(1)
                } else if (res.status === 'failed') {
                    setValid(2)
                }
            }
        ).catch(err => console.log(err))
    }, [emailToken])

    const handleSubmit = (e) => {
        e.preventDefault()

        fetch('https://tothemoonexperts-api.herokuapp.com/profile/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(details)
        }).then(
            res => {
                console.log(res)
                res.json().then(data => {
                    if(data.token){
                        localStorage.setItem('token', data.token)
                        setRedirect(!redirect)
                    }
                    if(!data.token){
                        alert('Wrong credentials')
                    }
                })
            }
        ).catch(error => console.log(error))
    };

    const navigate = useNavigate();

    if (redirect) {
        return navigate('/dashboard/orders', {replace: true})
    }

    return (
        <div className='login__container'>
            {valid === 1 
                ?
                    <>
                        <div className="login-form">
                            <form onSubmit={handleSubmit}>
                                <h2>Login to your account</h2>
                                <input type='email' required 
                                    placeholder='Email'
                                    value={details.email}
                                    onChange={e => setDetails(details => ({
                                        ...details, email: e.target.value
                                    }))}
                                />
                                <input type='password' required 
                                    placeholder='Password'
                                    value={details.password}
                                    onChange={e => setDetails(details => ({
                                        ...details, password: e.target.value
                                    }))}
                                />
                                <div className="forgot-password">
                                    <div className="check-btn">
                                        <input type='checkbox' />
                                        <label>Remember me</label>
                                    </div>
                                    <p>Forgot password?</p>
                                </div>
                                <input type='submit' value='Log in' />

                            </form>
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
                    </>
                :

                    <div className='login__container'>
                        <div className="verification-content">
                            <h3>Email Verification Failed!</h3>
                            <h5>Email may be already verified or the link is broken.</h5>
                            <button>Re-send link to my email</button>
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
            }

        </div>
    )
}