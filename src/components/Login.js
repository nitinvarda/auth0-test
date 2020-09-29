import React, { useState } from 'react';
import auth0 from 'auth0-js';
import { DOMAIN, AUDIENCE, CLIENT_ID } from '../config';
import { Redirect } from 'react-router-dom';


const Login = () => {
    const [data, setData] = useState({
        username: '',
        password: '',
        authorized: false,
        error: ''
    });
    const { username, password, authorized, error } = data;


    const change = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }
    var auth = new auth0.WebAuth({
        domain: DOMAIN,
        clientID: CLIENT_ID
    });
    auth.crossOriginVerification();


    const submit = (e) => {
        e.preventDefault();

        auth.client.login(
            {
                realm: 'Mongoose', //connection name or HRD domain
                username: username,
                password: password,
                audience: AUDIENCE,
                scope: 'read:name read:nickname'
            },
            function (err, authResult) {

                if (err) {
                    // console.log(err.description)
                    setData({
                        ...data,
                        error: err.description
                    })

                    setTimeout(() => {
                        setData({
                            ...data,
                            error: ''
                        })
                    }, 5000)
                }
                else {
                    // Auth tokens in the result or an error


                    localStorage.setItem('token', authResult.accessToken);
                    setData({
                        ...data,
                        authorized: true
                    })



                }

            }
        );

    }



    if (authorized) {
        return (
            <Redirect to="/dashboard" />
        )
    }
    else {

        return (
            <div style={{ width: "20%", margin: "auto" }}>
                {error ? <h2>{error}</h2> : <div></div>}
                <form onSubmit={submit}>
                    <div className="d-flex justify-content-between">
                        <label>Username</label>
                        <input type="text" data-testid="username" name="username" value={username} onChange={change} />
                    </div>
                    <div className="d-flex justify-content-between">
                        <label>Password</label>
                        <input type="password" data-testid="password" name="password" value={password} onChange={change} />
                    </div>

                    <br />
                    <button type="submit" data-testid="login">Login</button>
                </form>



            </div>
        );
    }
}


export default Login;
