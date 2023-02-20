import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import '../logIn/login.css';
import logo from '../../images/logo2.png';

export default function PasswordChange(){

    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [token, setToken] = useState('');

    const [redirect, setRedirect] = useState(false);
    const [validators, setValidators] = useState('');

    useEffect(() => {
        const url = window.location.pathname
        const field = url.split('/')
        const token1 = field[2]
        setToken(token1)
    },[]);

    const handleErrors = () => {

        let matchError = ''

        if(password !== password2){
            matchError = 'Passwords do not match'
        }

        if(matchError){
            setValidators(matchError)
            return false
        }
        return true
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        const isValid = handleErrors()

        if (isValid){
            fetch("https://tothemoonexperts-api.herokuapp.com/password_reset/confirm/", {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    'token': token,
                    'password': password
                })
            }).then(
                res => {
                    res.json().then(data => {
                        if(data.status !== 'OK'){
                            setValidators(data.password[0])
                        }else{
                            alert('Password Changed successfully')
                            setRedirect(true)
                        }
                    })
                }
            ).catch(err => console.log('failed' + err))
        }
    };

    const navigate = useNavigate();

    if (redirect) {
        return navigate('/log', {replace: true})
    };

    return(
        <div className='login__container'>
            <div className="verification-content">
                <div className="error-box" style={{display: validators.length > 0 ? 'block' : 'none'}}>
                    <h3>{validators}</h3>
                </div>
                <h4>Password Change</h4>
                <form onSubmit={handleSubmit}>
                    <input type='password' required
                        placeholder='New Password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <input type='password' required
                        placeholder='Confirm New Password'
                        value={password2}
                        onChange={e => setPassword2(e.target.value)}
                    />
                    <input type='submit' 
                        value="Submit"
                    />
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
        </div>
    )
}