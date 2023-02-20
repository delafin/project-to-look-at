import {useState} from 'react';
import '../settings.css';

export default function InputEmail({closeEmailInputModal, verifyEmail}){

    const [email, setEmail] = useState('');

    const submitEmail = (e) => {
        e.preventDefault()

        fetch("https://tothemoonexperts-api.herokuapp.com/profile/email-change", {
            method: 'POST',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({"email": email})
        }).then(
            res => console.log(res)
        ).then(
            () => {
                closeEmailInputModal()
                verifyEmail()
            }
        ).catch(
            err => console.log(err)
        )
    };

    return (
        <div className="phone-settings-container">
            <div className="phone-settings">
                <div className="phone-settings-title">
                    <h1>Change email</h1>
                </div>

                <form>
                    <div className="country">
                        <label>New email</label>
                        <input type="email" required
                            placeholder='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="but">
                        <button className="but1" onClick={() => closeEmailInputModal()}>Cancel</button>
                        <button className="but2" onClick={submitEmail}>Next</button>
                    </div>
                </form>
            </div>
        </div>
    )
}