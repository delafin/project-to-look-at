import React, {useState, useEffect} from 'react';
import '../logIn/login.css';
import {useNavigate} from 'react-router-dom';
import logo from '../../images/logo2.png';

export default function ForgotPassword(){

    const [email, setEmail] = useState('');
    const [redirect, setRedirect] = useState(false);

    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        async function fetchUsers(){
            const users = await fetch('https://tothemoonexperts-api.herokuapp.com/profile/users', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const res = await users.json()
            setUsers(res)
        };
        fetchUsers()
    }, []);

    function handleErrors(){
        let existError = ''

        const userEmail = users.find(user => user.email === email)

        if(!userEmail){
            existError = 'User does not exist'
        }

        if(existError){
            setError(existError)
            return false
        }
        return true
    };

    const handleSubmit = (e) => {
        e.preventDefault()

        const isValid = handleErrors()

        if(isValid){
            fetch('https://tothemoonexperts-api.herokuapp.com/password_reset/', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email: email})
            }).then(
                res => console.log(res)
            ).then(
                setRedirect(!redirect)
            ).catch(err => console.log(err))
        }
    };

    const navigate = useNavigate();

    if (redirect) {
        return navigate('/email-verification', {replace: true})
    }

    return (
        <div className='login__container'>
            <div className="verification-content">
                <div className="error-box" style={{display: error.length > 0 ? 'block' : 'none'}}>
                    <h3>{error}</h3>
                </div>
                <h4>Enter your email to change password.</h4>
                <form onSubmit={handleSubmit}>
                    <input type='email' required
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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