import React from 'react';
import PropTypes from 'prop-types';
import { redirect } from 'react-router-dom';


function TheHeader() {
    return (
        <header>
        {/* <h1>pandas</h1> */}
        <nav>
            <a >Home page</a>
            <a>Tickets manager</a>
            <a>Create ticket</a>
            <a>About me</a>
        </nav>
    </header>
    );
}

export default TheHeader;