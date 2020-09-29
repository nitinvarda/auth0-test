import React, { useState, useEffect } from 'react';



const Dashboard = () => {
    const [loggedout, setLoggedout] = useState(false)
    useEffect(() => {

    }, [loggedout])
    const logout = () => {
        if (localStorage.getItem('token')) {
            localStorage.removeItem('token');

            setLoggedout(true)
        }
    }


    if (localStorage.getItem('token')) {
        return (
            <div>
                <h2>This is the private dashboard</h2>
                <button onClick={logout}>logout</button>
            </div>
        );

    }
    else {
        return (
            <div>
                <h2>You are not Authenticated</h2>
                <p>Please Login first</p>



            </div>



        )
    }
}



export default Dashboard;
