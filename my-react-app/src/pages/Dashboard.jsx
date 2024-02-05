import 'bootstrap/dist/css/bootstrap.min.css';
import './Dashboard.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
const Dashboard = () => {
    const [name, setName] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [selectedContact, setSelectedContact] = useState('');
    const [contacts, setContacts] = useState([]);
    const uniqueContacts = [];
    const Navigate = useNavigate();
    useEffect(() => {
        axios.get("http://localhost:5000/dashboard")
            .then(res => {
                console.log(res.data);
                if (res.data.valid) {
                    setName(res.data.username)
                    console.log(name);
                    getContacts(res.data.username);
                } else {
                    Navigate('/')
                }
            })
            .catch(error => console.log(error));
    }, []);
    // const [contacts] = useState(['Vaish', 'test', 'John', 'Alice']);
    const handleContactClick = (contactName) => {
        setSelectedContact(contactName);

    };
    const handleSendMessage = async () => {
        if (newMessage.trim() !== '') {
            const newMessageObj = {
                text: newMessage,
                timestamp: new Date().toLocaleTimeString(),
                sender: name,
                receiver: selectedContact
            };

            setMessages([...messages, newMessageObj]);
            console.log(newMessageObj);
            try {
                const response = await axios.post('http://localhost:5000/api/insertMsg', {
                    data: newMessageObj,
                });
                console.log('Server response:', response.data);

            } catch (error) {
                console.error('Error sending message:', error);
            }
            setNewMessage('');
        }
    };


    const fetchAllMessages = async () => {
        setNewMessage('');

        const receiver = selectedContact;
        console.log(receiver);

        try {
            const response = await axios.post('http://localhost:5000/api/FetchMsg', {
                data: receiver,
            });
            console.log('Server response:', response.data);

            const newMessages = response.data.messages.map(message => ({
                text: message.text,
                timestamp: message.timestamp,
                sender: message.sender,
                receiver: message.receiver
            }));
            setMessages(newMessages);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }

    };

    const getContacts = async (name) => {
        console.log(name);

        try {
            const response = await axios.post(`http://localhost:5000/api/getContacts`, {
                data: name
            });

            console.log('Server response:', response.data);

            const contacts1 = response.data.contacts
                ? response.data.contacts
                    .filter(contact => contact.sender === name || contact.receiver === name)
                    .map(contact => {
                        // Determine the name of the other person in the conversation
                        const otherPerson = contact.sender === name ? contact.receiver : contact.sender;

                        // Return the name of the other person if it's different from the current user's name
                        return otherPerson !== name ? otherPerson : '';
                    })
                : [];


            setContacts(contacts1);
            console.log(contacts);

        } catch (error) {
            console.error('Error fetching contacts:', error);
        }
    };


    return (
        <>
            <header>
                <div className="header-content">
                    {/* <!-- Application Name/Logo --> */}
                    <h1>VaishTalks💬</h1>

                    {/* <!-- User Information --> */}
                    <div className="user-info">
                        <Dropdown>
                            <Dropdown.Toggle id="dropdown-basic">
                                <img className="user-avatar" src="op.png" alt="User Avatar" />
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                        <span className="user-name">{name}</span>
                        {/* Add more user-related elements if needed */}
                    </div>
                </div>
            </header>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-4 col-lg-3 card chat-sidebar" id="chat-sidebar">
                        {/* Sidebar content goes here (contacts, profile, etc.) */}
                        <div className="sidebar-header">
                            <div className='row'>
                                <span className='col-md-7'>{name}</span><button type="button" className="btn btn-primary" id="add_contact" >Add contact</button>
                            </div>
                        </div>
                        <div className="sidebar-contacts">
                            {/* List of contacts */}
                           
                            {Array.isArray(contacts) && contacts.map((contact, index) => {
                            console.log("🚀 ~ file: dashboard.jsx:155 ~ {Array.isArray ~ contacts:", contacts)

                                // Determine the name of the other person in the conversation
                                const otherPerson = contact === name ? '' : contact;
                                console.log("🚀 ~ file: dashboard.jsx:157 ~ {Array.isArray ~ otherPerson:", otherPerson)


                                // Display the contact only if its name is not equal to the current user's name
                                if (otherPerson !== '') {
                                    return (
                                        <div key={index} className="contact" onClick={() => { handleContactClick(otherPerson); fetchAllMessages(); }}>
                                            {otherPerson}
                                        </div>
                                    );
                                }

                                return null; // Don't render anything for contacts with the current user's name
                            })}

                        </div>
                    </div>
                    <div className="col-md-8 col-lg-9 chat-container">
                        <div className="card chat " id="chat">
                            <div className="card-header">{selectedContact}</div>
                            <div className="card-body chat-body">
                                {messages.map((message, index) => (
                                    <div key={index} className={`message ${message.sender === name ? 'sent' : 'received'}`}>
                                        <span className="message-sender">{message.sender === name ? 'You' : message.sender}</span>
                                        <div className="card message-text">{message.text}
                                            <span className="message-timestamp">{message.timestamp}</span></div>
                                    </div>
                                ))}
                            </div>
                            <div className="card-footer">
                                <div className="input-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Type your message..."
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                    />
                                    <div className="input-group-append">
                                        <button className="btn btn-primary" type="button" id="send"
                                            onClick={handleSendMessage}>
                                            Send
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};


export default Dashboard;
