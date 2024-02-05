import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LoginRegister.css';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginRegister = () => {
    axios.defaults.withCredentials = true;
    const [activeTab, setActiveTab] = useState('login');
    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        // console.log("first");
        // return false;
        e.preventDefault();

        // const formData = new FormData(e.target);

        const data = new FormData();
        var name = document.getElementById('name').value;
        var email_id = document.getElementById('email_id').value;
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        var profile = document.getElementById('profile').value;

        data.append('name', name);
        data.append('email_id', email_id);
        data.append('username', username);
        data.append('password', password);
        data.append('profile', profile);

        for (let [name, value] of data) {
            if (!value) {
                console.error(`Error: ${name} is required`);
                Swal.fire({
                    icon: "error",
                    title: "Error...",
                    text: "Please fill all the details!!",
                });
                return; 
            }
            data[name] = value;
        }
       
        console.log('Form data:', data);

        try {
            const response = await axios.post('http://localhost:5000/api/data', {
                data: data,
                headers: {
                    "content-type": "multipart/form-data",
                }
            });
            console.log('Server response:', response.data);
            await Swal.fire({
                title: "Success!",
                text: "User is registered successfully",
                icon: "success"
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.reload(); // Refresh the page
                }
            });
        } catch (error) {
            console.error('Error submitting form data:', error);
        }


    };

    const handleLogin = async (e) => {
        // console.log("first");
        // return false;
        e.preventDefault();

        // const formData = new FormData(e.target);

        const data = new FormData();

        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;


        data.append('username', username);
        data.append('password', password);


        for (let [name, value] of data) {
            if (!value) {
                console.error(`Error: ${name} is required`);
                Swal.fire({
                    icon: "error",
                    title: "Error...",
                    text: "Please fill all the details!!",
                });
                return; // Return early if a field is empty
            }
            data[name] = value;
        }
        // data.file = data.profile;

        // data.profile = data.profile.name;

        console.log('Form data:', data);

        try {
            const response = await axios.post('http://localhost:5000/api/login', {
                data: data,
            });
            console.log('Server response:', response.data);
            await Swal.fire({
                title: "Success!",
                text: "User is logged in successfully",
                icon: "success"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/dashboard');
                }
            });
        } catch (error) {
            console.error('Error submitting form data:', error);
        }


    };


    return (
        <div className="container mt-5">
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <a
                        className={`nav-link ${activeTab === 'login' ? 'active' : ''}`}
                        onClick={() => handleTabChange('login')}
                        href="#"
                    >
                        Login
                    </a>
                </li>
                <li className="nav-item">
                    <a
                        className={`nav-link ${activeTab === 'register' ? 'active' : ''}`}
                        onClick={() => handleTabChange('register')}
                        href="#"
                    >
                        Register
                    </a>
                </li>
            </ul>

            <div className="card mt-3">
                {/* <div className="card-header">
                    {activeTab === 'login' ? 'Login' : 'Register'}
                </div> */}
                <div className="card-body">
                    <div className='form' id="register">
                        {activeTab === 'register' && (

                            <div>
                                <label htmlFor="name" className="form-label">
                                    Name:
                                </label>
                                <input type="text" className="form-control" id="name" />
                                <br />
                                <label htmlFor="email_id" className="form-label">
                                    Email ID:
                                </label>
                                <input type="email" className="form-control" id="email_id" />
                                <br />
                                <label htmlFor="profile" className="form-label">
                                    Profile photo:
                                </label>
                                <input type="file" className="form-control" id="profile" />
                                <br />
                                <label htmlFor="username" className="form-label">
                                    Username:
                                </label>
                                <input type="text" className="form-control" id="username" />
                                <br />
                                <label htmlFor="password" className="form-label">
                                    Password:
                                </label>
                                <input type="password" className="form-control" id="password" />
                                <br />

                                <button className="btn btn-primary mt-3" onClick={handleSubmit}>
                                    Register
                                </button>
                            </div>

                        )}
                    </div>
                    <div className='form' id="login">

                        {activeTab === 'login' && (
                            <div>
                                <label htmlFor="username" className="form-label">
                                    Username:
                                </label>
                                <input type="text" className="form-control" id="username" />
                                <br />
                                <label htmlFor="password" className="form-label">
                                    Password:
                                </label>
                                <input type="password" className="form-control" id="password" />
                                <br />

                                <button className="btn mt-3" onClick={handleLogin}>
                                    Login
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};


export default LoginRegister;
