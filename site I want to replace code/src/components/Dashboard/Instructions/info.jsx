import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import './info.css';

function Info({pk}){
    
    const [order, setOrder] = useState([]);
    const [ref, setRef] = useState([]);

    useEffect(() => {
        async function fetchData(){
            const data = await fetch(`https://tothemoonexperts-api.herokuapp.com/dashboard/recent/${pk}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Token ${localStorage.getItem('token')}`
                }
            })

            const res = await data.json()
            setOrder(res)
        }

        async function fetchOrder(){
            const data = await fetch(`https://tothemoonexperts-api.herokuapp.com/dashboard/recentorder/${pk}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Token ${localStorage.getItem('token')}`
                }
            })

            const res = await data.json()
            let id = res[0].details.id
            setRef(id)
        }
        fetchOrder()
        fetchData()
    },[pk])

    const handleReorder = async() => {
        await fetch(`https://tothemoonexperts-api.herokuapp.com/dashboard/status/${pk}`, {
            method: 'PUT',
            headers: {
            'Authorization': `Token ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({status: 'Recent'})
        })

        window.location.reload()
    };

    let checkout;

    order.forEach(stat => {
        if (stat.status === 'Recent' && stat.complete === false){      
            checkout = (
                <>
                    <Link to={`/order/pay/${ref}`} style={{textDecoration: 'none'}}><button>Proceed to Checkout</button></Link>
                </>
            )
        } else if(stat.status === 'Canceled'){
            checkout = (
                <>
                    <button onClick={handleReorder}>Re-order</button>
                </>
            )
        }
    });

    return (
        <>
        <div className='info'>
        <div className='paper_instructions'>
        <h1>ORDER <span style={{paddingLeft: '10px'}}>#{pk}</span></h1>
        {checkout}
        </div>
            <div className='pay'>
            {order.map(new_order => (
                <div className='order-info' key={new_order.id}>
                <ul>
                    <li>
                        <h1>Academic level</h1>
                        <h2>{new_order.details.academic_year}</h2>
                    </li>
                    <li>
                        <h1>Type of paper</h1>
                        <h2>{new_order.details.paper_type}</h2>
                    </li>
                    <li>
                        <h1>Discipline</h1>
                        <h2>{new_order.details.discipline}</h2>
                    </li>
                    <li style={{display: new_order.details.title === null ? 'none' : 'flex'}}>
                        <h1>Title</h1>
                        <h2>{new_order.details.title}</h2>
                    </li>
                    <li>
                        <h1>Paper format</h1>
                        <h2>{new_order.details.paper_format}</h2>
                    </li>

                    <li style={{display: new_order.details.references < 1 ? 'none' : 'flex'}}>
                        <h1>Number of Sources</h1>
                        <h2>{new_order.details.references}</h2>
                    </li>
                    <li style={{display: new_order.details.pages < 1 ? 'none' : 'flex'}}>
                        <h1>{new_order.details.pages} page(s) x $32.00</h1>
                        <h2>$64.00</h2>
                    </li>
                    <li style={{display: new_order.details.slides < 1 ? 'none' : 'flex'}}>
                        <h1>{new_order.details.slides} slide(s) x $32.00</h1>
                        <h2>$64.00</h2>
                    </li>
                    <li style={{display: new_order.details.charts < 1 ? 'none' : 'flex'}}>
                        <h1>{new_order.details.charts} chart(s) x $32.00</h1>
                        <h2>$64.00</h2>
                    </li>
                    <li>
                        <h1>Grand total price</h1>
                        <h2>${new_order.details.amount}</h2>
                    </li>
                </ul>
            </div>
            ))}
            </div>
        </div>
        </>
    )
}

export default Info;