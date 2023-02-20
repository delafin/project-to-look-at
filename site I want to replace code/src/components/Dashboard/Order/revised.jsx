import React, {useState, useEffect} from 'react';
import './order.css';
import '../Profile/profile.css';
import box from '../../images/open-box.png';
import {Link} from 'react-router-dom';
import {Button} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

function Revised({handleInfo}) {

    const [revisedOrders, setRevisedOrders] = useState([]);

    useEffect(() => {
        fetchData()
    }, [])

    async function fetchData(){
        const data = await fetch('https://tothemoonexperts-api.herokuapp.com/dashboard/revised', {
            method: 'GET',
            headers: {
                'Authorization': `Token ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        })
        const res = await data.json()
        setRevisedOrders(res)
    };

    return (
        <>
            {revisedOrders.length >= 1 ? revisedOrders.map(recent => (
                <div className='recent' key={recent.details.id}>
                    <div className='recent-details'>
                        <h4>{recent.details.discipline}/ See paper instructions</h4>
                        <p>#{recent.id} / {recent.details.pages} pages / {recent.details.academic_year}</p>
                        <p>Deadline: <span>Aug 18, 2022 at 8.25 AM (If you pay right now)</span></p>
                    </div>
                    
                    <div className='recent-progress'>
                        <div className='payment'>
                            <div className='verify'>
                                <button onClick={() => handleInfo(recent.id)}>Review <span>${recent.details.amount}</span></button>
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

export default Revised;