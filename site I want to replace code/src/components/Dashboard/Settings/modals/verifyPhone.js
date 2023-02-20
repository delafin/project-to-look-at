import {useState, useRef} from 'react';
import '../settings.css';

export default function VerifyPhone({close}){

    const [otpCode, setOTPCode] = useState(['', '', '', '']);
    const [error, setError] = useState('');

    const inputRefs = useRef([]);
    inputRefs.current = []

    const handleSubmit = (e) => {
        e.preventDefault()
        const otp = otpCode.join('')

        fetch("https://tothemoonexperts-api.herokuapp.com/profile/verify-otp", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({"otp_code": otp})
        }).then(
            res => {
                res.json().then(data => {
                    if(data.status === 'success'){
                        alert('Phone number is successfully verified')
                        window.location.reload()
                        close()
                    }
                    if(data.status === 'failed'){
                        setError('failed')
                    }
                })
            }
        ).catch(e => console.log(e))
    };

    return (
        <div className="phone-settings-container">
            <div className="phone-settings">
                <div className="phone-settings-title">
                    <h1>Verify phone number</h1>
                </div>

                <form>
                    <h2 style={{textAlign: 'center'}}>Enter the 4-digit code, <br />that was sent to you via SMS.</h2>
                    {error === 'failed' && 
                        <h5 style={{textAlign: 'center', fontSize: '14px', color: '#d63447'}}>OTP verification failed</h5>
                    }
                    <div className="otp">
                        {otpCode.map((code, i) => (
                                <input type="text"
                                    key={i}
                                    ref={el => (inputRefs.current[i] = el)}
                                    pattern="[0-9]*"
                                    required
                                    value={code}
                                    maxLength={1}
                                    onChange={e => {
                                        const updatedCode = [...otpCode];
                                        updatedCode[i] = e.target.value;
                                        setOTPCode(updatedCode);

                                        if (e.target.value) {
                                            inputRefs.current[i + 1].focus();
                                        }
                                    }}
                                />
                            ))
                        }
                    </div>

                    <h4>Re-send code</h4>
                    <div className="but">
                        <button className="but1" onClick={() => close()}>Cancel</button>
                        <button className="but2" onClick={handleSubmit}>Verify</button>
                    </div>
                </form>
            </div>
        </div>
    )
};