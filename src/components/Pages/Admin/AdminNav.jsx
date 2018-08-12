import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class AdminNav extends Component {
    render() {
        return (
            <div className="col-md-8 col-lg-8 col-sm-6 col-xs-6">
                <nav className="mainmenu__nav hidden-xs hidden-sm">
                    <ul className="main__menu">
                        <li className="drop"><Link to="/admin/users">Пользователи</Link></li>
                        <li className="drop"><Link to="/admin/products">Товары</Link></li>
                    </ul>
                </nav >
            </div >
        );
    }
}

