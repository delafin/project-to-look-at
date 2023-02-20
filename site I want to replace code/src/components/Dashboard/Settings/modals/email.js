import {useState, useEffect} from 'react';
import '../settings.css';

export default function Email({submitEmail, closePasswordModal}){

    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });

    useEffect(() => {
        async function fetchUser(){
            const data = await fetch("https://tothemoonexperts-api.herokuapp.com/profile/cur", {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${localStorage.getItem('token')}`
                }
            });

            const res = await data.json()
            const userEmail = res.map(user => user.email)
            setCredentials(prevState => ({
                ...prevState, email: userEmail[0]
            }));
        };

        fetchUser()
    }, []);

    const submitPassword = (e) => {
        e.preventDefault()

        fetch('https://tothemoonexperts-api.herokuapp.com/profile/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(credentials)
        }).then(
            res => {
                res.json().then(data => {
                    if(data.token){
                        localStorage.setItem('token', data.token)
                        submitEmail()
                        closePasswordModal()
                    }
                    if(!data.token){
                        alert('Wrong credentials')
                        closePasswordModal()
                    }
                })
            }
        ).catch(err => console.log(err))
    };

    return (
        <div className="phone-settings-container">
            <div className="phone-settings">
                <div className="phone-settings-title">
                    <h1>Change email</h1>
                </div>

                <form>
                    <h2>For security reasons you need to enter your password</h2>

                    <div className="country">
                        <label>Password</label>
                        <input type="password" required
                            placeholder="Enter your account password"
                            value={credentials.password}
                            onChange={(e) => setCredentials(prevState => ({
                                ...prevState, password: e.target.value
                            }))}
                        />
                    </div>

                    <div className="but">
                        <button className="but1" onClick={() => closePasswordModal()}>Cancel</button>
                        <button className="but2" onClick={submitPassword}>Next</button>
                    </div>
                </form>
            </div>
        </div>
    )
}