import {useState, useEffect} from 'react';
import './myprofile.css';
import {library} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';
import {Button} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import box from '../../images/open-box.png';
import '../Profile/profile.css';

library.add(faUser)

export default function MyProfile({handleEditProfile}){

    const [orders, setOrders] = useState([]);
    const [details, setDetails] = useState({
        nickname: '',
        profile: ''
    });
    const [ref, setRef] = useState('');

    useEffect(() => {
        async function fetchOrders(){
            const data = await fetch("https://tothemoonexperts-api.herokuapp.com/dashboard/all-orders", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${localStorage.getItem('token')}`
                }
            });

            const res = await data.json()
            console.log(res)
            setOrders(res)
        }

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
            const pk = res.map(user => user.id)
            setDetails(prevState => ({
                ...prevState, nickname: nickname[0]
            }));
            setDetails(prevState => ({
                ...prevState, profile: profilepic[0]
            }));
            setRef(pk)
        }

        fetchUser()
        fetchOrders()
    },[]);

    function formatDate(date){
        let date1 = new Date(date)

        return date1.toString().slice(4, 15)
    };

    function payrate(){
        if (orders.length > 0){
            console.log('orders' + orders)
            let paid_orders = orders.filter(order => order.complete === true)
            return ((paid_orders.length / orders.length) * 100).toString().slice(0, 5)
        }else{
            return 0
        }
    };
    console.log(details)
    return (
        <div className="myprofile-container">
            <div className="myprofile">
                <div className="myprofile-title">
                    <h1>My profile</h1>
                    <button onClick={() => handleEditProfile()}>Edit profile</button>
                </div>

                <div className="myprofile-display">
                    <div className="thumbnail">
                        {details.profile === null ?
                            <div className="i">
                                <FontAwesomeIcon icon={faUser} />
                            </div>
                            :
                            <div className='j'>
                                <img src={details.profile} alt="profile-pic" />
                            </div>
                        }

                        <div className="myprofile-username">
                            <h3>{details.nickname === null ? ref : details.nickname}</h3>
                            {/* <h4>Member since: Oct 14</h4> */}
                        </div>
                    </div>

                    <div className="myprofile-orders">
                        <ul>
                            <li>
                                <h3>{orders && orders.length}</h3>
                                <h5>Orders</h5>
                            </li>
                            <div className="slash"></div>
                            <li>
                                <h3>{payrate()}%</h3>
                                <h5>Pay rate</h5>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="last-orders">
                    <h1>Previous orders</h1>
                    <ul>
                        <li>Order</li>
                        <li>Date</li>
                        <li>Status</li>
                        <li>Paid</li>
                    </ul>
                    {orders.length === 0 ? 
                        <div className="active-order" style={{top: '0'}}>
                            <img src={box} alt="open-box" />
                            <h3>You have no previous orders</h3>
                            <p style={{color: '#ddd', fontSize: '14px', letterSpacing: '1px'}}>All the orders you create will appear here.</p>
                            <Link to="/dashboard/placeorder" style={{textDecoration: 'none'}}><Button variant="contained" size="small" startIcon={<AddCircleOutlineIcon />}>Place order</Button></Link>
                        </div>
                        :
                        <div className="all-orders">
                            {orders.map((order, i) => 
                                <ul key={i}> 
                                    <li>{order.id}</li>
                                    <li>{formatDate(order.updated_at)}</li>
                                    <li>{order.status}</li>
                                    {order.complete === false ? <li>-</li> : <li>${order.details.amount}</li>}
                                </ul>
                            )}
                        </div>
                    }
                </div>

            </div>
        </div>
    )
}