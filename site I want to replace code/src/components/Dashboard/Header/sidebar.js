import React, {useState, useEffect, useRef} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import './header.css';
import Button from '@mui/material/Button';
import {useLocation} from 'react-router-dom';
// import Cookies from 'js-cookie';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import CardGiftcardOutlinedIcon from '@mui/icons-material/CardGiftcardOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import SendIcon from '@mui/icons-material/Send';
import logo from '../../images/logo2.png';

import Prof from '../Profile/prof';
import Settings from '../Settings/settings';
import MyProfile from '../myProfile/myprofile';
import Messaging from '../Message/messaging';
import Notification from '../Notification/notification';
import EditProfile from '../myProfile/editProfile'; 
import Info from '../Instructions/info';

import {io} from "socket.io-client";

export default function SideBar() {

    // messaging states
    const [email, setEmail] = useState(null);
    const [userSenderID, setUserSenderID] = useState(null);
    const [userReceiverID, setUserReceiverID] = useState(null);
    const [customers, setCustomers] = useState([]);
    const [socket, setSocket] = useState(null);

    const [curMessage, setCurMessage] = useState(''); 
    const [messages, setMessages] = useState(null);
    const [conversation, setConversation] = useState([]);
    const [oldMessages, setOldMessages] = useState([]);
    const [curChat, setCurChat] = useState(null);

    // Sidebar states
    const [activeOrders, setActiveOrders] = useState([]);

    const [order, setOrder] = useState(true);
    const [setting, setSetting] = useState(false);
    const [profile, setProfile] = useState(false);
    const [info, setInfo] = useState(false);
    const [messaging, setMessaging] = useState(false);
    const [infoId, setInfoId] = useState(null);
    const [notify, setNotify] = useState(false);
    const [edit, setEdit] = useState(false);

    const [flapChat, setFlapChat] = useState(false);

    const [redirect, setRedirect] = useState(false);
    const [groupedMessages, setGroupedMessages] = useState([]);
    const [identity, setIdentity] = useState(null);

    // handle slide nav
    const [isExpanded, setIsExpanded] = useState(false);

    // profile modal
    const [open, setOpen] = useState(false);

    const [tokenAvailable, setTokenAvailable] = useState(false);

    const scrollRef = useRef();
    const location = useLocation();

    useEffect(() => {
        const query = new URLSearchParams(location.search)
        const auth_method = query.get('authentication')
        const checkToken = async () => {

            const data = await fetch('https://tothemoonexperts-api.herokuapp.com/profilee/google-auth-user', {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const res = await data.json()
            if(res.token){
                localStorage.setItem('token', res.token);
                setTokenAvailable(true)
            }else{
                setTimeout(checkToken, 500);
            }
        }

        if(auth_method === 'google-auth'){
            checkToken()
        }
    },[location.search]);

    useEffect(() => {
        document.title = 'To The Moon Experts - Dashboard'

        async function fetchData(){
            const data = await fetch('https://tothemoonexperts-api.herokuapp.com/dashboard/list', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${localStorage.getItem('token')}`,
                }
            })
            const res = await data.json()
            setActiveOrders(res)
        }
        if(tokenAvailable){
            fetchData()
        }
    }, [tokenAvailable]);

    // get conversations of user
    useEffect(() => {
        async function getConversation(){
            try{
                const data = await fetch(`https://tothemoonexperts-chatserver.herokuapp.com/conversations/${userSenderID.id}`, {
                method: 'GET',
                headers: {'Content-Type': 'application/json'}
                });

                const res = await data.json()
                setConversation(res)
            }catch(err){
                console.log(err)
            }
        };

        if(userSenderID !== null){
            getConversation()
        }
    },[userSenderID]);

    // get conversation messages
    useEffect(() => {
        const conversationId = conversation.map(conv => conv._id)
        async function getMessages(){
            try {
                const data = await fetch(`https://tothemoonexperts-chatserver.herokuapp.com/messages/${conversationId[0]}`, {
                method: 'GET',
                headers: {'Content-Type': 'application/json'}
                });

                const res = await data.json()
                return setOldMessages(res)

            }catch(err){
                console.log(err)
            }
        };
        if(conversationId !== null && conversationId !== undefined){
            getMessages()
        }
    }, [conversation]);

    useEffect(() => {
        conversation.map((c) => setCurChat(c))
    },[conversation])

    useEffect(() => {
        messages &&
            curChat?.member.includes(messages.senderID) &&
                setOldMessages((prev) => [...prev, messages])
    }, [messages, curChat]);

    // smooth scroll
    useEffect(() => {
        const groupByDate = oldMessages.reduce((acc, message) => {
            const date = new Date(message.createdAt).toDateString()
            if(!acc[date]){
                acc[date] = []
            }
            acc[date].push(message);
            return acc;
            }, {});

        const groupedArray = Object.entries(groupByDate).map(([date, messages]) => ({
                date,
                messages,
            }));

        setGroupedMessages(groupedArray);

        scrollRef.current?.scrollIntoView({behavior: "smooth"});
    },[oldMessages]);

    // socket consigurations
    useEffect(() => {
        async function fetchUsers(){
            const users = await fetch('https://tothemoonexperts-api.herokuapp.com/profile/users', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `token ${localStorage.getItem('token')}`
                }
            })

            const res = await users.json()
            const supportEmail = res.find(user => user.email === 'support@tothemoonexperts.com')
            setCustomers(res)
            setUserReceiverID(supportEmail.id)
        };

        async function fetchData(){
            const data = await fetch('https://tothemoonexperts-api.herokuapp.com/profile/cur', { 
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `token ${localStorage.getItem('token')}`
                }
            })

            const res = await data.json()
    
            const useremail = res.map(em => em.email)
            const userIdentity = res.map(user => user.nickname)
            setIdentity(userIdentity[0])
            setEmail(useremail[0])
        };      

        fetchUsers();
        fetchData();
  
    }, [tokenAvailable]);

    useEffect(() => {
        if(email){
            const pk = customers.find(id => {
                return id.email === email
            })
            setUserSenderID(pk)
        }

    },[email, customers]);

    useEffect(() => {
        const URL = "http://127.0.0.1:5000/";
        if (socket === null){
            setSocket(io(URL, {transports: ['websocket']}))
        };
    }, [socket]);

    useEffect(() => {
        if(socket){
            if (userSenderID !== null && userSenderID !== undefined){
                socket.emit("addUser", userSenderID.id);
            }

            socket.on("getUsers", users => {
                console.log(users)
            });
        };

    
    }, [socket, userSenderID]);

    // receive messages from socket
    useEffect(() => {
        if(socket){
            socket.on('received_message', (content) => {
                setMessages({
                    senderID: content.senderID.id,
                    content: content.content,
                    createdAt: new Date().toISOString(),
                });
    
            });
        };
    }, [socket]);

    const sendMessage = async (event) => {
        event.preventDefault()

        if (curMessage !== ''){
            const messageData = {
                content: curMessage,
                receiverID: userReceiverID,
                senderID: userSenderID,
                createdAt: new Date().toISOString(),
            };
            await socket.emit('sendMessage', messageData);
            setOldMessages([...oldMessages, messageData]);
            setCurMessage("")
        }
    };

    const handleOpen = () => {
        setOpen(!open)
    };

    const handleInfo = (id) => {
        setInfo(true)
        setProfile(false)
        setOrder(false)
        setSetting(false)
        setNotify(false)
        setInfoId(id)
    };

    const handleProfile = () => {
        setProfile(true)
        setOrder(false)
        setSetting(false)
        setMessaging(false)
        setOpen(false)
        setNotify(false)
        setInfo(false)
        setEdit(false)
    };

    const handleOrder = () => {
        setOrder(true)
        setSetting(false)
        setMessaging(false)
        setNotify(false)
        setProfile(false)
        setInfo(false)
        setEdit(false)
    };

    const handleSetting = () => {
        setOrder(false)
        setMessaging(false)
        setSetting(true)
        setNotify(false)
        setProfile(false)
        setInfo(false)
        setEdit(false)
    };

    const handleMessaging = () => {
        setMessaging(true)
        setOrder(false)
        setSetting(false)
        setNotify(false)
        setInfo(false)
        setEdit(false)
        setProfile(false)
    };

    const handleNotifications = () => {
        setMessaging(false)
        setOrder(false)
        setSetting(false)
        setNotify(true)
        setInfo(false)
        setProfile(false)
        setEdit(false)
    };

    const handleEditProfile = () => {
        setEdit(true)
        setMessaging(false)
        setOrder(false)
        setSetting(false)
        setNotify(false)
        setInfo(false)
        setProfile(false)
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setRedirect(true)
    };

    let display, orderActiveOptionStyle, settingActiveOptionStyle, messagingActiveStyle, notificationStyle;
    let profileModal;
    let navigate = useNavigate();
    let no_of_orders;

    if (activeOrders.length < 1){
        no_of_orders = (
            <h5>My orders </h5>
        )
    }else{
        no_of_orders = (
            <h5>My orders <span>{activeOrders.length}</span></h5>
        )
    }

    if (redirect){
        return navigate('/', {replace: true})
    };

    if (open === true){
        profileModal = (
            <div className="my-profile">
                    <ul>
                        <li onClick={handleProfile}>
                            <PersonOutlineOutlinedIcon style={{fontSize: '20px'}} />
                            <h5>My Profile</h5>
                        </li>
                        <li onClick={handleLogout}>
                            <LogoutOutlinedIcon style={{fontSize: '20px'}} />
                            <h5>Logout</h5>
                        </li>
                    </ul>
            </div>
        )
    };

    if (order === true){
        display = (
            <Prof handleInfo={handleInfo} />
        );

        orderActiveOptionStyle = {
            backgroundColor: '#292B3A',
            borderRight: '3px solid #3367d6',
            color: '#fff'
        }
    }else if(messaging === true){
        display = (
            <Messaging />
        )

        messagingActiveStyle  = {
            backgroundColor: '#292B3A',
            borderRight: '3px solid #3367d6',
            color: '#fff'
        }
    } else if (setting === true){
        display = (
            <Settings />
        )

        settingActiveOptionStyle = {
            backgroundColor: '#292B3A',
            borderRight: '3px solid #3367d6',
            color: '#fff'
        }
    }else if (info === true){
        display = (
            <Info pk={infoId} />
        )
    }else if (profile === true){
        display = (
            <MyProfile handleEditProfile={handleEditProfile}/>
        )
    }else if (notify === true){
        display = (
            <Notification socket={socket}/>
        )

        notificationStyle = {
            backgroundColor: '#292B3A',
            borderRight: '3px solid #3367d6',
            color: '#fff'
        }
    }else if (edit === true){
        display = (
            <EditProfile />
        )
    }

    // format messages dates
    function formatDate(date){
        let date1 = new Date(date)

        return date1.toString().slice(4, 15)
    };

    function formatTime(date){
        let date1 = new Date(date)
        
        return date1.toString().slice(16, 21)
    };
    
    return (
        <div className="user-dashboard">
            <div className="my-profile-container">
                {profileModal}
            </div>
            <div className={isExpanded ? "sidebar expanded" : "sidebar"}>

                <div className="hamburger" onClick={() =>  setIsExpanded(!isExpanded)}>
                    <span className="h-top"></span>
                    <span className="h-mid"></span>
                    <span className="h-bottom"></span>
                </div>

                <div className={isExpanded ? "sidebar-top-slide expanded" : "sidebar-top-slide"}>
                    <Link to='/dashboard/placeorder' style={{textDecoration: 'none'}}><button><AddCircleOutlineIcon style={{fontSize: '20px', paddingBottom: '5px'}} /><h5>Place Order</h5></button></Link>
                </div>

                <div className="sidebar-top">
                    <img src={logo} alt="logo" style={{width: '100px'}}/>
                    <Link to="/dashboard/placeorder" style={{textDecoration: 'none'}}><Button variant="contained" size="small" startIcon={<AddCircleOutlineIcon />} style={{width: '180px'}} >Place order</Button></Link>
                </div>

                <div className={isExpanded ? "sidebar-mid expanded" : "sidebar-mid"}>
                    <ul>
                        <li onClick={handleOpen}>
                            <AccountBoxOutlinedIcon style={{fontSize: '20px'}} />
                            <h5>{identity !== null ? identity.substring(0, 8) : userSenderID && userSenderID.id} <span style={{paddingLeft: identity === null ? '60px' : '20px'}}>&gt;</span></h5>
                        </li>
                        <li>
                            <AccountBalanceWalletOutlinedIcon style={{fontSize: '20px'}} />
                            <h5>Balance <span style={{paddingLeft: '8px'}}>$0.00</span></h5>
                        </li>
                        <li onClick={handleNotifications} style={notificationStyle}>
                            <NotificationsOutlinedIcon style={{fontSize: '20px'}} />
                            <h5>Notifications</h5>
                        </li>
                    </ul>
                </div>

                <div className={isExpanded ? "sidebar-bottom expanded" : "sidebar-bottom"}>
                    <ul>
                        <li onClick={handleOrder} style={orderActiveOptionStyle}>
                            <CardGiftcardOutlinedIcon style={{fontSize: '20px'}} />
                            {no_of_orders}
                        </li>
                        <li onClick={handleMessaging} className="messaging-small-screen" style={messagingActiveStyle}>
                            <ChatOutlinedIcon style={{fontSize: '20px'}} />
                            <h5>Messages</h5>
                        </li>
                        <li onClick={handleSetting} style={settingActiveOptionStyle}>
                            <SettingsOutlinedIcon style={{fontSize: '20px'}} />
                            <h5>Settings</h5>
                        </li>
                        <li>
                            <CreditCardIcon style={{fontSize: '20px'}} />
                            <h5>Finance</h5>
                        </li>
                    </ul>
                </div>

            </div>

            <div className={flapChat === true ? "chat-container" : "msg-container"}>
                <div className="msg-box">
                    <div className="msg-header" onClick={() => setFlapChat(!flapChat)}>
                        <h1>Messages</h1>
                    </div>

                    <div className={flapChat === true ? "hide-chat-panel" : "chat-panel"}>
                    {groupedMessages && groupedMessages.map(group => {
                        return (
                            <div className="row no-gutters" key={group.date}>
                                <h5>{formatDate(group.date)}</h5>
                                {group.messages.map(content => 
        
                                    <div className={userSenderID.id === parseInt(content.senderID) || userSenderID.id === content.senderID.id ? "col-md-9 offset-md-9" : "col-md-9"} key={content._id}>
                                        <div className={userSenderID.id === parseInt(content.senderID) || userSenderID.id === content.senderID.id ? "chat-bubble chat-bubble--blue chat-bubble--right" : "chat-bubble chat-bubble--left"}>
                                            <div className="msg-cont" ref={scrollRef}>
                                                {content.content}
                                            </div>
                                            <div className="time">
                                                {formatTime(content.createdAt)}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                    )})}
                    </div>

                    <div className={flapChat === true ? "hide-msg-input" : "msg-input"}>
                        <div className="chat-box-input">
                            <input type="text" required 
                                placeholder="New message"
                                value = {curMessage}
                                onChange = {(event) => setCurMessage(event.target.value)}
                                onKeyPress = {event => event.key === 'Enter' ? sendMessage(event) : null}
                            />
                            <div className="i"><SendIcon /></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="user-option-dashboard">
                {display}
            </div>

        </div>
    )
}