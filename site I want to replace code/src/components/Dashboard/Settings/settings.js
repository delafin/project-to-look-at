import React, {useState, useEffect} from 'react';
import './settings.css';
import {Modal} from '@mui/material';
// import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
// import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
// import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import Phone from './modals/phone';
import Email from './modals/email';
import VerifyPhone from './modals/verifyPhone';
import VerifyEmail from './modals/verifyEmail';
import InputEmail from './modals/inputEmail';

export default function Settings() {

    const [openEmailModal, setOpenEmailModal] = useState(false);
    const [openPhoneModal, setOpenPhoneModal] = useState(false);
    const [openVerifyPhoneModal, setOpenVerifyPhoneModal] = useState(false);
    const [openVerifyEmailModal, setOpenVerifyEmailModal] = useState(false);
    const [openInputEmailModal, setOpenInputEmailModal] = useState(false);

    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');

    useEffect(() => {
        async function fetchUser(){
            const data = await fetch("https://tothemoonexperts-api.herokuapp.com/profile/cur", {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${localStorage.getItem('token')}`
                }
            })
            const res = await data.json()
            const userEmail = res.map(cur_user => cur_user.email);
            const userPhone = res.map(cur_user => cur_user.phone);
            const user_name = res.map(cur_user => cur_user.name);

            const names = user_name[0].split(' ')
            let first = names[0]
            let last = names[1]
            console.log(first)
            setFirstName(first)
            setLastName(last)

            setPhone(userPhone)
            setEmail(userEmail)
        }
        fetchUser()
    },[]);

    function cancel(){
        setOpenPhoneModal(false)
    };

    function clickcontinue(){
        setOpenVerifyPhoneModal(true)
    };

    function closePhoneVerify(){
        setOpenVerifyPhoneModal(false)
    }

    // password modal
    function submitEmail(){
        setOpenInputEmailModal(true)
    };

    function verifyEmail(){
        setOpenVerifyEmailModal(true)
    }

    function closePasswordModal(){
        setOpenEmailModal(false)
    };

    function closeEmailInputModal(){
        setOpenInputEmailModal(false)
    };

    function closeVerifyEmailModal(){
        setOpenVerifyEmailModal(false)
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        const name = firstname + ' ' + lastname
        fetch("https://tothemoonexperts-api.herokuapp.com/profile/update-usernames", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({"name": name})
        }).then(res => console.log(res)).then(
            () => {
                alert("Names updated successfully")
                window.location.reload()
            }
        ).catch(
            e => console.log(e)
        )
    };

    return (
        <div className="settings">
            <div className="settings-page">

                <Modal open={openEmailModal} onClose={() => setOpenEmailModal(false)}>
                    <Email submitEmail={submitEmail} closePasswordModal={closePasswordModal} />
                </Modal>

                <Modal open={openPhoneModal} onClose={() => setOpenPhoneModal(false)}>
                    <Phone cancel={cancel} clickcontinue={clickcontinue} />
                </Modal>

                <Modal open={openVerifyPhoneModal} onClose={() => setOpenVerifyPhoneModal(false)}>
                    <VerifyPhone close={closePhoneVerify}/>
                </Modal>

                <Modal open={openVerifyEmailModal} onClose={() => setOpenVerifyEmailModal(false)}>
                    <VerifyEmail closeVerifyEmailModal={closeVerifyEmailModal}/>
                </Modal>

                <Modal open={openInputEmailModal} onClose={() => setOpenInputEmailModal(false)}>
                    <InputEmail closeEmailInputModal={closeEmailInputModal} verifyEmail={verifyEmail}/>
                </Modal>

                <div className="settings-title">
                    <h2>Settings</h2>
                </div>

                {/* <div className="settings-options">
                    <ul>
                        <li>
                            <ManageAccountsOutlinedIcon style={{fontSize: '20px'}}/>
                            <h5>General</h5>
                        </li>
                        <li>
                            <LockOpenOutlinedIcon style={{fontSize: '20px'}} />
                            <h5>Sign-in & security</h5>
                        </li>
                        <li>
                            <NotificationsOutlinedIcon style={{fontSize: '20px'}} />
                            <h5>Notifications</h5>
                        </li>
                    </ul>
                </div> */}

                <div className="account-settings">
                    <h3>Account</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="name">
                            <div className="first-name">
                                <label>First name:</label>
                                <input type='text' required 
                                    placeholder='First name'
                                    value={firstname}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </div>
                            <div className="last-name">
                                <label>Last name:</label>
                                <input type='text' required 
                                    placeholder='Last name'
                                    value={lastname}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="save-btn">
                            <input type='submit' value='Update' />
                        </div>
                    </form>
                </div>

                <div className="email-setting">
                    <h3>Email</h3>
                    <div className="view-emails">
                        <h5>{email}</h5>
                        <h4>Verified</h4>
                        <button onClick={() => setOpenEmailModal(true)}>Change</button>
                    </div>
                </div>

                <div className="phone-setting" style={{paddingBottom: '50px'}}>
                    <div className="add-phone">
                        <h3>Phone number</h3>
                        {phone.length < 1 && 
                            <button onClick={() => setOpenPhoneModal(true)}>Add phone number</button>
                        }
                    </div>

                    {phone.length > 0 ?
                        <div className="email-setting" style={{margin: '0'}}>
                            <div className="view-emails">
                                <h5>{phone}</h5>
                                <h4>Verified</h4>
                                <button onClick={() => setOpenPhoneModal(true)}>Change</button>
                            </div>
                        </div>
                        :
                        <div className="no-phone">
                            <h4>You have no Phone Number associated with your account</h4>
                            <p>Add a phone number to help keep your account secure.</p>
                        </div>
                    }

                </div>

            </div>
        </div>
    )
}