import React from 'react';
import './payment.css';
import {Link} from 'react-router-dom'
import success from '../images/check (1).png';
import creditcard from '../images/debit-cards.png';

function Success(){
    return (
        <div className="pay-form-container" style={{paddingTop: '50px'}}>
            <div className='pay-form'>
                <div className='success'>
                    <h1>Thank You!</h1>
                    <img src={success} alt='success'/>
                    <h1>Your payment was Successful</h1>
                    <p>You will receive an email with the order details.</p>
                    <Link to='/dashboard/orders' style={{textDecoration: 'none'}}><button>View Order</button></Link>
                </div>
                <div className='price'>
                    <img src={creditcard} alt="credit cards" />
                    <div className="card-content">
                        <h2>Enter Card Details</h2>
                        <p>Enter card details to proceed with this payment</p>
                        <p>Add your phone number to receive important SMS notifications <br/> about your order(s) and account.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Success;