import  { useState, React } from 'react';
import './register.css';
import { ReactSession } from 'react-client-session';
import { useNavigate } from 'react-router-dom';


function Register ({ setAdmin }) {

    const [error, setError] = useState('');
    const navigate = useNavigate();

  const register = async function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const name = document.getElementById('name').value;
    const surname = document.getElementById('surname').value;

    try {
         await fetch('/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password,
                name,
                surname
            })
        }).then(response => {
            console.log("response");
            if (response.ok) {
                if (email === 'admin@admin.com'){
                    setAdmin(true);
                    ReactSession.set("admin", true);
                } else {
                    setAdmin(false);
                    ReactSession.set("admin", false);
                }
                ReactSession.set("loggedIn", true);
                ReactSession.set("userEmail", email,);
                console.log(ReactSession.get("loggedIn"));
                navigate("/");
                return response.json();
            } else {
                setError("Šis paštas jau egzistuoja");
            } }).catch(error => {
                console.log(error);
            });
    } catch (error) {
        console.log(error);

    }
};
  
    return (
        <div className='register'>
            <h1>Registracija</h1>

            <div className="form">
                <form action="" onSubmit={(e) => register(e)}>
                    <p>{error}</p>
                    <input id='email' type="email" placeholder="El. paštas"/>
                    <input id='name' type="text" placeholder="Vardas"/>
                    <input id='surname' type="text" placeholder="Pavardė"/>
                    <input id='password' type="password" placeholder="Slaptazodis"/>
                    <button type="submit">Registruotis</button>
                </form>
            </div>
        </div>
    );
}

export default Register