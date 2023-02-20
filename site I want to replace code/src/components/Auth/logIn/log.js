import React, {useState, useEffect, useCallback} from 'react';
import './login.css';
import {Link, useNavigate} from 'react-router-dom';
import logo from '../../images/logo2.png';

export default function Log() {

    const [details, setDetails] = useState({
        email: '',
        password: ''
    });

    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        document.title = 'To The Moon Experts - Login'
    },[]);

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

    const handleGoogleLogin = useCallback(() => {
        const googleAuthUrl = "https://accounts.google.com/o/oauth2/v2/auth"
        const redirectUrl = "https://tothemoonexperts-api.herokuapp.com/profile/google-auth"

        const scope = [
            'https://www.googleapis.com/auth/userinfo.email',
            'https://www.googleapis.com/auth/userinfo.profile'
        ].join(' ');

        const params = {
            response_type: 'code',
            client_id: "768211345539-bq85dcpdb2q9bfolcgk8t2tmb1hui65d.apps.googleusercontent.com",
            redirect_uri: `${redirectUrl}`,
            prompt: 'select_account',
            access_type: 'offline',
            scope
        };

        const urlParams = new URLSearchParams(params).toString();

        window.location = `${googleAuthUrl}?${urlParams}`;

    }, []);

    const navigate = useNavigate();

    if (redirect) {
        return navigate('/dashboard/orders', {replace: true})
    };

    return (
        <div className='login__container'>
            <div className="login-form">
                <form onSubmit={handleSubmit}>
                    <h2>Login to your account</h2>
                    <input type='email'
                        placeholder='Email'
                        value={details.email}
                        onChange={e => setDetails(details => ({
                            ...details, email: e.target.value
                        }))}
                    />
                    <input type='password'
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
                        <Link to="/forgot-password"><p>Forgot password?</p></Link>
                    </div>
                    <input type='submit' value='Log in' />
                </form>
                    <div className='line1'>
                        <div className='line2'></div>
                        <h5>OR</h5>
                        <div className='line3'></div>
                    </div>

                    <div className="google-btn">
                        <button className="google-button" onClick={handleGoogleLogin}>
                        <div className="google-icon-wrapper">
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 48 48">
                            <g>
                                <path fill="#EA4335"
                                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z">
                                </path>
                                <path fill="#4285F4"
                                d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z">
                                </path>
                                <path fill="#FBBC05"
                                d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z">
                                </path>
                                <path fill="#34A853"
                                d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z">
                                </path>
                                <path fill="none" d="M0 0h48v48H0z"></path>
                            </g>
                            </svg>
                        </div>
                            <p className="google-button-text">Sign in with Google</p>
                        </button>
                    </div>

                    <h3>Don't have an account yet? <Link to="/register"><span>Register here</span></Link></h3>

                
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