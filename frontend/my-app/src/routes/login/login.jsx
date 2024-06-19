import  { useState, React } from 'react';
import './login.css';
import { NavLink } from 'react-router-dom';
import { ReactSession } from 'react-client-session';
import { useNavigate } from 'react-router-dom';

function Login({setAdmin}) {

    const [error, setError] = useState('');
    const navigate = useNavigate();

    const login = async function (e) {
        e.preventDefault();
    
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
    
        try {
             await fetch('/users/login', { // Use relative URL
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password
                })
            }).then(response => {
                console.log("response");
                if (response.ok) {
                    if (document.getElementById('email').value === 'admin@admin.com'){
                        setAdmin(true);
                        ReactSession.set("admin", true);
                    } else {
                        setAdmin(false);
                        ReactSession.set("admin", false);
                    }
                    ReactSession.set("loggedIn", true,);
                    ReactSession.set("userEmail", email,);
                    console.log(ReactSession.get("loggedIn"));
                    navigate("/");
                    return response.json();
                } else {
                    setError("Neteisingas vartotojas arba slaptažodis");
                } }).catch(error => {
                    console.log(error);
                });
        } catch (error) {
            console.log(error);
    
        }
    };


        return (
            <div>
                <h1>Login</h1>
                <div className="form">
                    <p>{error}</p>
                    <form action="" onSubmit={(e) => login(e)}>
                    <input id='email' type="text" placeholder="El. paštas"/>
                    <input id='password' type="password" placeholder="Slaptazodis"/>
                    <button>Prisijungti</button>
                    </form>
                </div>
                <p>Neturite paskyros? <NavLink to="/register">Registruokites!</NavLink></p>
            </div>
        );
    }
    
    export default Login;