import {useState} from 'react';
import {Form} from 'react-bootstrap';
import '../settings.css';
import data from '../../../Data/CountryCodes.json';

export default function Phone({cancel, clickcontinue}){

    const [countryCode, setCountryCode] = useState('');
    const [phone, setPhone] = useState('');

    const handleCancel = () => {
        cancel()
    };

    const handleContinue = (e) => {
        e.preventDefault()
        let value = countryCode + phone
        
        fetch('https://tothemoonexperts-api.herokuapp.com/profile/send-otp', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({"phone_number": value})
        }).then(
            res => console.log(res)
        ).then(
            () => {
                cancel()
                clickcontinue()
            }
        ).catch(e => console.log(e))
    };

    return (
        <div className="phone-settings-container">
            <div className="phone-settings">
                <div className="phone-settings-title">
                    <h1>Add phone number</h1>
                </div>

                <form>
                    <h2>Enter your phone number to continue.</h2>

                    <div className="country">
                        <div className="col-sm-12 col-md-6 mt-3">
                            <label>Country</label>
                            <Form.Group controlId="formGridState">
                                <Form.Select defaultValue="Select" className="select" onChange={(e) => setCountryCode(e.target.value)}>
                                    <option value="Select">Select country</option>
                                    {data.map((val, i) =>
                                        <option value={val.dial_code} key={i}>{val.dial_code} - {val.name}</option>
                                    )}
                                </Form.Select>
                            </Form.Group>
                        </div>
                    </div>

                    <div className="number">
                        <label>Phone number</label>
                        <input type="number" required
                            placeholder='7251234..'
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>

                    <h3>A 4-digit verification code will be sent to this phone number.</h3>
                    <div className="but">
                        <button className="but1" onClick={handleCancel}>Cancel</button>
                        <button className="but2" onClick={handleContinue}>Continue</button>
                    </div>
                </form>
            </div>
        </div>
    )
}