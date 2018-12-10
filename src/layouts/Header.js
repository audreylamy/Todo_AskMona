import React, { Component } from 'react';
import logo from '../assets/img/logo.jpg';

class Header extends Component {
    render() {
        return (
            <div className="header">
                <div className="header_logo">
                    <img src={logo} alt="mona" height="100" width="100"/>
                </div>
            </div>
        );
    }
}

export default Header;