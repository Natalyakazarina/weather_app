import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun } from '@fortawesome/free-solid-svg-icons';

const Header = (props) => (
    <nav className="navbar navbar-light bg-light" style={{borderRadius: "20px"}}>
        <a className="navbar-brand" href="#">
            <span>{props.title}</span>
        </a>
        <FontAwesomeIcon icon={faSun}/>
    </nav>
);

export default Header;