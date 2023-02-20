import {useEffect} from 'react';
import './verify.css';

export default function EmailVerified(){

    useEffect(() => {
        const url = window.location.pathname
        const field = url.split('/')
        const token = field[2]

        fetch('https://tothemoonexperts-api.herokuapp.com/profile/email-validate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({'email_token': token})
        }).then(
            res => res.json()
        ).then(
            res => {
                if (res.status === 'success') {
                    alert("Email changed successfully")
                    window.location.replace("https://tothemoonexperts.com/dashboard/orders")
                } else if (res.status === 'failed') {
                    alert("Email change failed")
                    window.location.replace("https://tothemoonexperts.com/dashboard/orders")
                }
            }
        ).catch(err => console.log(err))
    }, []);

    return(
        <div></div>
    )
}