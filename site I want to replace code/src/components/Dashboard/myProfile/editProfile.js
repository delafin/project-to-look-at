import {useState, useEffect} from 'react';
import './myprofile.css';
import {library} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons';

library.add(faUser)

export default function EditProfile(){

    const [details, setDetails] = useState({
        nickname: '',
        profile: ''
    });

    useEffect(() => {
        async function fetchUser(){
            const data = await fetch('https://tothemoonexperts-api.herokuapp.com/profile/cur', {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${localStorage.getItem('token')}`
                }
            });

            const res = await data.json()
            const nickname = res.map(user => user.nickname)
            const profilepic = res.map(user => user.profile)
            setDetails(prevState => ({
                ...prevState, nickname: nickname[0]
            }));
            setDetails(prevState => ({
                ...prevState, profile: profilepic[0]
            }))
        };

        fetchUser()
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('nickname', details.nickname)
        formData.append('profile', details.profile, details.profile.name)

        fetch('https://tothemoonexperts-api.herokuapp.com/profile/nickname', {
            method: 'PUT',
            headers: {
                "Authorization": `Token ${localStorage.getItem('token')}`
            },
            body: formData
        }).then(
            res => console.log(res)       
        ).then(() => {
            window.location.reload()
        }).catch(
            err => console.log(err)
        )
    };

    return(
        <div className="edit-container">
            <h1>Edit profile</h1>
            <div className="edit">
                <div className="edit-wrap">
                    <form>
                        <div className="upload">
                            {details.profile === null ?
                                <div className="i">
                                    <FontAwesomeIcon icon={faUser} />
                                </div>
                                :
                                <div className='j'>
                                    <img src={details.profile} alt="profile-pic" />
                                </div>
                            }

                            <input type="file" required
                                onChange={(e) => setDetails(prevState => ({
                                    ...prevState, profile: e.target.files[0]
                                }))}
                            />
                        </div>

                        <div className="username">
                            <label>Username:</label>
                            <input type='text' required
                                value={details.nickname}
                                onChange={(e) => setDetails(prevState => ({
                                    ...prevState, nickname: e.target.value
                                }))}
                            />
                        </div>
                    </form>
                </div>

                <div className="update-btn">
                    <button onClick={handleSubmit}>Update</button>
                </div>
            </div>
        </div>
    )
}