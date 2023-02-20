import React, {useState, useEffect} from 'react';
import './order.css';
import '../Profile/profile.css';
import box from '../../images/open-box.png';
import {Link} from 'react-router-dom';
import {Button} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

function Recent({handleInfo}) {

    const [recentOrders, setRecentOrders] = useState([]);

    useEffect(() => {
        fetchData()
    }, []);

    async function fetchData(){
        const data = await fetch('https://tothemoonexperts-api.herokuapp.com/dashboard/list', {
            method: 'GET',
            headers: {
                'Authorization': `Token ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        })
        const res = await data.json()
        console.log(res)
        setRecentOrders(res)
    };

    function calculateDeadline(creationDate, deliveryTime) {
        const deadline = new Date(creationDate);
        if (deliveryTime === '4 Hours') {
          deadline.setHours(deadline.getHours() + 4);
        } else if (deliveryTime === '8 Hours') {
          deadline.setHours(deadline.getHours() + 8);
        } else if (deliveryTime === '24 Hours') {
          deadline.setDate(deadline.getDate() + 1);
        } else if (deliveryTime === '2 Days'){
          deadline.setDate(deadline.getDate() + 2);
        } else if (deliveryTime === '3 Days') {
          deadline.setDate(deadline.getDate() + 3);
        } else if (deliveryTime === '5 Days') {
          deadline.setDate(deadline.getDate() + 5);
        } else if (deliveryTime === '7 Days') {
          deadline.setDate(deadline.getDate() + 7);
        } else if (deliveryTime === '14 Days') {
          deadline.setDate(deadline.getDate() + 14);
        }
        return deadline.toString().slice(0, 25);
      };          

    return (
        <>
            {recentOrders.length >= 1 ? recentOrders.map(recent => (
                <div className='recent' key={recent.details.id}>
                <div className='recent-details'>
                    <h4>{recent.details.discipline} / See paper instructions</h4>
                    <p>#{recent.id} / {recent.details.pages} pages / {recent.details.academic_year}</p>
                    <p>Deadline: <span>{calculateDeadline(recent.created_at, recent.details.deadline)}</span>{recent.complete === false ? '(if you pay now)' : ''}</p>
                </div>
                
                <div className='recent-progress'>
                    <div className='payment'>
                        {recent.complete === false ? <button onClick={async () => {
                            await fetch(`https://tothemoonexperts-api.herokuapp.com/dashboard/status/${recent.id}`, {
                                method: 'PUT',
                                headers: {
                                    'Authorization': `Token ${localStorage.getItem('token')}`,
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({status: 'Canceled'})
                            })
                            fetchData()
                            }}
                        >Cancel order</button> : <div></div>}
                    <div className='verify'>
                        <button onClick={() => handleInfo(recent.id)}>{recent.complete === false ? 'Review & pay ' : 'Review '}<span>${recent.details.amount}</span></button>
                    </div>
                    </div>
                </div>
            </div>
            )) : 
                <div className="active-order">
                    <img src={box} alt="open-box" />
                    <h3>You have no active orders</h3>
                    <Link to="/dashboard/placeorder" style={{textDecoration: 'none'}}><Button variant="contained" size="small" startIcon={<AddCircleOutlineIcon />}>Place order</Button></Link>
                </div>
             }

        </>
    )
}

export default Recent;