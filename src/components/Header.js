import React from 'react';
import '../Main.css'
import Avail from './Avail';

export default function Header() {

    return(
        <div id='header'>
            <h1>Library of Truth</h1>
            <h2>Victor Ekpenyong</h2>
            <Avail />
            <h3><em>Books are due 3 days after checkout date</em></h3>
        </div>
    );
}