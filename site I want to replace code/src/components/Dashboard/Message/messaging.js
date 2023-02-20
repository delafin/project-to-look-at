import React, {useState, useEffect, useRef} from 'react';
import './messaging.css';
import SendIcon from '@mui/icons-material/Send';

import {io} from "socket.io-client";

export default function Messaging(){

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
    const [groupedMessages, setGroupedMessages] = useState([]);

    const scrollRef = useRef();

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
            setEmail(useremail[0])
        };

        fetchUsers();
        fetchData();
    }, []);

    useEffect(() => {
        if(email){
            const pk = customers.find(id => {
                return id.email === email
            })
            setUserSenderID(pk)
        }

    },[email, customers]);

    useEffect(() => {
        const URL = "https://tothemoonexperts-chatserver.herokuapp.com/";
        if (socket === null){
            setSocket(io(URL, {transports: ['websocket']}))
        };

        if(socket){
            if (userSenderID !== null && userSenderID !== undefined){
                socket.emit("addUser", userSenderID.id);
            }

            socket.on("getUsers", users => {
                console.log(users)
            });
        };

    
    }, [socket, userSenderID]);

    useEffect(() => {
        if(socket){
            socket.on('received_message', (content) => {
                setMessages({
                    senderID: content.senderID.id,
                    content: content.content,
                    createdAt: new Date().toISOString(),
                });
                console.log(content)
            });
        }

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
        <div className="phone-chat-container">
            <div className="phone-chat-box">
                <div className="phone-msg-header">
                    <h1>Messages</h1>
                </div>

                <div className="chat-panel">
                    {groupedMessages && groupedMessages.map(group => {
                        return (
                            <div className="row no-gutters" key={group.date} ref={scrollRef}>
                                <h5>{formatDate(group.date)}</h5>
                                {group.messages.map(content => 
        
                                    <div className={userSenderID.id === parseInt(content.senderID) || userSenderID.id === content.senderID.id ? "col-md-9 offset-md-9" : "col-md-9"} key={content._id}>
                                        <div className={userSenderID.id === parseInt(content.senderID) || userSenderID.id === content.senderID.id ? "chat-bubble chat-bubble--blue chat-bubble--right" : "chat-bubble chat-bubble--left"}>
                                            <div className="msg-cont">
                                                {content.content}
                                            </div>
                                            <div className="time">
                                                {formatTime(content.createdAt)}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>

                <div className='phone-msg-input'>
                    <div className="chat-box-input">
                        <input type="text" required 
                            placeholder="New message"
                            value = {curMessage}
                            onChange = {(event) => setCurMessage(event.target.value)}
                            onKeyPress = {event => event.key === 'Enter' ? sendMessage(event) : null}
                        />
                        <div className="i"><SendIcon onClick={sendMessage}/></div>
                    </div>
                </div>
            </div>
        </div>
    )
}