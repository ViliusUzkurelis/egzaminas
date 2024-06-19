import {React, useState} from 'react';
import './header.css';
import { NavLink } from 'react-router-dom';
import { MdOutlineFestival } from "react-icons/md";
import { ReactSession } from 'react-client-session';

function Header({admin}) {

    return (
        <header className="App-header">
            <NavLink to={"/"}><MdOutlineFestival className='App-logo'/></NavLink>
          <h1>Geriausias renginių registravimo puslapis</h1>
            <NavLink to={"/login"}>Prisijungti</NavLink>
{ admin &&
            <NavLink to={'/admin'}>admin</NavLink>
}
        </header>
    );
  }

  export default Header;