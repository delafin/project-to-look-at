import {useEffect, useState} from 'react';
import './notification.css';
import bell from '../../images/bell.png';

export default function Notification({socket}){

    const [orderId, setOrderId] = useState(null);
    const [curUserId, setCurUserId] = useState(null);
    const [userId, setUserId] = useState(null);
    const [notification, setNotification] = useState(null);

    const [curUserNotifications, setCurUserNotifications] = useState([]);

    useEffect(() => {
        async function fetchData(){
            const data = await fetch('https://tothemoonexperts-api.herokuapp.com/profile/cur', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `token ${localStorage.getItem('token')}`
                }
            })

            const res = await data.json()
            const userpk = res.map(em => em.id)
            setCurUserId(userpk[0])
        };

        async function fetchNotifications(){
            const data = await fetch(`https://tothemoonexperts-chatserver.herokuapp.com/notifications/${curUserId}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const res = await data.json()
            setCurUserNotifications(res)
        }
        fetchData()

        if(curUserId !== null){
            fetchNotifications()
        }
    },[curUserId])

    useEffect(() => {
        if(userId !== null && curUserId !== null){
            if(curUserId === userId && notification !== null){
                setCurUserNotifications((prev) => [...prev, notification])
            }
        }

    }, [orderId, userId, curUserId, notification]);

    useEffect(() => {
        if(socket){
            socket.on("new_order", handleNewOrder);
        };

        return () => {
            if (socket) {
              socket.off("new_order", handleNewOrder);
            }
          };
    },[socket]);

    const handleNewOrder = (data) => {
        setUserId(data.user_id)
        setOrderId(data.order_id)
        setNotification({
            data: data.content,
            notifyDate: new Date().toISOString()
        })
    };

    function formatDate(date){
        let date1 = new Date(date)

        return date1.toString().slice(4, 15)
    };

    return(
        <div className="notify-container">
            <div className="notify">
                <div className="title">
                    <h1>Notifications</h1>
                </div>
                {curUserNotifications.length > 0 ?
                    <div className="new-notification">
                        {curUserNotifications.map((notify, i) => 
                            <div className="details" key={i}>
                                <div className="spot"></div>
                                <div className="notification-content">
                                    <h4>{notify.data}</h4>
                                    <h5>{formatDate(notify.notifyDate)}</h5>
                                </div>
                            </div>
                        )}
                    </div>
                    :
                    <div className="notifications-container">
                        <div className="notifications">
                            <img src={bell} alt="bell" />
                            <h2>You have no Notifications.</h2>
                            <p>Notifications for new orders, order updates and new messages, will appear here.</p>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}